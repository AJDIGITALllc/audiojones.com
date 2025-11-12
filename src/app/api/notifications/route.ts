import { NextRequest, NextResponse } from "next/server";
import { getWhopClient } from "@aj/whop";

export async function POST(req: NextRequest) {
  try {
    const whopClient = getWhopClient();
    const notificationData = await req.json();
    
    // Validate required fields
    if (!notificationData.title || !notificationData.content) {
      return NextResponse.json(
        {
          success: false,
          error: "Title and content are required",
        },
        { status: 400 }
      );
    }
    
    // Create notification via Whop client
    const notification = await whopClient.notifications.create(notificationData);
    
    return NextResponse.json({
      success: true,
      data: notification,
    });
  } catch (error) {
    console.error("Error creating notification:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}