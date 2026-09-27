import type { Metadata, Viewport } from "next";
import { BottomNavigation } from "@/components/bottom-navigation";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "FavoriteNews", template: "%s | FavoriteNews" },
  description: "あなたに重要なニュースと、前回更新からの変化をすばやく把握。",
  applicationName: "FavoriteNews",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "FavoriteNews" },
  manifest: "/manifest.webmanifest",
  icons: { icon: "/icon.svg", apple: "/apple-touch-icon.png" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#F6F9FD" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body><div className="app-shell">{children}</div><BottomNavigation /></body></html>;
}
