// src/app/api/admin/customers/[email]/note/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getApps, initializeApp, cert, App } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getFirebaseApp(): App {
  if (getApps().length === 0) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!projectId || !clientEmail || !privateKey) {
      console.warn("[admin/customers/note] Firebase env vars missing");
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

export async function POST(
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
    
    // Parse request body
    const body = await req.json();
    const { message } = body;
    
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ 
        error: 'Invalid request: message is required and must be a non-empty string' 
      }, { status: 400 });
    }

    const app = getFirebaseApp();
    const db = getFirestore(app);

    // Write note to subcollection
    const noteData = {
      message: message.trim(),
      created_at: new Date().toISOString(),
      created_by: "admin"
    };

    const noteRef = await db
      .collection("customers")
      .doc(decodedEmail)
      .collection("notes")
      .add(noteData);

    return NextResponse.json({
      ok: true,
      noteId: noteRef.id,
      timestamp: noteData.created_at
    });

  } catch (error) {
    console.error("[admin/customers/note] Error:", error);
    
    return NextResponse.json(
      { 
        ok: false, 
        error: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}