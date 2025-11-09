// src/app/api/test-data/route.ts
import { NextResponse } from "next/server";
import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getFirebaseApp(): App {
  if (getApps().length === 0) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!projectId || !clientEmail || !privateKey) {
      console.warn("[test-data] Firebase env vars missing");
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

export async function GET() {
  try {
    const app = getFirebaseApp();
    const db = getFirestore(app);

    // Check customers
    const customersSnapshot = await db.collection("customers").limit(5).get();
    const customers = customersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Check events  
    const eventsSnapshot = await db.collection("subscription_events").limit(5).get();
    const events = eventsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({
      ok: true,
      customers: {
        count: customersSnapshot.size,
        data: customers
      },
      events: {
        count: eventsSnapshot.size,  
        data: events
      }
    });

  } catch (error) {
    console.error("Test data check failed:", error);
    return NextResponse.json({ 
      ok: false, 
      error: error instanceof Error ? error.message : "Unknown error" 
    }, { status: 500 });
  }
}