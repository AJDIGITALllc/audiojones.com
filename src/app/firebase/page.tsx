import AuthWidget from "@/components/AuthWidget";
import FirebaseStorageUploader from "@/components/FirebaseStorageUploader";

/**
 * Renders a demonstration page for Firebase client integrations.
 * This page includes components for authentication, file uploads to Firebase Storage,
 * and an example of how to call a Firebase Function.
 * @returns {JSX.Element} The Firebase integration demo page.
 */
export default function FirebasePage() {
  return (
    <main className="min-h-screen bg-[#111] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16 space-y-10">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold">Firebase Integration</h1>
            <p className="text-white/75">Auth, Storage, and Functions (client wiring)</p>
          </div>
          <AuthWidget />
        </header>

        <section className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-bold">Storage Uploader</h2>
          <p className="text-white/75 mb-3 text-sm">Uploads to your Firebase Storage bucket. Sign in to upload under your UID path.</p>
          <FirebaseStorageUploader />
        </section>

        <section className="rounded-xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-xl font-bold">Callable Functions</h2>
          <p className="text-white/75 text-sm">Client is ready via firebase/functions. Once you deploy a callable (e.g., <code>helloWorld</code>), we can invoke it here.</p>
          <pre className="block mt-3 text-xs text-white/70 bg-black/30 p-3 rounded-md overflow-auto">
            <code>{`// Example:
import { httpsCallable } from "firebase/functions";
const fn = httpsCallable(functions, "helloWorld");
const res = await fn({ name: "Audio" });
console.log(res.data);
`}</code>
          </pre>
        </section>
      </div>
    </main>
  );
}
