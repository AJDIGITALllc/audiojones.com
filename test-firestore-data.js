const admin = require("firebase-admin");

// Initialize Firebase Admin using environment variables (same as webhook)
if (!admin.apps.length) {
  const projectId = process.env.FIREBASE_PROJECT_ID || "audiojoneswebsite";
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    console.error("❌ Missing Firebase credentials in environment");
    process.exit(1);
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
  });
}

const db = admin.firestore();

async function testFirestoreData() {
  console.log("🔍 Checking Firestore data...");
  
  try {
    // Check customers collection
    const customersSnapshot = await db.collection("customers").limit(10).get();
    console.log(`\n📊 Customers found: ${customersSnapshot.size}`);
    
    customersSnapshot.forEach(doc => {
      const data = doc.data();
      console.log(`  - ${doc.id}: ${data.email} (${data.status})`);
    });
    
    // Check subscription_events collection
    const eventsSnapshot = await db.collection("subscription_events").limit(10).get();
    console.log(`\n📋 Events found: ${eventsSnapshot.size}`);
    
    eventsSnapshot.forEach(doc => {
      const data = doc.data();
      console.log(`  - ${doc.id}: ${data.event_type} for ${data.customer_email}`);
    });
    
    if (customersSnapshot.size === 0 && eventsSnapshot.size === 0) {
      console.log("\n❌ No data found in Firestore collections");
      console.log("🔧 This suggests webhook data isn't persisting properly");
    } else {
      console.log("\n✅ Data found! Webhook → Firestore pipeline is working");
    }
    
  } catch (error) {
    console.error("❌ Firestore test failed:", error.message);
  }
}

testFirestoreData().then(() => process.exit(0));