import { NextRequest, NextResponse } from "next/server";

/**
 * Handles POST requests to /api/contracts/sign.
 * This function proxies the request to a Firebase Function that signs a contract.
 * @param {NextRequest} req - The request object.
 * @returns {Promise<NextResponse>} A promise that resolves to the response.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const auth = req.headers.get("authorization") || "";
    if (!auth.startsWith("Bearer ")) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const idToken = auth.slice(7);

    const base = process.env.FIREBASE_FUNCTIONS_BASE || "https://us-central1-audiojoneswebsite.cloudfunctions.net";
    const url = `${base}/signContract`;
    const resp = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${idToken}` },
      body: JSON.stringify(body),
    });
    const data = await resp.json().catch(() => ({}));
    return NextResponse.json(data, { status: resp.status });
  } catch (e: unknown) {
    return NextResponse.json({ message: e?.message || "Server error" }, { status: 500 });
  }
}

