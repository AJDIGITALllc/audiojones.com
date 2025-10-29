"use client";
import dynamic from "next/dynamic";

const ImageKitUploader = dynamic(() => import("@/components/ImageKitUploader"), { ssr: false });
export default ImageKitUploader;
