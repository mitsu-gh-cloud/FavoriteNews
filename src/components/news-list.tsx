"use client";
import { useState } from "react";
import { AppHeader, CategoryTabs, CompactNewsCard, UpdateStatus } from "./ui";
import type { Category, NewsData } from "@/types/news";

export function NewsList({ data, initialCategory = "all" }: { data: NewsData; initialCategory?: Category | "all" }) {
  const [active, setActive] = useState<Category | "all">(initialCategory);
  const [limit, setLimit] = useState(5);
  const events = active === "all" ? data.events : data.events.filter((event) => event.category === active || event.secondaryCategories.includes(active));
  return <main className="page list-page"><AppHeader title="ニュース" /><UpdateStatus update={data.update} isDemo={data.isDemo} /><CategoryTabs active={active} onChange={(category) => { setActive(category); setLimit(5); }} />
    <div className="page-intro"><div><span className="eyebrow">EVENT FEED</span><h1>ニュースを読む</h1><p>同じ話題をまとめて、重要な順に表示します。</p></div><span className="count-pill">{events.length} イベント</span></div>
    {events.length ? <div className="compact-list">{events.slice(0, limit).map((event) => <CompactNewsCard event={event} key={event.id} />)}</div> : <div className="empty-card">このカテゴリには新しいニュースはありません。<span>次回更新：{data.update.nextSlot}</span></div>}
    {events.length > limit ? <button className="more-button" onClick={() => setLimit((current) => current + 5)}>もっと見る</button> : null}
  </main>;
}
