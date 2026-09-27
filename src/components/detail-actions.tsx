"use client";
import { MoreHorizontal, Share2 } from "lucide-react";
import { useState } from "react";
export function DetailActions({ title }: { title: string }) {
  const [message, setMessage] = useState("");
  async function share() {
    try {
      if (navigator.share) await navigator.share({ title, url: location.href });
      else { await navigator.clipboard.writeText(location.href); setMessage("リンクをコピーしました"); }
    } catch { /* share sheet cancelled */ }
  }
  return <><button className="icon-button" onClick={share} aria-label="ニュースを共有"><Share2 size={20} /></button><button className="icon-button" onClick={() => setMessage("情報ソースはページ下部にあります")} aria-label="その他の情報"><MoreHorizontal size={21} /></button>{message ? <span className="action-toast" role="status">{message}</span> : null}</>;
}
