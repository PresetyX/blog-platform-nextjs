"use client";

import { useEffect, useState } from "react";

/** Registers one view per browser session and shows the running total. */
export function ViewCounter({ slug }: { slug: string }) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    const key = `viewed:${slug}`;
    let alreadyCounted = false;
    try {
      alreadyCounted = sessionStorage.getItem(key) === "1";
      sessionStorage.setItem(key, "1");
    } catch {
      /* storage blocked: count every visit */
    }
    fetch(`/api/views/${slug}`, { method: alreadyCounted ? "GET" : "POST" })
      .then((r) => r.json())
      .then((d: { views: number }) => setViews(d.views))
      .catch(() => setViews(null));
  }, [slug]);

  return <span>{views === null ? "…" : `${views} view${views === 1 ? "" : "s"}`}</span>;
}
