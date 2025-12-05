import MarkdownIt from "markdown-it";

// `html: false` makes raw HTML in markdown render as text, so user-typed content cannot inject markup.
const md = new MarkdownIt({ html: false, linkify: true, typographer: true });

export function renderMarkdown(source: string): string {
  return md.render(source);
}

export function readingTimeMinutes(source: string, wordsPerMinute = 220): number {
  const words = source.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
}

export function slugify(title: string): string {
  return title
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
