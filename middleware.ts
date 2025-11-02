// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Admin-only areas we want to gate at the edge
const ADMIN_PATHS = ['/admin', '/admin/', '/api/admin', '/api/admin/']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // 1) If it's not an admin path, let it through
  const isAdminUI = pathname.startsWith('/admin')
  const isAdminAPI = pathname.startsWith('/api/admin')
  if (!isAdminUI && !isAdminAPI) {
    return NextResponse.next()
  }

  // 2) Check if we have *any* auth signal (we keep it loose at the edge)
  // You can tighten this to your token name later.
  const hasIdToken =
    req.cookies.get('idToken')?.value ||
    req.headers.get('authorization')?.startsWith('Bearer ')

  if (!hasIdToken) {
    // For pages → redirect to home/login
    if (isAdminUI) {
      const url = req.nextUrl.clone()
      url.pathname = '/login' // or '/' if you prefer
      url.searchParams.set('next', pathname)
      return NextResponse.redirect(url)
    }

    // For API → 401 JSON
    if (isAdminAPI) {
      return new NextResponse(
        JSON.stringify({ error: 'Unauthorized: missing token/cookie' }),
        {
          status: 401,
          headers: {
            'content-type': 'application/json',
          },
        },
      )
    }
  }

  // 3) If we DO have a token/cookie, let the actual Node admin route finish the job.
  // Those routes already do:
  //   const decoded = await adminAuth().verifyIdToken(token, true)
  //   if (!decoded.admin) return 403
  return NextResponse.next()
}

// 4) Tell Next which paths to run middleware on
export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
  ],
}