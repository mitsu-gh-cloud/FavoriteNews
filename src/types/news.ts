export type Category = "security" | "ntt" | "stocks" | "ai";
export type SourceType = "official" | "nikkei" | "reuters" | "media" | "x" | "other";

export interface NewsSource {
  id: string;
  eventId: string;
  sourceName: string;
  sourceType: SourceType;
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
}

export interface PersonalImpact {
  label: string;
  description: string;
  kind: "work" | "investment" | "learning" | "interest";
}

export interface NewsEvent {
  id: string;
  title: string;
  summary: string;
  category: Category;
  secondaryCategories: Category[];
  publishedAt: string;
  importanceScore: number;
  relevanceScore: number;
  buzzScore: number;
  personalRelevanceReason: string;
  imageUrl: string;
  tags: string[];
  company: string;
  impacts: PersonalImpact[];
  sources: NewsSource[];
}

export interface MarketSnapshot {
  symbol: string;
  name: string;
  changePercent: number;
  points: number[];
}

export interface XTrend {
  id: string;
  keyword: string;
  changePercent: number;
  points: number[];
}

export interface ChangeItem {
  id: string;
  time: string;
  title: string;
  level: "重要" | "注目";
  eventId: string;
}

export interface UpdateWindow {
  label: string;
  currentSlot: string;
  previousSlot: string;
  nextSlot: string;
  snapshotAt: string;
}

export interface NewsData {
  events: NewsEvent[];
  markets: MarketSnapshot[];
  trends: XTrend[];
  changes: ChangeItem[];
  update: UpdateWindow;
  warning?: string;
  isDemo: boolean;
}
