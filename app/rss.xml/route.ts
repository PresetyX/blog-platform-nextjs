import { getAllPosts } from "@/lib/posts";
import { absoluteUrl, site } from "@/lib/site";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = getAllPosts()
    .map(
      (p) => `<item>
<title>${esc(p.title)}</title>
<link>${absoluteUrl(`/posts/${p.slug}`)}</link>
<guid>${absoluteUrl(`/posts/${p.slug}`)}</guid>
<pubDate>${new Date(p.date).toUTCString()}</pubDate>
<description>${esc(p.description)}</description>
</item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>${esc(site.name)}</title>
<link>${site.url}</link>
<description>${esc(site.description)}</description>
${items}
</channel></rss>`;

  return new Response(xml, { headers: { "content-type": "application/rss+xml; charset=utf-8" } });
}
