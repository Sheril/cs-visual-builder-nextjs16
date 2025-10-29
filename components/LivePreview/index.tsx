"use client"

import ContentstackLivePreview from "@contentstack/live-preview-utils";
import { useEffect } from "react";

const CS_API_KEY = process.env.NEXT_PUBLIC_CS_API_KEY ?? "";
const CS_ENVIRONMENT = process.env.NEXT_PUBLIC_CS_ENVIRONMENT ?? "";
const CS_HOST = process.env.NEXT_PUBLIC_CS_HOST ?? "";


export default function LivePreviewInitComponent() {
  useEffect(() => {
    // Initialize the Contentstack Live Preview SDK
    // Configuration Docs: https://www.contentstack.com/docs/developers/set-up-live-preview/get-started-with-live-preview-utils-sdk-v3#config

    ContentstackLivePreview.init({
      enable: true,
      ssr: true,
      editButton: { enable: true },
      stackDetails: {
        apiKey: CS_API_KEY,
        environment: CS_ENVIRONMENT,
        branch: "main",
      },
      // Enable Visual Builder
      mode: "builder",
      clientUrlParams: {
        protocol: "https",
        host: CS_HOST,
        port: 443,
      },
    });
  }, []);

  return null;
}
