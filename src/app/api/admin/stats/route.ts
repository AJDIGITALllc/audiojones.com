// src/app/api/admin/stats/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getFirebaseApp(): App {
  if (getApps().length === 0) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!projectId || !clientEmail || !privateKey) {
      console.warn("[admin/stats] Firebase env vars missing");
      return initializeApp();
    }

    return initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }
  return getApps()[0];
}

export async function GET(req: NextRequest) {
  // Verify admin access
  const adminKey = req.headers.get("X-Admin-Key");
  if (adminKey !== process.env.ADMIN_KEY) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const app = getFirebaseApp();
    const db = getFirestore(app);

    // Get total customers
    const customersSnapshot = await db.collection("customers").get();
    const totalCustomers = customersSnapshot.size;

    // Get active subscriptions (customers with status "active")
    const activeCustomersSnapshot = await db
      .collection("customers")
      .where("status", "==", "active")
      .get();
    const activeSubscriptions = activeCustomersSnapshot.size;

    // Get total events
    const eventsSnapshot = await db.collection("subscription_events").get();
    const totalEvents = eventsSnapshot.size;

    // Get recent events (last 24 hours)
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const recentEventsSnapshot = await db
      .collection("subscription_events")
      .where("timestamp", ">=", yesterday.toISOString())
      .get();
    const recentEvents = recentEventsSnapshot.size;

    // Get event type breakdown
    const eventTypes: { [key: string]: number } = {};
    eventsSnapshot.docs.forEach(doc => {
      const data = doc.data();
      const eventType = data.event_type || "unknown";
      eventTypes[eventType] = (eventTypes[eventType] || 0) + 1;
    });

    // Get customer status breakdown
    const customerStatuses: { [key: string]: number } = {};
    customersSnapshot.docs.forEach(doc => {
      const data = doc.data();
      const status = data.status || "unknown";
      customerStatuses[status] = (customerStatuses[status] || 0) + 1;
    });

    return NextResponse.json({
      ok: true,
      stats: {
        totalCustomers,
        activeSubscriptions,
        totalEvents,
        recentEvents,
        eventTypes,
        customerStatuses,
      },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("[admin/stats] Error:", error);
    return NextResponse.json(
      { 
        ok: false, 
        error: error instanceof Error ? error.message : "Unknown error" 
      },
      { status: 500 }
    );
  }
}