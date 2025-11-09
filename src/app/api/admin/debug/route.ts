// src/app/api/admin/debug/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const adminKey = req.headers.get('admin-key') || req.headers.get('X-Admin-Key');
  const expectedAdminKey = process.env.ADMIN_KEY;
  
  return NextResponse.json({
    received_admin_key: adminKey ? `${adminKey.substring(0, 10)}...` : null,
    has_env_admin_key: !!expectedAdminKey,
    env_admin_key_preview: expectedAdminKey ? `${expectedAdminKey.substring(0, 10)}...` : null,
    keys_match: adminKey === expectedAdminKey,
    all_headers: Object.fromEntries(req.headers.entries()),
  });
}