const BASE = "https://api.babylovegrowth.ai/api/integrations";

function headers() {
  return {
    "X-API-Key": process.env.BABYLOVEGROWTH_API_KEY!,
    "Content-Type": "application/json",
  };
}

export interface ArticleSummary {
  id: string;
  title: string;
  slug: string;
  hero_image_url?: string;
  meta_description: string;
  excerpt: string;
  created_at: string;
}

export interface ArticleDetail extends ArticleSummary {
  content_html: string;
  content_markdown?: string;
  jsonLd?: object;
  faqJsonLd?: object;
}

export async function listArticles(): Promise<ArticleSummary[]> {
  try {
    const res = await fetch(`${BASE}/v1/articles?limit=50&offset=0`, {
      headers: headers(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : (data.articles ?? []);
  } catch {
    return [];
  }
}

export async function getArticle(id: string): Promise<ArticleDetail | null> {
  try {
    const res = await fetch(`${BASE}/v1/articles/${id}`, {
      headers: headers(),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
