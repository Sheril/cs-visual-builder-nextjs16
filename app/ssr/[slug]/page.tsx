import Contentstack, { LivePreviewQuery } from "contentstack";
import LivePreview from "@/components/LivePreview";
import { addEditableTags } from "@contentstack/utils";

const CS_CONTENT_TYPE_UID = "page";

// Initialize the Contentstack SDK
const Stack = Contentstack.Stack({
  api_key: process.env.NEXT_PUBLIC_CS_API_KEY ?? "",
  delivery_token: process.env.NEXT_PUBLIC_CS_DELIVERY_TOKEN ?? "",
  environment: process.env.NEXT_PUBLIC_CS_ENVIRONMENT ?? "",
  region: Contentstack.Region.US,
  live_preview: {
    enable: true,
    host: process.env.NEXT_PUBLIC_CS_PREVIEW_HOST ?? "",
    preview_token: process.env.NEXT_PUBLIC_CS_PREVIEW_TOKEN ?? "",
  },
});

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Page({
  params,
  searchParams,
}: PageProps) {
  const { slug } = await params;
  const searchParamsObj = await searchParams;
  const isPreviewMode = !!searchParamsObj?.live_preview;

  if (isPreviewMode) {
    Stack.livePreviewQuery(searchParamsObj as unknown as LivePreviewQuery);
  }

  // Query the entries from Contentstack using the URL
  const entries = await Stack.ContentType(CS_CONTENT_TYPE_UID)
    .Query()
    .where("url", `/ssr/${slug}`)
    .limit(1)
    .toJSON()
    .find();

  const entry = entries?.[0]?.[0] ?? null;

  // This will mutate the entry object with the field Ids for visual experience
  addEditableTags(entry, CS_CONTENT_TYPE_UID, true, entry?.locale);

  return (
    <>
      <LivePreview />
      <h1 data-cslp={entry?.$?.headline?.['data-cslp']}>{entry?.headline}</h1>
      <p data-cslp={entry?.$?.description?.['data-cslp']}>{entry?.description}</p>
    </>
  );
}
