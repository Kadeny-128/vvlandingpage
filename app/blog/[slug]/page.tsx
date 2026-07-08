import { Redis } from "@upstash/redis";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

interface BLGArticle {
  title: string;
  slug: string;
  metaDescription: string;
  content_html: string;
  content_markdown?: string;
  heroImageUrl?: string;
  createdAt: string;
  jsonLd?: object;
  faqJsonLd?: object;
}

function estimateReadTime(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const raw = await redis.get<string>(`article:${params.slug}`);
  if (!raw) return {};
  const article: BLGArticle = typeof raw === "string" ? JSON.parse(raw) : raw;
  return {
    title: `${article.title} — Victory Velocity`,
    description: article.metaDescription,
    alternates: {
      canonical: `https://www.victoryvelocity.ca/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: "article",
      publishedTime: article.createdAt,
    },
  };
}

export const dynamic = "force-dynamic";

export default async function DynamicBlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const raw = await redis.get<string>(`article:${params.slug}`);
  if (!raw) notFound();

  const article: BLGArticle =
    typeof raw === "string" ? JSON.parse(raw) : raw;
  const readTime = estimateReadTime(article.content_html);
  const publishDate = new Date(article.createdAt).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <>
      {article.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(article.jsonLd) }}
        />
      )}
      {article.faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(article.faqJsonLd) }}
        />
      )}

      <nav className="blog-nav">
        <Link href="/" className="mark">
          Victory&nbsp;Velocity
        </Link>
        <div className="blog-nav-links">
          <Link href="/#services">Services</Link>
          <Link href="/#process">Approach</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
        </div>
        <Link href="/#contact" className="cta">
          Work With Us
        </Link>
      </nav>

      <main>
        <header className="blog-header">
          <div className="blog-wrap">
            <Link href="/blog" className="blog-breadcrumb">
              ← Blog
            </Link>
            <h1 className="blog-post-title">{article.title}</h1>
            <p className="blog-post-subtitle">{article.metaDescription}</p>
            <div className="blog-post-meta">
              <span>{publishDate}</span>
              <span className="blog-meta-dot">·</span>
              <span>{readTime} min read</span>
            </div>
          </div>
        </header>

        <article>
          <div className="blog-wrap">
            {article.heroImageUrl && (
              <div className="blog-cover">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={article.heroImageUrl}
                  alt={article.title}
                  style={{ width: "100%", height: "auto" }}
                />
              </div>
            )}
            <div
              className="blog-body"
              dangerouslySetInnerHTML={{ __html: article.content_html }}
            />
          </div>
        </article>
      </main>

      <footer>
        <div className="wrap">
          <div className="foot-row">
            <div className="mark">Victory&nbsp;Velocity</div>
            <div style={{ textAlign: "right" }}>
              <p
                style={{
                  color: "var(--faint)",
                  fontStyle: "italic",
                  margin: "0 0 8px",
                  lineHeight: 1.5,
                  fontFamily: "var(--serif)",
                  fontSize: "15px",
                }}
              >
                AI visibility &amp; advertising for brands that intend to be
                cited.
              </p>
              <span
                style={{
                  fontFamily: "var(--sans)",
                  fontSize: "12px",
                  letterSpacing: "0.04em",
                  color: "var(--faint)",
                }}
              >
                © 2026 Victory Velocity
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
