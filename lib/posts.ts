import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { readingTimeMinutes, renderMarkdown } from "./markdown";

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: number;
}

export interface Post extends PostMeta {
  html: string;
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export function parsePost(slug: string, raw: string): Post {
  const { data, content } = matter(raw);
  if (typeof data.title !== "string" || !data.date) {
    throw new Error(`Post "${slug}" needs a title and a date in its front matter`);
  }
  return {
    slug,
    title: data.title,
    description: typeof data.description === "string" ? data.description : "",
    date: new Date(data.date).toISOString(),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    readingTime: readingTimeMinutes(content),
    html: renderMarkdown(content),
  };
}

export function getAllPosts(dir = POSTS_DIR): Post[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => parsePost(f.replace(/\.md$/, ""), fs.readFileSync(path.join(dir, f), "utf8")))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string, dir = POSTS_DIR): Post | undefined {
  // slugs come from the URL: only allow plain file names
  if (!/^[a-z0-9-]+$/.test(slug)) return undefined;
  const file = path.join(dir, `${slug}.md`);
  return fs.existsSync(file) ? parsePost(slug, fs.readFileSync(file, "utf8")) : undefined;
}

export function getAllTags(posts: PostMeta[]): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const p of posts) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts].map(([tag, count]) => ({ tag, count })).sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}
