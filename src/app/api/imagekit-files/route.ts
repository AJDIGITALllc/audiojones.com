import { NextResponse } from "next/server";
import ImageKit from "imagekit";

/**
 * Handles GET requests to /api/imagekit-files.
 * This function returns a list of recently uploaded files from ImageKit.
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

  const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });

  try {
    const files = await imagekit.listFiles({
      path: "/AUDIOJONES.COM/uploads",
      sort: "DESC_CREATED",
      limit: 12,
    });
    return NextResponse.json(
      { files },
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err?.message || "Failed to list files" },
      { status: 500, headers: { "Cache-Control": "no-store" } }
    );
  }
}

