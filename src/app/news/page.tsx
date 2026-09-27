import type { Metadata } from "next";
import { getNewsData } from "@/lib/news-service";
import { NewsList } from "@/components/news-list";
import type { Category } from "@/types/news";
export const metadata: Metadata = { title: "ニュース" };
export const dynamic = "force-dynamic";
export default async function NewsPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const category = (await searchParams).category;
  const initialCategory: Category | "all" = category === "security" || category === "ntt" || category === "stocks" || category === "ai" ? category : "all";
  return <NewsList key={initialCategory} data={await getNewsData()} initialCategory={initialCategory} />;
}
