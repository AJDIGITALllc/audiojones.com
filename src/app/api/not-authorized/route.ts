import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(
    {
      status: 403,
      error: "forbidden",
      message: "You do not have permission to access this resource.",
    },
    { status: 403 }
  );
}

export async function POST() {
  return NextResponse.json(
    {
      status: 403,
      error: "forbidden",
      message: "You do not have permission to perform this action.",
    },
    { status: 403 }
  );
}