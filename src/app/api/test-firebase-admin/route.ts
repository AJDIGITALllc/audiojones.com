export const runtime = 'nodejs';
import { NextRequest, NextResponse } from "next/server";
import { adminAuth } from "@/lib/server/firebaseAdmin";

/** Validate Bearer token and require the `admin` custom claim */
async function requireAdmin(req: NextRequest) {
  const authz = req.headers.get('authorization') || '';
  const match = authz.match(/^Bearer\s+(.+)$/i);
  if (!match) {
    return { ok: false, res: NextResponse.json({ error: 'Missing Authorization Bearer token' }, { status: 401 }) };
  }

  try {
    const decoded = await adminAuth().verifyIdToken(match[1], true); // checks revocation
    if (!decoded.admin && !(decoded.customClaims && (decoded.customClaims as any).admin)) {
      return { ok: false, res: NextResponse.json({ error: 'Forbidden: admin claim required' }, { status: 403 }) };
    }
    return { ok: true, decoded };
  } catch (err: any) {
    return { ok: false, res: NextResponse.json({ error: 'Invalid token', details: err?.message }, { status: 401 }) };
  }
}

export async function GET(req: NextRequest) {
  const gate = await requireAdmin(req);
  if (!gate.ok) return gate.res!;

  try {
    // Test Firebase Admin connectivity
    const auth = adminAuth();
    
    // Try to list users with a small limit to test the connection
    const result = await auth.listUsers(1);
    
    return NextResponse.json({
      success: true,
      message: "Firebase Admin connection successful",
      userCount: result.users.length,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("Firebase Admin test failed:", error);
    return NextResponse.json({
      success: false,
      error: error.message || "Unknown error",
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}