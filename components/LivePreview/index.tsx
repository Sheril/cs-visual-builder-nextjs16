"use client"

import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { useEffect } from "react";

export default function LivePreviewInitComponent() {
  useEffect(() => {
    // Initialize the Contentstack Live Preview SDK
    // Configuration Docs: https://www.contentstack.com/docs/developers/set-up-live-preview/get-started-with-live-preview-utils-sdk-v3#config

    ContentstackLivePreview.init({
      enable: true,
      ssr: true,
      editButton: { enable: true },
      stackDetails: {
        apiKey: process.env.NEXT_PUBLIC_CS_API_KEY ?? "",
        environment: process.env.NEXT_PUBLIC_CS_ENVIRONMENT ?? "",
        branch: "main",
      },
      // Enable Visual Builder
      mode: "builder",
      clientUrlParams: {
        protocol: "https",
        host: process.env.NEXT_PUBLIC_CS_HOST ?? "",
        port: 443,
      },
    });
  }, []);

  return null;
}
