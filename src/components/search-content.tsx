"use client";
import { useState } from "react";
import { Search, X } from "lucide-react";
import { AppHeader, CompactNewsCard, categories } from "./ui";
import type { NewsEvent } from "@/types/news";
export function SearchContent({ events }: { events: NewsEvent[] }) {
  const [query, setQuery] = useState("");
  const term = query.trim().toLocaleLowerCase();
  const results = term ? events.filter((event) => [event.title, event.company, event.summary, ...event.tags, ...[event.category, ...event.secondaryCategories].map((id) => categories.find((item) => item.id === id)?.full ?? id)].some((value) => value.toLocaleLowerCase().includes(term))) : [];
  return <main className="page search-page"><AppHeader title="検索" back backHref="/" actions={false} /><div className="search-field"><Search size={20} /><input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ニュース、企業、テーマを検索" aria-label="検索キーワード" />{query ? <button onClick={() => setQuery("")} aria-label="検索をクリア"><X size={18} /></button> : null}</div>
    {term ? <><div className="search-result-count">検索結果 {results.length}件</div>{results.length ? <div className="compact-list">{results.map((event) => <CompactNewsCard event={event} key={event.id} />)}</div> : <div className="empty-card">一致するニュースはありません。<span>別のキーワードをお試しください。</span></div>}</> : <div className="search-suggestions"><span>おすすめのキーワード</span><div>{["Microsoft", "AI", "NTT", "Security"].map((item) => <button onClick={() => setQuery(item)} key={item}>{item}</button>)}</div></div>}
  </main>;
}
