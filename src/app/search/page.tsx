import type { Metadata } from "next";
import { getNewsData } from "@/lib/news-service";
import { SearchContent } from "@/components/search-content";
export const metadata: Metadata = { title: "検索" };
export const dynamic = "force-dynamic";
export default async function SearchPage() { return <SearchContent events={(await getNewsData()).events} />; }
