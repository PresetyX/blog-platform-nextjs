import type { Metadata } from "next";
import { MarkdownEditor } from "@/components/MarkdownEditor";

export const metadata: Metadata = { title: "Markdown editor", robots: { index: false } };

export default function EditorPage() {
  return (
    <>
      <h1>Markdown editor</h1>
      <p className="meta">Write a post with a live preview, then download it as a front-matter .md file for <code>content/posts</code>.</p>
      <MarkdownEditor />
    </>
  );
}
