export const runtime = 'nodejs';
import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/server/firebaseAdmin";

export async function GET() {
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