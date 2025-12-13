import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  return [
    { url: absoluteUrl("/"), lastModified: posts[0]?.date, changeFrequency: "weekly", priority: 1 },
    ...posts.map((p) => ({
      url: absoluteUrl(`/posts/${p.slug}`),
      lastModified: p.date,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
