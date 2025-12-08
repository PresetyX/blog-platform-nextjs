import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewCounter } from "@/components/ViewCounter";
import { getAllPosts, getPost } from "@/lib/posts";
import { absoluteUrl, site } from "@/lib/site";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const post = getPost(params.slug);
  if (!post) return {};
  const url = absoluteUrl(`/posts/${post.slug}`);
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: { type: "article", url, title: post.title, description: post.description, publishedTime: post.date, tags: post.tags },
  };
}

export default function PostPage({ params }: Props) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { "@type": "Person", name: site.author },
    mainEntityOfPage: absoluteUrl(`/posts/${post.slug}`),
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <h1>{post.title}</h1>
      <p className="meta">
        {new Date(post.date).toLocaleDateString("en-US", { dateStyle: "long", timeZone: "UTC" })} · {post.readingTime} min read ·{" "}
        <ViewCounter slug={post.slug} />
      </p>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
      <p>{post.tags.map((t) => <span key={t} className="tag">#{t}</span>)}</p>
    </article>
  );
}
