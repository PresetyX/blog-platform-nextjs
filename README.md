# blog-platform-nextjs

Professional blog platform with Next.js (App Router), React, Node.js and TypeScript, including SEO optimization, a markdown editor and analytics.

Posts are markdown files with front matter in `content/posts` and page-view counters are stored in a JSON file. Both sit behind small modules (`lib/posts.ts`, `lib/analytics.ts`), so a database such as PostgreSQL or a cache such as Redis can replace them without touching the pages.

## Features

- **Posts**: markdown + front matter, tags, reading time, statically generated pages
- **SEO**: per-page metadata, canonical URLs, Open Graph, JSON-LD `BlogPosting`, `sitemap.xml`, `robots.txt`, RSS feed (`/rss.xml`)
- **Markdown editor** (`/editor`): live preview, raw HTML escaped, download as a ready-to-commit `.md`
- **Analytics**: one view per browser session through `/api/views/[slug]`, a 14-day chart and top posts at `/analytics`
- **Tests** for markdown rendering, post loading (including path traversal) and analytics

## Getting started

```bash
npm install
cp .env.example .env.local
npm run dev        # http://localhost:3000
npm test
npm run typecheck
npm run build && npm start
```

Add a post by creating `content/posts/my-post.md`:

```md
---
title: "My post"
description: "Shown in listings and meta tags"
date: 2026-01-01
tags: [nextjs]
---

Content here.
```

## Configuration

| Variable | Default | Purpose |
|----------|---------|---------|
| `NEXT_PUBLIC_SITE_URL` | `http://localhost:3000` | Canonical URLs, sitemap, RSS |
| `VIEWS_FILE` | `data/views.json` | View counter storage |
