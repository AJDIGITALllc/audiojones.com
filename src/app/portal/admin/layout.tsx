import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/server/firebaseAdmin';

// Force dynamic rendering - admin portal requires runtime authentication
export const dynamic = 'force-dynamic';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  // Server-side session cookie verification for admin access
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('session')?.value;
  
  if (!sessionCookie) {
    redirect('/login?next=/portal/admin');
  }

  try {
    // Verify session cookie and check admin claims
    const decoded = await adminAuth().verifySessionCookie(sessionCookie, true);
    
    // Require admin custom claim
    if (decoded.admin !== true) {
      redirect('/not-authorized');
    }
  } catch (error) {
    console.error('Admin auth verification failed:', error);
    redirect('/login?next=/portal/admin');
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Admin Portal Header */}
      <header className="border-b border-gray-800 bg-black/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-white">
                AJ Admin Portal
              </h1>
              <span className="rounded-full bg-red-600 px-2 py-1 text-xs font-medium text-white">
                ADMIN
              </span>
            </div>
            
            <nav className="flex items-center space-x-6">
              <a href="/portal/admin" className="text-gray-300 hover:text-white transition">
                Dashboard
              </a>
              <a href="/portal/admin/users" className="text-gray-300 hover:text-white transition">
                Users
              </a>
              <a href="/portal/admin/system" className="text-gray-300 hover:text-white transition">
                System
              </a>
              <a href="/portal/admin/approvals" className="text-gray-300 hover:text-white transition">
                Approvals
              </a>
              <a href="/portal/admin/webhooks" className="text-gray-300 hover:text-white transition">
                Webhooks
              </a>
              <a href="/portal" className="text-gray-300 hover:text-white transition">
                Back to Portal
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}