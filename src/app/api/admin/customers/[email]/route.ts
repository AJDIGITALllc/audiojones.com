// src/app/api/admin/customers/[email]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getFirebaseApp(): App {
  if (getApps().length === 0) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!projectId || !clientEmail || !privateKey) {
      console.warn("[admin/customers] Firebase env vars missing");
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

export async function GET(
  req: NextRequest, 
  { params }: { params: Promise<{ email: string }> }
) {
  // Verify admin access
  const adminKey = req.headers.get('admin-key') || req.headers.get('X-Admin-Key');
  const expectedAdminKey = process.env.ADMIN_KEY;
  
  if (!expectedAdminKey) {
    return NextResponse.json({ error: 'Server configuration error: ADMIN_KEY not set' }, { status: 500 });
  }
  
  if (!adminKey || adminKey !== expectedAdminKey) {
    return NextResponse.json({ error: 'Unauthorized: Invalid or missing admin key' }, { status: 401 });
  }

  try {
    const { email } = await params;
    const decodedEmail = decodeURIComponent(email);
    const app = getFirebaseApp();
    const db = getFirestore(app);

    // Get customer by email (document ID = email)
    const customerDoc = await db.collection("customers").doc(decodedEmail).get();
    
    let customer = null;
    if (customerDoc.exists) {
      customer = {
        email: decodedEmail,
        ...customerDoc.data()
      };
    }

    // Get all subscription events for this customer
    const eventsSnapshot = await db
      .collection("subscription_events")
      .where("customer_email", "==", decodedEmail)
      .orderBy("timestamp", "desc")
      .limit(50) // Limit to recent 50 events
      .get();

    const events = eventsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    return NextResponse.json({
      ok: true,
      customer,
      events,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("[admin/customers] Error:", error);
    
    // Handle specific Firestore errors
    if (error instanceof Error) {
      if (error.message.includes('index')) {
        return NextResponse.json({
          ok: false,
          error: 'Database index required for customer_email + timestamp query',
          customer: null,
          events: [],
        });
      }
    }
    
    return NextResponse.json(
      { 
        ok: false, 
        error: error instanceof Error ? error.message : "Unknown error",
        customer: null,
        events: [],
      },
      { status: 500 }
    );
  }
}