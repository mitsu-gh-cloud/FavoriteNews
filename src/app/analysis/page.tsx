import type { Metadata } from "next";
import Link from "next/link";
import { AppHeader, SectionHeader, Sparkline, Timeline, TrendRanking, UpdateStatus, categories } from "@/components/ui";
import { getNewsData } from "@/lib/news-service";
export const metadata: Metadata = { title: "分析" };
export const dynamic = "force-dynamic";
const categoryPoints = [[2, 3, 2, 5, 6, 5, 7], [2, 2, 3, 3, 4, 5, 5], [2, 3, 3, 5, 4, 6, 7], [2, 3, 4, 5, 5, 7, 8]];
export default async function AnalysisPage() {
  const data = await getNewsData();
  const categoryStats = categories.map((category, index) => ({ ...category, count: data.events.filter((event) => event.category === category.id || event.secondaryCategories.includes(category.id)).length, change: [9, 2, 7, 9][index], points: categoryPoints[index] }));
  return <main className="page analysis-page"><AppHeader title="分析" /><UpdateStatus update={data.update} isDemo={data.isDemo} />
    <div className="page-intro"><span className="eyebrow">INSIGHTS</span><h1>ニュースの流れを見る</h1><p>話題量と更新間の変化をひと目で。</p></div>
    <section className="analysis-section"><SectionHeader title="X トレンド" /><div className="panel trend-panel"><div className="panel-heading"><span>取得できた投稿群・過去6時間</span><span className="panel-badge">話題量</span></div>{data.trends.length ? <TrendRanking trends={data.trends} /> : <div className="empty-inline">Xデータを取得できませんでした。その他のニュースは表示しています。</div>}</div><p className="footnote">X全体の世論ではなく、取得できた投稿群の話題量です。</p></section>
    <section className="analysis-section"><SectionHeader title="カテゴリ別サマリー" /><div className="category-summary-grid">{categoryStats.map((category) => <Link href={`/news?category=${category.id}`} className={`category-summary ${category.id}`} key={category.id}><div className="category-summary-top"><span className="category-summary-icon">{category.icon}</span><span className="category-summary-name">{category.short}</span></div><div className="category-summary-bottom"><strong>{category.count}<small>件</small></strong><span>+{category.change}%</span></div><Sparkline points={category.points} /></Link>)}</div></section>
    <section className="analysis-section" id="changes"><SectionHeader title="更新間の変化" /><div className="panel timeline-panel"><div className="timeline-panel-heading"><span className="change-window">{data.update.previousSlot} → {data.update.currentSlot}</span><strong>{data.changes.length}件の変化</strong></div><Timeline items={data.changes} /></div></section>
    <section className="analysis-section"><SectionHeader title="市場との関連" /><div className="panel market-analysis-list">{data.markets.map((market) => <div className="market-analysis-row" key={market.symbol}><span>{market.name}</span><Sparkline points={market.points} negative={market.changePercent < 0} /><strong className={market.changePercent < 0 ? "negative" : ""}>{market.changePercent >= 0 ? "+" : ""}{market.changePercent.toFixed(1)}%</strong></div>)}</div></section>
  </main>;
}
