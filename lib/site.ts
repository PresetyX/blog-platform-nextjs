export const site = {
  name: "Dev Notes",
  description: "Engineering notes on web development, TypeScript and tooling.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  author: "Pedro Henrique",
};

export const absoluteUrl = (path: string) => `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
