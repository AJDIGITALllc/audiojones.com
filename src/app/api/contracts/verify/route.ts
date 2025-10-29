import { NextRequest, NextResponse } from "next/server";

/**
 * Handles POST requests to /api/contracts/verify.
 * This function proxies the request to a Firebase Function that verifies a contract signature.
 * @param {NextRequest} req - The request object.
 * @returns {Promise<NextResponse>} A promise that resolves to the response.
 */
export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization") || "";
    if (!auth.startsWith("Bearer ")) return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
    const idToken = auth.slice(7);
    const base = process.env.FIREBASE_FUNCTIONS_BASE || "https://us-central1-audiojoneswebsite.cloudfunctions.net";
    const url = `${base}/verifySignature`;
    const body = await req.json();
    const resp = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${idToken}` },
      body: JSON.stringify(body),
    });
    const data = await resp.json().catch(() => ({}));
    return NextResponse.json(data, { status: resp.status });
  } catch (e: unknown) {
    return NextResponse.json({ ok: false, message: e?.message || "Server error" }, { status: 500 });
  }
}

