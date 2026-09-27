import type { Metadata } from "next";
import { ThemesContent } from "@/components/themes-content";
export const metadata: Metadata = { title: "マイテーマ" };
export default function ThemesPage() { return <ThemesContent />; }
