import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { describe, it } from "node:test";
import { getViews, recordView, topPosts, viewsPerDay } from "../lib/analytics";
import { readingTimeMinutes, renderMarkdown, slugify } from "../lib/markdown";
import { getAllPosts, getAllTags, getPost, parsePost } from "../lib/posts";

const postsDir = path.join(process.cwd(), "content", "posts");

describe("markdown", () => {
  it("renders markdown and does not pass raw HTML through", () => {
    const html = renderMarkdown("# Hi\n\n<script>alert(1)</script>");
    assert.match(html, /<h1>Hi<\/h1>/);
    assert.ok(!html.includes("<script>"));
  });

  it("computes reading time and slugs", () => {
    assert.equal(readingTimeMinutes("word ".repeat(450)), 3);
    assert.equal(readingTimeMinutes(""), 1);
    assert.equal(slugify("Olá, Mundo! Next.js 14"), "ola-mundo-next-js-14");
  });
});

describe("posts", () => {
  it("loads posts sorted by date, newest first", () => {
    const posts = getAllPosts(postsDir);
    assert.ok(posts.length >= 3);
    const dates = posts.map((p) => p.date);
    assert.deepEqual(dates, [...dates].sort().reverse());
    assert.ok(getAllTags(posts).some((t) => t.tag === "nextjs" && t.count === 2));
  });

  it("rejects path traversal and unknown slugs", () => {
    assert.equal(getPost("../package", postsDir), undefined);
    assert.equal(getPost("does-not-exist", postsDir), undefined);
    assert.equal(getPost("hello-nextjs", postsDir)?.title, "Hello, Next.js App Router");
  });

  it("requires title and date", () => {
    assert.throws(() => parsePost("x", "---\ntitle: only\n---\nbody"));
  });
});

describe("analytics", () => {
  it("counts views per post and per day", () => {
    const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "views-")), "views.json");
    const day = new Date("2026-01-10T12:00:00Z");
    assert.equal(recordView("a", day, file), 1);
    assert.equal(recordView("a", day, file), 2);
    recordView("b", day, file);
    assert.equal(getViews("a", file), 2);
    assert.equal(getViews("missing", file), 0);
    assert.deepEqual(topPosts(1, file), [{ slug: "a", total: 2 }]);
    const last = viewsPerDay(2, day, file).at(-1);
    assert.deepEqual(last, { day: "2026-01-10", views: 3 });
  });
});
