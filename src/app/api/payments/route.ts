import { NextRequest, NextResponse } from "next/server";
import { getWhopClient } from "@aj/whop";
import { env } from "@aj/config";

export async function GET(req: NextRequest) {
  try {
    const whopClient = getWhopClient();
    
    // Optional: Verify admin access for sensitive payment data
    const { userId } = await whopClient.verifyUserToken(req.headers);
    
    const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(req.nextUrl.searchParams.get("limit") || "10");
    const companyId = req.nextUrl.searchParams.get("companyId") || env.NEXT_PUBLIC_WHOP_COMPANY_ID;
    
    const payments = await whopClient.payments.list({
      company_id: companyId,
      page,
      limit,
    });
    
    return NextResponse.json({
      success: true,
      data: payments,
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 401 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const whopClient = getWhopClient();
    const { userId } = await whopClient.verifyUserToken(req.headers);
    
    const { paymentId } = await req.json();
    
    if (!paymentId) {
      return NextResponse.json(
        {
          success: false,
          error: "Payment ID is required",
        },
        { status: 400 }
      );
    }
    
    const payment = await whopClient.payments.get(paymentId);
    
    return NextResponse.json({
      success: true,
      data: payment,
    });
  } catch (error) {
    console.error("Error fetching payment:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 401 }
    );
  }
}