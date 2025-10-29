import 'dotenv/config';
import { getAdminApp } from '../src/lib/server/firebaseAdmin';
import { getAuth } from 'firebase-admin/auth';

async function main() {
  const email = process.argv[2];
  if (!email) {
    console.error('Usage: tsx tools/grant-admin.ts <email>');
    process.exit(1);
  }

  const auth = getAuth(getAdminApp());
  const user = await auth.getUserByEmail(email);
  const oldClaims = user.customClaims || {};
  await auth.setCustomUserClaims(user.uid, { ...oldClaims, admin: true });

  console.log(`✅ Set admin=true on uid=${user.uid} (${email})`);
}

main().catch((e) => {
  console.error('❌ Failed to grant admin:', e);
  process.exit(1);
});