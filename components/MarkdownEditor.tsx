"use client";

import { useMemo, useState } from "react";
import { readingTimeMinutes, renderMarkdown, slugify } from "@/lib/markdown";

const INITIAL = "## Heading\n\nStart writing in **markdown**…\n";

export function MarkdownEditor() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState(INITIAL);
  const html = useMemo(() => renderMarkdown(body), [body]);

  function download() {
    const slug = slugify(title) || "untitled";
    const date = new Date().toISOString().slice(0, 10);
    const file = `---\ntitle: ${JSON.stringify(title || "Untitled")}\ndescription: ""\ndate: ${date}\ntags: []\n---\n\n${body}`;
    const url = URL.createObjectURL(new Blob([file], { type: "text/markdown" }));
    const a = Object.assign(document.createElement("a"), { href: url, download: `${slug}.md` });
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <div className="toolbar">
        <input placeholder="Post title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button onClick={download}>Download .md</button>
      </div>
      <div className="editor">
        <textarea aria-label="Markdown source" value={body} onChange={(e) => setBody(e.target.value)} />
        <div className="preview prose" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
      <p className="meta">{readingTimeMinutes(body)} min read</p>
    </>
  );
}
