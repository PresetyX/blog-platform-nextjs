---
title: "Hello, Next.js App Router"
description: "Why this blog is built on the App Router and what changed compared to the pages directory."
date: 2025-12-03
tags: [nextjs, react]
---

The App Router makes **server components** the default. Pages that only read markdown files never ship their data-loading code to the browser.

## What I like

- Layouts that persist between navigations
- `generateMetadata` for per-page SEO tags
- Route handlers for small APIs such as the view counter

```ts
export async function generateMetadata({ params }) {
  const post = getPost(params.slug);
  return { title: post?.title };
}
```

More soon.
