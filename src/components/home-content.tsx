"use client";
import { useState } from "react";
import { ArrowRight, Flame } from "lucide-react";
import Link from "next/link";
import { AppHeader, CategoryTabs, CompactNewsCard, HeroNewsCard, MarketMiniCard, SectionHeader, Timeline, UpdateStatus } from "./ui";
import type { Category, NewsData } from "@/types/news";

export function HomeContent({ data }: { data: NewsData }) {
  const [active, setActive] = useState<Category | "all">("all");
  const events = active === "all" ? data.events : data.events.filter((event) => event.category === active || event.secondaryCategories.includes(active));
  const hero = events[0];
  return <main className="page home-page">
    <AppHeader />
    <UpdateStatus update={data.update} isDemo={data.isDemo} />
    {data.warning ? <div className="warning-banner" role="status">{data.warning}</div> : null}
    <CategoryTabs active={active} onChange={setActive} />
    <section className="home-hero-section"><SectionHeader title="今日の重要ニュース" icon={<Flame size={20} fill="#ff7b54" color="#ff7b54" />} href="/news" />
      {hero ? <HeroNewsCard event={hero} /> : <div className="empty-card">このカテゴリには新しいニュースはありません。<span>次回更新：{data.update.nextSlot}</span></div>}
    </section>
    <section className="home-change-section"><SectionHeader title="前回更新からの変化" icon={<span className="change-icon">↗</span>} href="/analysis#changes" linkLabel="詳しく" />
      <div className="change-card"><div className="change-card-top"><span className="change-label">{data.update.previousSlot} → {data.update.currentSlot}</span><strong>{data.changes.length}件の重要な変化</strong></div><Timeline items={data.changes.slice(0, 2)} /></div>
    </section>
    <section><SectionHeader title="今日の動き" /><div className="stats-grid"><Link href="/news" className="stat-card"><span>新着ニュース</span><strong>{data.events.length}<small>件</small></strong><ArrowRight size={17} /></Link><Link href="/analysis#changes" className="stat-card orange"><span>重要な変化</span><strong>{data.changes.length}<small>件</small></strong><ArrowRight size={17} /></Link></div></section>
    <section><SectionHeader title="市場の動き" icon={<span className="market-section-icon">⌁</span>} href="/analysis" /><div className="market-grid">{data.markets.map((market) => <MarketMiniCard market={market} key={market.symbol} />)}</div><p className="footnote">値動きはニュースとの関連を見るための参考情報です。</p></section>
    <section><SectionHeader title="その他のニュース" href="/news" /><div className="compact-list">{events.slice(1, 4).map((event) => <CompactNewsCard event={event} key={event.id} />)}</div></section>
  </main>;
}
