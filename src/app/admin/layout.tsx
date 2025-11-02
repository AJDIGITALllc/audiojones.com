import Link from 'next/link';
import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen bg-[#000000] text-[#FFFFFF]">
      <aside className="w-64 bg-gray-900 p-4 border-r border-gray-800">
        <div className="mb-8">
            <Link href="/admin">
                <h1 className="text-2xl font-bold text-[#FFD700]">Admin Portal</h1>
                <p className="text-sm text-gray-400">Audio Jones</p>
            </Link>
        </div>
        <nav className="flex flex-col gap-y-2">
          <Link href="/admin" className="block py-2 px-4 rounded hover:bg-gray-800 text-white">Dashboard</Link>
          <Link href="/admin/users" className="block py-2 px-4 rounded hover:bg-gray-800 text-white">Users</Link>
          <Link href="/admin/approvals" className="block py-2 px-4 rounded hover:bg-gray-800 text-white">Approvals</Link>
          <Link href="/admin/billing" className="block py-2 px-4 rounded hover:bg-gray-800 text-white">Billing</Link>
          <Link href="/admin/webhooks" className="block py-2 px-4 rounded hover:bg-gray-800 text-white">Webhooks</Link>
          <Link href="/admin/system" className="block py-2 px-4 rounded hover:bg-gray-800 text-white">System</Link>
        </nav>
      </aside>
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  )
}
