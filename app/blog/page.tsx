import Link from "next/link";
import type { Metadata } from "next";
import { Redis } from "@upstash/redis";

export const metadata: Metadata = {
  title: "Blog — Victory Velocity",
  description: "Insights on generative engine optimization, ChatGPT Ads, and AI-powered brand discovery.",
  alternates: { canonical: "https://www.victoryvelocity.ca/blog" },
};

export const dynamic = "force-dynamic";

interface BLGArticle {
  title: string;
  slug: string;
  metaDescription: string;
  content_html: string;
  createdAt: string;
}

async function getWebhookArticles(): Promise<BLGArticle[]> {
  try {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
    const slugs = await redis.lrange<string>("article-slugs", 0, -1);
    if (!slugs || slugs.length === 0) return [];
    const raws = await redis.mget<string[]>(
      ...slugs.map((s) => `article:${s}`)
    );
    return raws
      .filter(Boolean)
      .map((r) =>
        (typeof r === "string" ? JSON.parse(r) : r) as BLGArticle
      );
  } catch {
    return [];
  }
}

export default async function BlogIndex() {
  const webhookArticles = await getWebhookArticles();

  return (
    <>
      <nav className="blog-nav">
        <Link href="/" className="mark">Victory&nbsp;Velocity</Link>
        <div className="blog-nav-links">
          <Link href="/#services">Services</Link>
          <Link href="/#process">Approach</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
        </div>
        <Link href="/#contact" className="cta">Work With Us</Link>
      </nav>

      <main>
        <div className="blog-wrap-wide">
          <div className="blog-index">
            <h1 className="blog-index-heading">
              From the <em>field</em>.
            </h1>

            <div className="post-list">
              {webhookArticles.map((article) => {
                const publishDate = new Date(article.createdAt).toLocaleDateString(
                  "en-US",
                  { month: "long", year: "numeric" }
                );
                const wordCount = article.content_html
                  .replace(/<[^>]+>/g, " ")
                  .trim()
                  .split(/\s+/).length;
                const readTime = Math.max(1, Math.round(wordCount / 200));
                return (
                  <Link
                    key={article.slug}
                    href={`/blog/${article.slug}`}
                    className="post-card"
                  >
                    <div className="post-card-meta">
                      {publishDate}&nbsp;&nbsp;·&nbsp;&nbsp;{readTime} min read
                    </div>
                    <h2 className="post-card-title">{article.title}</h2>
                    <p className="post-card-excerpt">{article.metaDescription}</p>
                    <span className="post-card-read">Read article →</span>
                  </Link>
                );
              })}

              <Link
                href="/blog/the-biggest-shift-in-marketing-since-google-ads"
                className="post-card"
              >
                <div className="post-card-meta">
                  Kaden Yeung&nbsp;&nbsp;·&nbsp;&nbsp;June 2026&nbsp;&nbsp;·&nbsp;&nbsp;14 min read
                </div>
                <h2 className="post-card-title">
                  The Biggest Shift in Marketing Since Google Ads
                </h2>
                <p className="post-card-excerpt">
                  AI is rewriting how customers discover brands. A practical breakdown of generative
                  engine optimization and ChatGPT ads.
                </p>
                <span className="post-card-read">Read article →</span>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot-row">
            <div className="mark">Victory&nbsp;Velocity</div>
            <div style={{ textAlign: "right" }}>
              <p style={{ color: "var(--faint)", fontStyle: "italic", margin: "0 0 8px", lineHeight: 1.5, fontFamily: "var(--serif)", fontSize: "15px" }}>
                AI visibility &amp; advertising for brands that intend to be cited.
              </p>
              <span style={{ fontFamily: "var(--sans)", fontSize: "12px", letterSpacing: "0.04em", color: "var(--faint)" }}>© 2026 Victory Velocity</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
