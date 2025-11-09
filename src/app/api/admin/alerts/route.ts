// src/app/api/admin/alerts/route.ts
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

// GET - Fetch all alerts with optional filtering
export async function GET(req: NextRequest) {
  try {
    requireAdmin(req);

    const app = getFirebaseApp();
    const db = getFirestore(app);
    
    const url = new URL(req.url);
    const status = url.searchParams.get('status'); // 'active', 'dismissed', 'all'
    const severity = url.searchParams.get('severity'); // 'critical', 'warning', 'info'
    const limit = parseInt(url.searchParams.get('limit') || '50');

    let query = db.collection("alerts").orderBy("created_at", "desc");

    // Filter by status
    if (status && status !== 'all') {
      query = query.where("status", "==", status);
    }

    // Filter by severity
    if (severity) {
      query = query.where("severity", "==", severity);
    }

    // Apply limit
    query = query.limit(limit);

    const snapshot = await query.get();
    const alerts: any[] = [];

    snapshot.forEach((doc) => {
      alerts.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    // Get alert counts by status and severity
    const statsSnapshot = await db.collection("alerts").get();
    const stats = {
      total: statsSnapshot.size,
      active: 0,
      dismissed: 0,
      critical: 0,
      warning: 0,
      info: 0,
    };

    statsSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.status === 'active') stats.active++;
      if (data.status === 'dismissed') stats.dismissed++;
      if (data.severity === 'critical') stats.critical++;
      if (data.severity === 'warning') stats.warning++;
      if (data.severity === 'info') stats.info++;
    });

    return NextResponse.json({
      ok: true,
      alerts,
      stats,
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

// POST - Create a new alert
export async function POST(req: NextRequest) {
  try {
    requireAdmin(req);

    const body = await req.json();
    const { title, message, severity, category, metadata, auto_dismiss_minutes } = body;

    if (!title || !message || !severity) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields: title, message, severity" },
        { status: 400 }
      );
    }

    const app = getFirebaseApp();
    const db = getFirestore(app);

    const alertData = {
      title: title.trim(),
      message: message.trim(),
      severity: severity, // 'critical', 'warning', 'info'
      category: category || 'system', // 'webhook', 'payment', 'system', 'user'
      status: 'active',
      created_at: new Date().toISOString(),
      created_by: 'admin', // Could be enhanced with actual user info
      dismissed_at: null,
      dismissed_by: null,
      metadata: metadata || {},
      auto_dismiss_at: auto_dismiss_minutes 
        ? new Date(Date.now() + auto_dismiss_minutes * 60 * 1000).toISOString()
        : null,
    };

    const docRef = await db.collection("alerts").add(alertData);

    return NextResponse.json({
      ok: true,
      alert_id: docRef.id,
      alert: { id: docRef.id, ...alertData },
      timestamp: new Date().toISOString(),
    });

  } catch (error) {
    console.error("[alerts API] POST error:", error);
    return NextResponse.json(
      { ok: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: error instanceof Error && error.message.includes("Admin") ? 403 : 500 }
    );
  }
}