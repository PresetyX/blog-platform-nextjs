import { NextResponse } from "next/server";
import { getViews, recordView } from "@/lib/analytics";
import { getPost } from "@/lib/posts";

export const dynamic = "force-dynamic";

type Ctx = { params: { slug: string } };

export function GET(_req: Request, { params }: Ctx) {
  if (!getPost(params.slug)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ views: getViews(params.slug) });
}

export function POST(_req: Request, { params }: Ctx) {
  // only count views of posts that exist, so the file cannot be filled with arbitrary keys
  if (!getPost(params.slug)) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ views: recordView(params.slug) });
}
