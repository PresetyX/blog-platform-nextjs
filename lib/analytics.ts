import fs from "node:fs";
import path from "node:path";

type Views = Record<string, { total: number; days: Record<string, number> }>;

const file = () => path.resolve(process.env.VIEWS_FILE ?? "data/views.json");

function read(target: string): Views {
  try {
    return JSON.parse(fs.readFileSync(target, "utf8")) as Views;
  } catch {
    return {};
  }
}

/** Increment the view counter of a post (total and per UTC day). Returns the new total. */
export function recordView(slug: string, now = new Date(), target = file()): number {
  const views = read(target);
  const day = now.toISOString().slice(0, 10);
  const entry = (views[slug] ??= { total: 0, days: {} });
  entry.total += 1;
  entry.days[day] = (entry.days[day] ?? 0) + 1;
  fs.mkdirSync(path.dirname(target), { recursive: true });
  const tmp = `${target}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(views, null, 2));
  fs.renameSync(tmp, target); // atomic replace so a crash never leaves half a file
  return entry.total;
}

export function getViews(slug: string, target = file()): number {
  return read(target)[slug]?.total ?? 0;
}

export function topPosts(limit = 10, target = file()) {
  return Object.entries(read(target))
    .map(([slug, v]) => ({ slug, total: v.total }))
    .sort((a, b) => b.total - a.total)
    .slice(0, limit);
}

export function viewsPerDay(days = 14, now = new Date(), target = file()) {
  const all = read(target);
  return Array.from({ length: days }, (_, i) => {
    const d = new Date(now.getTime() - (days - 1 - i) * 86_400_000).toISOString().slice(0, 10);
    return { day: d, views: Object.values(all).reduce((s, v) => s + (v.days[d] ?? 0), 0) };
  });
}
