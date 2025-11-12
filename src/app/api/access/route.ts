import { NextRequest, NextResponse } from "next/server";
import { getWhopClient } from "@aj/whop";

export async function GET(req: NextRequest) {
  try {
    const whopClient = getWhopClient();
    const { userId } = await whopClient.verifyUserToken(req.headers);
    
    const experienceId = req.nextUrl.searchParams.get("experienceId");
    
    if (!experienceId) {
      return NextResponse.json(
        {
          success: false,
          error: "Experience ID is required",
        },
        { status: 400 }
      );
    }
    
    const access = await whopClient.access.checkIfUserHasAccessToExperience({
      experienceId,
      userId,
    });
    
    return NextResponse.json({
      success: true,
      data: access,
    });
  } catch (error) {
    console.error("Error checking access:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 401 }
    );
  }
}