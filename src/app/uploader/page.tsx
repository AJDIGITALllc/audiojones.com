import ImageKitUploader from "@/components/ImageKitUploader";
import ImageKitGallery from "@/components/ImageKitGallery";

/**
 * Renders the uploader page, which allows users to upload files to ImageKit.
 * This page also displays a gallery of recently uploaded files.
 * @returns {JSX.Element} The uploader page component.
 */
export default function UploaderPage() {
  return (
    <main className="min-h-screen bg-[#111] text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-extrabold">Upload to ImageKit</h1>
        <p className="mt-2 text-white/75 max-w-2xl">
          Use the uploader below to push new assets to your ImageKit account.
          Files are placed under <code className="font-mono">/AUDIOJONES.COM/uploads</code>.
        </p>

        <ImageKitUploader />

        <h2 className="mt-12 mb-4 text-2xl font-bold">Recent uploads</h2>
        <ImageKitGallery />
      </div>
    </main>
  );
}

