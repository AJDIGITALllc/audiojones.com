import { NextRequest, NextResponse } from "next/server";
import { getWhopClient } from "@aj/whop";

export async function GET(req: NextRequest) {
  try {
    const whopClient = getWhopClient();
    const { userId } = await whopClient.verifyUserToken(req.headers);
    
    const user = await whopClient.users.getUser({ userId });
    
    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 401 }
    );
  }
}