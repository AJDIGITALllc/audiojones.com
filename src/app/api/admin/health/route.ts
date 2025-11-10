// src/app/api/admin/health/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/server/firebaseAdmin";
import { requireAdmin } from "@/lib/server/requireAdmin";

export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);

    // Test Firestore connection and get collection counts
    const [customersCount, eventsCount, alertsCount] = await Promise.all([
      db.collection("customers").count().get().then(snapshot => snapshot.data().count),
      db.collection("subscription_events").count().get().then(snapshot => snapshot.data().count),
      db.collection("alerts").count().get().then(snapshot => snapshot.data().count),
    ]);

    return NextResponse.json({
      ok: true,
      status: "healthy",
      firestore: {
        connected: true,
        collections: {
          customers: customersCount,
          subscription_events: eventsCount,
          alerts: alertsCount,
        }
      },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    // If it's already a NextResponse (from requireAdmin), return it
    if (error instanceof NextResponse) {
      return error;
    }

    console.error("[admin/health] Health check failed:", error);
    
    return NextResponse.json(
      { 
        ok: false, 
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}