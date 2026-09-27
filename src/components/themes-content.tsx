"use client";
import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { AppHeader } from "./ui";

const defaults = ["Cyber Security", "NTT Group", "AI", "Stocks", "Microsoft", "OpenAI", "Agent", "Copilot"];
const storageKey = "favorite-news-themes-v1";
export function ThemesContent() {
  const [themes, setThemes] = useState(defaults);
  const [input, setInput] = useState("");
  const [ready, setReady] = useState(false);
  useEffect(() => { try { const saved = localStorage.getItem(storageKey); if (saved) { const parsed = JSON.parse(saved); if (Array.isArray(parsed)) setThemes(parsed.filter((item): item is string => typeof item === "string")); } } catch {} setReady(true); }, []);
  function save(next: string[]) { setThemes(next); localStorage.setItem(storageKey, JSON.stringify(next)); }
  function add() { const value = input.trim(); if (!value || themes.some((theme) => theme.toLowerCase() === value.toLowerCase())) return; save([...themes, value]); setInput(""); }
  return <main className="page themes-page"><AppHeader title="マイテーマ" /><div className="page-intro"><span className="eyebrow">PERSONALIZE</span><h1>気になるテーマを管理</h1><p>追加したテーマは、将来の関連度分析に利用できます。</p></div>
    <div className="theme-feature"><span className="theme-feature-icon">✦</span><div><strong>あなたに関係するニュースを</strong><p>仕事、投資、学習、興味のある話題を登録して、情報を絞り込みましょう。</p></div></div>
    <section className="theme-section"><div className="section-heading"><h2>登録中のテーマ</h2><span className="theme-count">{themes.length}件</span></div><div className="theme-card">{ready && themes.length ? <div className="theme-list">{themes.map((theme) => <div className="theme-pill" key={theme}><span className="theme-pill-dot" />{theme}<button onClick={() => save(themes.filter((item) => item !== theme))} aria-label={`${theme}を削除`}><X size={16} /></button></div>)}</div> : <div className="empty-inline">テーマを追加するとここに表示されます。</div>}</div></section>
    <section className="theme-section"><div className="section-heading"><h2>テーマを追加</h2></div><form className="theme-add" onSubmit={(event) => { event.preventDefault(); add(); }}><label htmlFor="theme-name" className="sr-only">新しいテーマ</label><input id="theme-name" value={input} onChange={(event) => setInput(event.target.value)} maxLength={40} placeholder="例：クラウドセキュリティ" /><button type="submit" aria-label="テーマを追加"><Plus size={21} /></button></form><p className="footnote">この端末に保存されます。LifeOSとの同期は今後対応予定です。</p></section>
  </main>;
}
