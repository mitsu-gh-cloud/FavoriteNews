import type { MetadataRoute } from "next";
export default function manifest(): MetadataRoute.Manifest {
  return { name: "FavoriteNews", short_name: "FavoriteNews", description: "あなたのためのニュースインテリジェンス", start_url: "/", display: "standalone", background_color: "#F6F9FD", theme_color: "#F6F9FD", lang: "ja", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }, { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }] };
}
