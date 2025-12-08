import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { types: { "application/rss+xml": "/rss.xml" } },
  openGraph: { type: "website", siteName: site.name, title: site.name, description: site.description },
  twitter: { card: "summary" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="brand">{site.name}</Link>
          <nav>
            <Link href="/editor">Editor</Link>
            <Link href="/analytics">Analytics</Link>
            <a href="/rss.xml">RSS</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">© {new Date().getFullYear()} {site.author}</footer>
      </body>
    </html>
  );
}
