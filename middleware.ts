import { NextResponse } from 'next/server';

export const config = { matcher: ['/admin/:path*'] };

export function middleware(req: Request) {
  const auth = req.headers.get('authorization') || '';
  const expected =
    'Basic ' + Buffer.from(`${process.env.ADMIN_USER}:${process.env.ADMIN_PASS}`).toString('base64');
  if (auth !== expected) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Admin"' }
    });
  }
  return NextResponse.next();
}