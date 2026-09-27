import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AppHeader, CategoryBadge, NewsImage, PersonalImpactCard, ScoreTriplet, SectionHeader, SourceLink } from "@/components/ui";
import { DetailActions } from "@/components/detail-actions";
import { getNewsEvent } from "@/lib/news-service";
export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const event = await getNewsEvent((await params).id);
  return { title: event?.title ?? "ニュース詳細" };
}
export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const event = await getNewsEvent((await params).id);
  if (!event) notFound();
  const date = new Intl.DateTimeFormat("ja-JP", { timeZone: "Asia/Tokyo", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(event.publishedAt));
  return <main className="page detail-page"><AppHeader title="ニュース詳細" back actions={false} /><div className="detail-actions"><DetailActions title={event.title} /></div>
    <div className="detail-image"><NewsImage event={event} priority /></div>
    <div className="detail-meta"><CategoryBadge category={event.category} />{event.secondaryCategories.map((category) => <CategoryBadge category={category} key={category} />)}</div>
    <h1>{event.title}</h1><div className="detail-byline"><span>{event.sources.slice(0, 4).map((source) => source.sourceName).join(" · ")}</span><span>{date}</span></div>
    <section className="detail-section summary-panel"><SectionHeader title="AI要約" icon={<span className="summary-icon">✦</span>} /><p>{event.summary}</p><span className="summary-note">複数ソースをもとにしたFavoriteNewsの要約</span></section>
    <section className="detail-section"><SectionHeader title="3つのスコア" /><ScoreTriplet event={event} /><p className="footnote">0〜10点。取得できた情報に基づく参考スコアです。</p></section>
    <section className="detail-section"><SectionHeader title="あなたへの影響" icon={<span className="impact-section-icon">✧</span>} /><div className="impact-list">{event.impacts.map((impact) => <PersonalImpactCard impact={impact} key={impact.label} />)}</div></section>
    <section className="detail-section"><SectionHeader title="関連リンク" /><p className="related-intro">関連トピックス {event.sources.length}件 · タップすると元記事が開きます</p><div className="source-list">{event.sources.map((source) => <SourceLink source={source} key={source.id} />)}</div><p className="footnote">リンク先は各提供元のサイトです。記事本文はFavoriteNews内に保存しません。</p></section>
  </main>;
}
