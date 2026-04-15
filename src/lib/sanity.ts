import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

/**
 * Main Sanity client for frontend queries
 * - useCdn: true in production (cached, faster), false in development (fresh data)
 * - No token needed for public queries
 */
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

/**
 * Server-side client with token for on-demand ISR (Incremental Static Regeneration)
 * Allows revalidating static pages when content changes in Sanity
 * Required for: revalidateTag(), revalidatePath() in Server Actions
 * 
 * To use: 
 * 1. Create a read-only API token in Sanity dashboard
 * 2. Add to .env.local: SANITY_REVALIDATE_TOKEN=sk_...
 * 3. In Server Action: revalidateTag(tagName) after mutations
 */
export const revalidationClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_REVALIDATE_TOKEN,
  useCdn: false, // Always fresh for revalidation
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: any) => builder.image(source);
