import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Bell, Bookmark, ChartNoAxesCombined, ChevronRight, Clock3, ExternalLink, Flame, Home, Lightbulb, Newspaper, Search, Settings2, Share2, ShieldCheck, Sparkles, Star, TrendingUp } from "lucide-react";
import type { Category, ChangeItem, MarketSnapshot, NewsEvent, NewsSource, PersonalImpact, UpdateWindow, XTrend } from "@/types/news";

export const categories: { id: Category; short: string; full: string; icon: string }[] = [
  { id: "security", short: "Security", full: "サイバーセキュリティ", icon: "✦" },
  { id: "ntt", short: "NTT", full: "NTTグループ", icon: "◎" },
  { id: "stocks", short: "株式", full: "株式・市場", icon: "↗" },
  { id: "ai", short: "AI", full: "AI", icon: "◉" },
];

export function AppHeader({ title = "FavoriteNews", back = false, backHref = "/news", actions = true }: { title?: string; back?: boolean; backHref?: string; actions?: boolean }) {
  return <header className="app-header">
    <div className="header-left">
      {back ? <Link className="icon-button back-button" href={backHref} aria-label="前の画面へ戻る"><ArrowLeft size={21} /></Link> : <span className="brand-mark"><Sparkles size={19} strokeWidth={2.5} /></span>}
      <div><div className="header-title">{title}</div>{!back && title === "FavoriteNews" ? <div className="header-subtitle">あなたのためのニュースインテリジェンス</div> : null}</div>
    </div>
    {actions ? <div className="header-actions">
      <Link className="icon-button" href="/analysis#changes" aria-label="更新の通知を見る"><Bell size={20} /><span className="notification-dot" /></Link>
      <Link className="icon-button" href="/search" aria-label="ニュースを検索"><Search size={20} /></Link>
    </div> : null}
  </header>;
}

export function UpdateStatus({ update, isDemo }: { update: UpdateWindow; isDemo?: boolean }) {
  return <div className="update-status"><div className="update-main"><span className="live-dot" />{update.label}{isDemo ? <span className="demo-label">デモ</span> : null}</div><span className="update-next">次回更新 {update.nextSlot}</span></div>;
}

export function CategoryTabs({ active, onChange }: { active: Category | "all"; onChange: (category: Category | "all") => void }) {
  return <div className="category-scroll" role="tablist" aria-label="カテゴリ">
    <button role="tab" aria-selected={active === "all"} className={`category-chip ${active === "all" ? "active" : ""}`} onClick={() => onChange("all")}>すべて</button>
    {categories.map((category) => <button key={category.id} role="tab" aria-selected={active === category.id} className={`category-chip ${active === category.id ? "active" : ""}`} onClick={() => onChange(category.id)}><span className={`category-glyph ${category.id}`}>{category.icon}</span>{category.short}</button>)}
  </div>;
}

export function SectionHeader({ title, icon, href, linkLabel = "すべて見る" }: { title: string; icon?: React.ReactNode; href?: string; linkLabel?: string }) {
  return <div className="section-heading"><h2>{icon ? <span className="section-icon">{icon}</span> : null}{title}</h2>{href ? <Link href={href} className="section-link">{linkLabel}<ChevronRight size={16} /></Link> : null}</div>;
}

export function NewsImage({ event, compact = false, priority = false }: { event: NewsEvent; compact?: boolean; priority?: boolean }) {
  return <div className={`news-image ${compact ? "compact" : ""}`}><Image src={event.imageUrl} alt="" fill sizes={compact ? "84px" : "(max-width: 600px) 100vw, 620px"} priority={priority} unoptimized={event.imageUrl.startsWith("https://")} /></div>;
}

function scoreClass(label: string) { return label === "重要度" ? "importance" : label === "関連度" ? "relevance" : "buzz"; }
export function ScoreCard({ label, value }: { label: "重要度" | "関連度" | "Buzz"; value: number }) {
  return <div className={`score-card ${scoreClass(label)}`}><span className="score-label">{label}</span><strong>{value.toFixed(1)}</strong></div>;
}
export function ScoreTriplet({ event, compact = false }: { event: NewsEvent; compact?: boolean }) {
  return <div className={`score-triplet ${compact ? "compact" : ""}`} aria-label={`重要度 ${event.importanceScore}、関連度 ${event.relevanceScore}、Buzz ${event.buzzScore}`}>
    <ScoreCard label="重要度" value={event.importanceScore} /><ScoreCard label="関連度" value={event.relevanceScore} /><ScoreCard label="Buzz" value={event.buzzScore} />
  </div>;
}

export function CategoryBadge({ category }: { category: Category }) {
  const meta = categories.find((item) => item.id === category)!;
  return <span className={`category-badge ${category}`}>{meta.icon} {meta.short}</span>;
}

export function RelativeTime({ date }: { date: string }) {
  const hours = Math.max(1, Math.round((Date.now() - Date.parse(date)) / 3600000));
  return <span className="relative-time"><Clock3 size={13} />{hours < 24 ? `${hours}時間前` : `${Math.floor(hours / 24)}日前`}</span>;
}

export function HeroNewsCard({ event }: { event: NewsEvent }) {
  return <article className="hero-card">
    <Link href={`/news/${event.id}`} className="hero-link" aria-label={`${event.title}の詳細を読む`}>
      <NewsImage event={event} priority />
      <div className="hero-body">
        <div className="meta-row"><CategoryBadge category={event.category} /><RelativeTime date={event.publishedAt} /></div>
        <h3>{event.title}</h3>
        <p className="source-line">{event.sources.slice(0, 4).map((item) => item.sourceName).join("・")}</p>
        <p className="hero-summary">{event.summary}</p>
        <ScoreTriplet event={event} />
      </div>
    </Link>
    <div className="relevance-strip"><Lightbulb size={17} /><span><strong>あなたとの関連</strong>{event.personalRelevanceReason}</span></div>
  </article>;
}

export function CompactNewsCard({ event }: { event: NewsEvent }) {
  return <Link href={`/news/${event.id}`} className="compact-news-card">
    <NewsImage event={event} compact />
    <div className="compact-news-content"><div className="compact-news-top"><CategoryBadge category={event.category} /><RelativeTime date={event.publishedAt} /></div><h3>{event.title}</h3><div className="compact-scores"><span>重要度 <b className="red">{event.importanceScore.toFixed(1)}</b></span><span>関連度 <b className="green">{event.relevanceScore.toFixed(1)}</b></span><span>Buzz <b className="blue">{event.buzzScore.toFixed(1)}</b></span></div></div>
  </Link>;
}

export function Sparkline({ points, negative = false }: { points: number[]; negative?: boolean }) {
  if (points.length < 2) return <span className="sparkline-empty" />;
  const min = Math.min(...points); const max = Math.max(...points); const range = max - min || 1;
  const path = points.map((point, index) => `${index ? "L" : "M"}${(index / (points.length - 1)) * 72},${23 - ((point - min) / range) * 19}`).join(" ");
  return <svg className={`sparkline ${negative ? "negative" : ""}`} viewBox="0 0 72 28" aria-hidden="true"><path d={path} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export function MarketMiniCard({ market }: { market: MarketSnapshot }) {
  const negative = market.changePercent < 0;
  return <div className="market-mini"><div className="market-name">{market.name}</div><div className={`market-change ${negative ? "negative" : ""}`}>{negative ? "" : "+"}{market.changePercent.toFixed(1)}%</div><Sparkline points={market.points} negative={negative} /></div>;
}

export function Timeline({ items }: { items: ChangeItem[] }) {
  return <div className="timeline">{items.length ? items.map((item) => <Link href={`/news/${item.eventId}`} className="timeline-item" key={item.id}><span className="timeline-time">{item.time}</span><span className="timeline-track"><span /></span><span className="timeline-text">{item.title}<small className={item.level === "重要" ? "important" : ""}>{item.level}</small></span><ChevronRight size={16} className="timeline-chevron" /></Link>) : <div className="empty-inline">前回更新から重要な変化はありません。</div>}</div>;
}

export function TrendRanking({ trends }: { trends: XTrend[] }) {
  return <div className="trend-list">{trends.map((trend, index) => <div className="trend-item" key={trend.id}><span className={`trend-rank rank-${index + 1}`}>{index + 1}</span><span className="trend-keyword">{trend.keyword}</span><span className="trend-percent">+{Math.round(trend.changePercent)}%</span><Sparkline points={trend.points} /></div>)}</div>;
}

export function SourceLink({ source }: { source: NewsSource }) {
  return <a className="source-link" href={source.url} target="_blank" rel="noopener noreferrer">
    <span className="source-icon"><ExternalLink size={16} /></span>
    <span className="source-copy"><span className="source-name">{source.sourceName}</span><strong>{source.title}</strong><span className="source-summary">{source.summary || "概要はリンク先の記事で確認できます。"}</span></span>
    <ArrowUpRight size={18} className="source-arrow" />
  </a>;
}

export function PersonalImpactCard({ impact }: { impact: PersonalImpact }) {
  const icon = impact.kind === "investment" ? <TrendingUp size={18} /> : impact.kind === "learning" ? <Sparkles size={18} /> : <ShieldCheck size={18} />;
  return <div className="impact-card"><span className={`impact-icon ${impact.kind}`}>{icon}</span><div><strong>{impact.label}</strong><p>{impact.description}</p></div></div>;
}

export const navItems = [
  { href: "/", label: "ホーム", icon: Home }, { href: "/news", label: "ニュース", icon: Newspaper },
  { href: "/analysis", label: "分析", icon: ChartNoAxesCombined }, { href: "/themes", label: "マイテーマ", icon: Star },
  { href: "/settings", label: "設定", icon: Settings2 },
];

export { ArrowLeft, ArrowRight, Bookmark, Flame, Share2 };
