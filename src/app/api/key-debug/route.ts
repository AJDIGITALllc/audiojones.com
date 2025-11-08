// src/app/api/key-debug/route.ts - Debug the private key format
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const privateKey = process.env.FIREBASE_PRIVATE_KEY;
  
  return NextResponse.json({
    has_key: !!privateKey,
    key_length: privateKey?.length || 0,
    starts_with_quote: privateKey?.startsWith('"'),
    ends_with_quote: privateKey?.endsWith('"'),
    starts_with_begin: privateKey?.includes('-----BEGIN PRIVATE KEY-----'),
    has_backslash_n: privateKey?.includes('\\n'),
    has_actual_newline: privateKey?.includes('\n'),
    first_50_chars: privateKey?.substring(0, 50),
    last_50_chars: privateKey?.substring((privateKey?.length || 0) - 50)
  });
}

export async function POST(req: NextRequest) {
  try {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    
    if (!privateKey) {
      return NextResponse.json({ error: "No private key found" }, { status: 400 });
    }
    
    // Try different processing approaches
    const approaches = {
      original: privateKey,
      remove_quotes: privateKey.replace(/^"|"$/g, ''),
      replace_backslash_n: privateKey.replace(/\\n/g, '\n'),
      both: privateKey.replace(/^"|"$/g, '').replace(/\\n/g, '\n')
    };
    
    const results = {};
    
    for (const [name, processedKey] of Object.entries(approaches)) {
      try {
        const { cert } = await import("firebase-admin/app");
        
        cert({
          projectId: "audiojoneswebsite",
          clientEmail: "firebase-adminsdk-fbsvc@audiojoneswebsite.iam.gserviceaccount.com",
          privateKey: processedKey,
        });
        
        results[name] = "✅ SUCCESS";
      } catch (error: any) {
        results[name] = `❌ ${error.message}`;
      }
    }
    
    return NextResponse.json({
      key_length: privateKey?.length,
      approaches: results
    });
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}