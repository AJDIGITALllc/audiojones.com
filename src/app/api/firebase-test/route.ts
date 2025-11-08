// src/app/api/firebase-test/route.ts - Simple Firebase test
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({ 
    status: "ok", 
    message: "Firebase test endpoint ready",
    env_check: {
      has_project_id: !!process.env.FIREBASE_PROJECT_ID,
      project_id: process.env.FIREBASE_PROJECT_ID,
      has_client_email: !!process.env.FIREBASE_CLIENT_EMAIL,
      client_email: process.env.FIREBASE_CLIENT_EMAIL?.substring(0, 30) + "...",
      has_private_key: !!process.env.FIREBASE_PRIVATE_KEY,
      private_key_start: process.env.FIREBASE_PRIVATE_KEY?.substring(0, 50) + "...",
      private_key_length: process.env.FIREBASE_PRIVATE_KEY?.length
    }
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("[firebase test] Received:", body);
    
    // Test Firebase initialization with minimal code
    const { getApps, initializeApp, cert } = await import("firebase-admin/app");
    const { getFirestore } = await import("firebase-admin/firestore");
    
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    
    console.log("[firebase test] Env vars:", { 
      projectId: !!projectId, 
      clientEmail: !!clientEmail, 
      privateKey: !!privateKey,
      privateKeyLength: privateKey?.length 
    });
    
    if (getApps().length === 0) {
      const processedPrivateKey = privateKey?.replace(/\\n/g, "\n");
      
      const app = initializeApp({
        credential: cert({
          projectId: projectId!,
          clientEmail: clientEmail!,
          privateKey: processedPrivateKey!,
        }),
      });
      
      console.log("[firebase test] Firebase initialized successfully");
    }
    
    // Try to get Firestore
    const db = getFirestore();
    console.log("[firebase test] Firestore connected");
    
    return NextResponse.json({
      success: true,
      message: "Firebase test successful!",
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error("[firebase test] Error:", error);
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}