"use client";
import Image, { ImageProps } from "next/image";
import { imageKitLoader } from "@/lib/imagekit";

type Props = Omit<ImageProps, "loader"> & { noVersion?: boolean };

export default function IKImage(props: Props) {
  const { noVersion, ...rest } = props;

  // If you explicitly want a raw, local image without IK/versioning
  if (noVersion) return <Image {...rest} />;

  // Use our loader; keep unoptimized so ImageKit can handle transforms in prod.
  // In dev (no IK), the loader returns the original local path and this still works.
  return <Image {...rest} loader={imageKitLoader} unoptimized />;
}