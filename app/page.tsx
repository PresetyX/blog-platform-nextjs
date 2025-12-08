import Link from "next/link";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { site } from "@/lib/site";

export default function HomePage() {
  const posts = getAllPosts();
  const tags = getAllTags(posts);
  return (
    <>
      <h1>{site.name}</h1>
      <p className="meta">{site.description}</p>
      <p>
        {tags.map((t) => (
          <span key={t.tag} className="tag">#{t.tag} ({t.count})</span>
        ))}
      </p>
      <ul className="post-list">
        {posts.map((p) => (
          <li key={p.slug}>
            <h2><Link href={`/posts/${p.slug}`}>{p.title}</Link></h2>
            <p>{p.description}</p>
            <span className="meta">
              {new Date(p.date).toLocaleDateString("en-US", { dateStyle: "medium", timeZone: "UTC" })} · {p.readingTime} min read
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}
