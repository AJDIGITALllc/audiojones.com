// src/app/api/admin/alerts/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin
function getFirebaseApp() {
  if (getApps().length === 0) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!projectId || !clientEmail || !privateKey) {
      throw new Error("Firebase Admin credentials not configured");
    }

    return initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }
  return getApps()[0]!;
}

// Admin authentication middleware
function requireAdmin(req: NextRequest) {
  const adminKey = req.headers.get("admin-key");
  if (adminKey !== process.env.ADMIN_KEY) {
    throw new Error("Admin access required");
  }
}

// GET - Get specific alert
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    requireAdmin(req);
    const { id } = await params;

    const app = getFirebaseApp();
    const db = getFirestore(app);

    const doc = await db.collection("alerts").doc(id).get();
    
    if (!doc.exists) {
      return NextResponse.json(
        { ok: false, error: "Alert not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ok: true,
      alert: { id: doc.id, ...doc.data() },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("[alerts API] GET error:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: error instanceof Error && error.message.includes("Admin") ? 403 : 500 }
    );
  }
}

// PATCH - Update alert (primarily for dismissing)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    requireAdmin(req);
    const { id } = await params;
    const body = await req.json();

    const app = getFirebaseApp();
    const db = getFirestore(app);

    const docRef = db.collection("alerts").doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json(
        { ok: false, error: "Alert not found" },
        { status: 404 }
      );
    }

    const updateData: any = {};

    // Handle dismiss action
    if (body.action === 'dismiss') {
      updateData.status = 'dismissed';
      updateData.dismissed_at = new Date().toISOString();
      updateData.dismissed_by = body.dismissed_by || 'admin';
    }

    // Handle reactivate action
    if (body.action === 'reactivate') {
      updateData.status = 'active';
      updateData.dismissed_at = null;
      updateData.dismissed_by = null;
    }

    // Allow updating specific fields
    if (body.title) updateData.title = body.title.trim();
    if (body.message) updateData.message = body.message.trim();
    if (body.severity) updateData.severity = body.severity;
    if (body.metadata) updateData.metadata = { ...doc.data()?.metadata, ...body.metadata };

    updateData.updated_at = new Date().toISOString();

    await docRef.update(updateData);

    // Get updated document
    const updatedDoc = await docRef.get();

    return NextResponse.json({
      ok: true,
      alert: { id: updatedDoc.id, ...updatedDoc.data() },
      action: body.action || 'update',
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("[alerts API] PATCH error:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: error instanceof Error && error.message.includes("Admin") ? 403 : 500 }
    );
  }
}

// DELETE - Delete alert (for cleanup)
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    requireAdmin(req);
    const { id } = await params;

    const app = getFirebaseApp();
    const db = getFirestore(app);

    const docRef = db.collection("alerts").doc(id);
    const doc = await docRef.get();
    
    if (!doc.exists) {
      return NextResponse.json(
        { ok: false, error: "Alert not found" },
        { status: 404 }
      );
    }

    await docRef.delete();

    return NextResponse.json({
      ok: true,
      message: "Alert deleted successfully",
      alert_id: id,
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("[alerts API] DELETE error:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: error instanceof Error && error.message.includes("Admin") ? 403 : 500 }
    );
  }
}