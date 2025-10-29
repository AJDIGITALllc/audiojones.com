import { NextRequest, NextResponse } from "next/server";

/**
 * Handles POST requests to /api/contracts/generate.
 * This function proxies the request to a Firebase Function that generates a contract.
 * @param {NextRequest} req - The request object.
 * @returns {Promise<NextResponse>} A promise that resolves to the response.
 */
export async function POST(req: NextRequest) {
  try {
    const auth = req.headers.get("authorization") || "";
    if (!auth.startsWith("Bearer ")) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const idToken = auth.slice(7);

    const base = process.env.FIREBASE_FUNCTIONS_BASE || "https://us-central1-audiojoneswebsite.cloudfunctions.net";
    const url = `${base}/generateContract`;
    const body = await req.json();

    const resp = await fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${idToken}` },
      body: JSON.stringify(body),
    });
    const data = await resp.json().catch(() => ({}));
    if (!resp.ok) return NextResponse.json({ error: data?.error || "Function error" }, { status: resp.status });
    return NextResponse.json(data);
  } catch (e: unknown) {
    return NextResponse.json({ error: e?.message || "Server error" }, { status: 500 });
  }
}

