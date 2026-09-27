import type { Metadata } from "next";
import { SettingsContent } from "@/components/settings-content";
import { getNewsData } from "@/lib/news-service";
export const metadata: Metadata = { title: "設定" };
export const dynamic = "force-dynamic";
export default async function SettingsPage() { return <SettingsContent data={await getNewsData()} />; }
