import type { Metadata } from "next";
import Link from "next/link";
import { topPosts, viewsPerDay } from "@/lib/analytics";
import { getPost } from "@/lib/posts";

export const metadata: Metadata = { title: "Analytics", robots: { index: false } };
export const dynamic = "force-dynamic";

export default function AnalyticsPage() {
  const days = viewsPerDay(14);
  const max = Math.max(1, ...days.map((d) => d.views));
  const top = topPosts(10);
  return (
    <>
      <h1>Analytics</h1>
      <p className="meta">Page views over the last 14 days (UTC).</p>
      <div className="bars" role="img" aria-label="Views per day">
        {days.map((d) => (
          <div key={d.day} title={`${d.day}: ${d.views}`} style={{ height: `${(d.views / max) * 100}%` }} />
        ))}
      </div>
      <h2>Top posts</h2>
      {top.length === 0 ? (
        <p>No views recorded yet.</p>
      ) : (
        <ol>
          {top.map((t) => (
            <li key={t.slug}>
              <Link href={`/posts/${t.slug}`}>{getPost(t.slug)?.title ?? t.slug}</Link> — {t.total}
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
