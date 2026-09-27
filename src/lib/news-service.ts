import "server-only";
import { createClient } from "@supabase/supabase-js";
import { getMockChanges, getMockEvents, mockMarkets, mockTrends } from "@/data/mock";
import { getUpdateWindow } from "@/lib/update-window";
import type { ChangeItem, MarketSnapshot, NewsData, NewsEvent, NewsSource, XTrend } from "@/types/news";

function supabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
  return url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
}

function mapEvent(row: Record<string, unknown>, sources: NewsSource[]): NewsEvent {
  return {
    id: String(row.id), title: String(row.title), summary: String(row.summary ?? ""),
    category: row.category as NewsEvent["category"],
    secondaryCategories: (row.secondary_categories as NewsEvent["secondaryCategories"]) ?? [],
    publishedAt: String(row.published_at), importanceScore: Number(row.importance_score),
    relevanceScore: Number(row.relevance_score), buzzScore: Number(row.buzz_score),
    personalRelevanceReason: String(row.personal_relevance_reason ?? ""),
    imageUrl: String(row.image_url ?? "/images/ai.svg"),
    tags: (row.tags as string[]) ?? [], company: String(row.company ?? ""),
    impacts: (row.impacts as NewsEvent["impacts"]) ?? [], sources,
  };
}

async function loadEvents(client: NonNullable<ReturnType<typeof supabaseClient>>): Promise<NewsEvent[]> {
  const [eventsResult, sourcesResult] = await Promise.all([
    client.from("news_events").select("*").order("importance_score", { ascending: false }).limit(60),
    client.from("news_sources").select("*").limit(250),
  ]);
  if (eventsResult.error) throw eventsResult.error;
  if (sourcesResult.error) throw sourcesResult.error;
  const sources: NewsSource[] = (sourcesResult.data ?? []).map((row) => ({
    id: String(row.id), eventId: String(row.event_id), sourceName: String(row.source_name),
    sourceType: row.source_type as NewsSource["sourceType"], title: String(row.title), summary: String(row.summary ?? ""),
    url: String(row.url), publishedAt: String(row.published_at),
  }));
  return (eventsResult.data ?? []).map((row) => mapEvent(row, sources.filter((source) => source.eventId === String(row.id))));
}

async function loadMarkets(client: NonNullable<ReturnType<typeof supabaseClient>>): Promise<MarketSnapshot[]> {
  const { data, error } = await client.from("market_snapshots").select("symbol,name,change_percent,points,captured_at")
    .order("captured_at", { ascending: false }).limit(100);
  if (error) throw error;
  const seen = new Set<string>();
  return (data ?? []).filter((row) => {
    if (seen.has(row.symbol)) return false;
    seen.add(row.symbol); return true;
  }).map((row) => ({ symbol: row.symbol, name: row.name, changePercent: Number(row.change_percent), points: row.points ?? [] }));
}

async function loadTrends(client: NonNullable<ReturnType<typeof supabaseClient>>): Promise<XTrend[]> {
  const { data, error } = await client.from("x_trends").select("id,keyword,change_percent,points,captured_at")
    .order("captured_at", { ascending: false }).limit(50);
  if (error) throw error;
  const seen = new Set<string>();
  return (data ?? []).filter((row) => {
    if (seen.has(row.keyword)) return false;
    seen.add(row.keyword); return true;
  }).slice(0, 5).map((row) => ({ id: row.id, keyword: row.keyword, changePercent: Number(row.change_percent), points: row.points ?? [] }));
}

async function loadChanges(client: NonNullable<ReturnType<typeof supabaseClient>>, events: NewsEvent[]): Promise<ChangeItem[]> {
  const { data, error } = await client.from("news_snapshots")
    .select("event_id,snapshot_at,importance_score,buzz_score,rank")
    .order("snapshot_at", { ascending: false }).limit(300);
  if (error) throw error;
  const timestamps = [...new Set((data ?? []).map((row) => row.snapshot_at))].slice(0, 2);
  if (timestamps.length < 2) return [];
  const previous = new Map((data ?? []).filter((row) => row.snapshot_at === timestamps[1]).map((row) => [row.event_id, row]));
  return (data ?? []).filter((row) => row.snapshot_at === timestamps[0]).flatMap((row) => {
    const event = events.find((item) => item.id === row.event_id);
    if (!event) return [];
    const before = previous.get(row.event_id);
    const changed = !before || Number(row.importance_score) - Number(before.importance_score) >= 0.5 || Number(row.rank) < Number(before.rank);
    if (!changed) return [];
    return [{ id: `${row.event_id}-${row.snapshot_at}`, eventId: row.event_id,
      time: new Intl.DateTimeFormat("ja-JP", { timeZone: "Asia/Tokyo", hour: "2-digit", minute: "2-digit" }).format(new Date(event.publishedAt)),
      title: `${event.title}${before ? "の重要度が上昇" : "を新たに追加"}`,
      level: Number(row.importance_score) >= 8.5 ? "重要" as const : "注目" as const }];
  }).slice(0, 5);
}

export async function getNewsData(): Promise<NewsData> {
  const update = getUpdateWindow();
  const demo = { events: getMockEvents(update), markets: mockMarkets, trends: mockTrends, changes: getMockChanges(update), update, isDemo: true };
  if (process.env.NEWS_DATA_SOURCE !== "supabase") return demo;
  const client = supabaseClient();
  if (!client) return { ...demo, warning: "Supabaseの接続設定がないため、デモデータを表示しています。" };

  const [eventResult, marketResult, trendResult] = await Promise.allSettled([
    loadEvents(client), loadMarkets(client), loadTrends(client),
  ]);
  const events = eventResult.status === "fulfilled" ? eventResult.value : demo.events;
  const changesResult = eventResult.status === "fulfilled" ? await Promise.allSettled([loadChanges(client, events)]) : [];
  const changes = changesResult.length && changesResult[0].status === "fulfilled" ? changesResult[0].value : demo.changes;
  const failed = [eventResult, marketResult, trendResult].filter((result) => result.status === "rejected").length;
  return {
    events,
    markets: marketResult.status === "fulfilled" ? marketResult.value : demo.markets,
    trends: trendResult.status === "fulfilled" ? trendResult.value : demo.trends,
    changes, update, isDemo: failed > 0,
    warning: failed ? `${failed}件の情報源を取得できませんでした。取得できた情報は表示しています。` : undefined,
  };
}

export async function getNewsEvent(id: string): Promise<NewsEvent | undefined> {
  const data = await getNewsData();
  return data.events.find((event) => event.id === id);
}
