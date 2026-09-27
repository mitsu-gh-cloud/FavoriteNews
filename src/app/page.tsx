import { getNewsData } from "@/lib/news-service";
import { HomeContent } from "@/components/home-content";
export const dynamic = "force-dynamic";
export default async function HomePage() { return <HomeContent data={await getNewsData()} />; }
