import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { revalidatePath } from "next/cache";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  const expected = `Bearer ${process.env.BLOG_WEBHOOK_SECRET}`;

  if (!authHeader || authHeader !== expected) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let article: Record<string, unknown>;
  try {
    article = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { slug, title } = article as { slug?: string; title?: string };
  if (!slug || !title) {
    return NextResponse.json({ error: "Missing slug or title" }, { status: 400 });
  }

  await redis.set(`article:${slug}`, JSON.stringify(article));

  // Keep a list of slugs (newest first); skip if already present
  const existing = await redis.lrange<string>("article-slugs", 0, -1);
  if (!existing.includes(slug as string)) {
    await redis.lpush("article-slugs", slug);
  }

  // Trigger ISR revalidation so the blog index and new post go live immediately
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);

  return NextResponse.json({ success: true, slug });
}
