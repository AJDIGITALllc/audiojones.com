import { NextResponse } from "next/server";
import ImageKit from "imagekit";

/**
 * Handles GET requests to /api/imagekit-auth.
 * This function returns the authentication parameters for the ImageKit SDK.
 * @returns {Promise<NextResponse>} A promise that resolves to the response.
 */
export async function GET() {
  const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
  const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

  if (!publicKey || !privateKey || !urlEndpoint) {
    return NextResponse.json(
      { error: "Missing ImageKit environment variables" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }

  const imagekit = new ImageKit({
    publicKey,
    privateKey,
    urlEndpoint,
  });

  const auth = imagekit.getAuthenticationParameters();

  return NextResponse.json(auth, { headers: { "Cache-Control": "no-store" } });
}

