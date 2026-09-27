import type { ChangeItem, MarketSnapshot, NewsEvent, NewsSource, UpdateWindow, XTrend } from "@/types/news";

const source = (eventId: string, id: string, sourceName: string, sourceType: NewsSource["sourceType"], url: string, publishedAt: string, title: string, summary: string): NewsSource => ({
  id, eventId, sourceName, sourceType, title, summary, url, publishedAt,
});

export function getMockEvents(update: UpdateWindow): NewsEvent[] {
  const base = Date.parse(update.snapshotAt);
  const at = (hours: number) => new Date(base - hours * 60 * 60 * 1000).toISOString();
  return [
    {
      id: "microsoft-ai-security", title: "Microsoft、AIセキュリティ機能を拡張", category: "security", secondaryCategories: ["ai"],
      summary: "Microsoftは企業向けAI利用時のセキュリティとガバナンスを強化する機能を紹介。エージェントの管理・監視、アクセス制御、脅威対応を横断して確認できる。",
      publishedAt: at(2), importanceScore: 9.1, relevanceScore: 9.4, buzzScore: 8.2,
      personalRelevanceReason: "Agent 365・Microsoft 365の運用管理に関連", imageUrl: "/images/security.svg",
      tags: ["Agent 365", "Copilot", "Microsoft 365", "ガバナンス", "AI Security"], company: "Microsoft",
      impacts: [
        { label: "Copilot", description: "業務利用時のガバナンス強化を確認", kind: "work" },
        { label: "Agent 365", description: "エージェントの運用・監視設計の参考", kind: "work" },
        { label: "社内セキュリティ", description: "AI活用時のアクセス制御とリスク対策", kind: "learning" },
      ],
      sources: [
        source("microsoft-ai-security", "ms-official", "Microsoft Security Blog", "official", "https://www.microsoft.com/en-us/security/blog/2026/03/09/secure-agentic-ai-for-your-frontier-transformation/", "2026-03-09T00:00:00Z", "Microsoft、Agent 365の管理・保護機能を説明", "AIエージェントの可視化、アクセス管理、セキュリティ対策を紹介。"),
        source("microsoft-ai-security", "ms-blog", "Microsoft公式", "official", "https://blogs.microsoft.com/blog/2026/03/09/introducing-the-first-frontier-suite-built-on-intelligence-trust/", "2026-03-09T00:00:00Z", "Microsoft 365 E7とAgent 365を発表", "CopilotとAgent 365を組み合わせた企業向けスイートの概要。"),
        source("microsoft-ai-security", "ms-security", "Microsoft Security Blog", "official", "https://www.microsoft.com/en-us/security/blog/2026/03/20/secure-agentic-ai-end-to-end/", "2026-03-20T00:00:00Z", "AIエージェントを端から端まで守る取り組み", "Defender、Entra、Purviewなどを使った保護の方向性を紹介。"),
        source("microsoft-ai-security", "ms-x", "X", "x", "https://x.com/search?q=Microsoft%20AI%20Security", at(1.2), "Microsoft AI Securityの関連投稿", "X上で、この話題に関する投稿を検索します。"),
      ],
    },
    {
      id: "ntt-iown", title: "NTT、IOWNの実用化に向けた取り組みを発表", category: "ntt", secondaryCategories: [],
      summary: "IOWNのネットワーク技術に関する新たな取り組み。企業向け通信基盤の進展と、関連事業への広がりを追う。",
      publishedAt: at(2.7), importanceScore: 8.4, relevanceScore: 9.0, buzzScore: 6.8,
      personalRelevanceReason: "NTTグループと通信インフラの関心テーマに関連", imageUrl: "/images/ntt.svg",
      tags: ["NTT", "IOWN", "通信", "インフラ"], company: "NTT",
      impacts: [
        { label: "NTTグループ", description: "事業戦略と実用化の進み具合を確認", kind: "investment" },
        { label: "通信技術", description: "次世代ネットワークの学習テーマに関連", kind: "learning" },
      ],
      sources: [
        source("ntt-iown", "ntt-official", "NTT公式", "official", "https://www.group.ntt/jp/newsrelease/2026/09/09/260909a.html", "2026-09-09T00:00:00Z", "IOWN AI Fund、光ネットワーク企業へ初号投資", "NVIDIAも参加する資金調達を通じ、AIインフラ向け光技術の商用化を支援。"),
        source("ntt-iown", "ntt-apn", "NTT公式", "official", "https://group.ntt/en/newsrelease/2025/04/25/250425a.html", "2025-04-25T00:00:00Z", "IOWN APNのオンデマンド接続技術を実証", "必要な場所から柔軟にAPNを利用するための基礎技術を発表。"),
      ],
    },
    {
      id: "openai-agent", title: "OpenAI、エージェント活用の新しい展開を公開", category: "ai", secondaryCategories: [],
      summary: "AIエージェントの開発と業務利用に関する最新の方向性。既存のワークフローとの連携と、安全な運用が焦点。",
      publishedAt: at(3.3), importanceScore: 8.8, relevanceScore: 8.9, buzzScore: 9.3,
      personalRelevanceReason: "AI・Agent・業務効率化のマイテーマに関連", imageUrl: "/images/ai.svg",
      tags: ["OpenAI", "Agent", "生成AI", "ワークフロー"], company: "OpenAI",
      impacts: [
        { label: "Agent", description: "自動化ユースケースの設計に関連", kind: "work" },
        { label: "AI学習", description: "エージェント運用の最新動向を把握", kind: "learning" },
      ],
      sources: [
        source("openai-agent", "oa-api", "OpenAI公式", "official", "https://openai.com/index/introducing-the-agents-api/", "2026-09-10T00:00:00Z", "OpenAI、Agents APIを公開", "長時間動くエージェントを構築・運用するためのAPIを紹介。"),
        source("openai-agent", "oa-tools", "OpenAI公式", "official", "https://openai.com/index/new-tools-for-building-agents/", "2025-03-11T00:00:00Z", "エージェント開発向けツールを発表", "Responses APIと組み込みツール、Agents SDKの構成を説明。"),
        source("openai-agent", "oa-x", "X", "x", "https://x.com/search?q=OpenAI%20Agent", at(3), "OpenAI Agentの関連投稿", "X上で、この話題に関する投稿を検索します。"),
      ],
    },
    {
      id: "nvidia-market", title: "半導体関連株、AI投資を巡る見方で値動き", category: "stocks", secondaryCategories: ["ai"],
      summary: "AIインフラ投資への期待と慎重な見方が交錯。半導体関連銘柄の動きを、ニュースとあわせて確認する。",
      publishedAt: at(4.2), importanceScore: 7.8, relevanceScore: 8.2, buzzScore: 7.6,
      personalRelevanceReason: "NVIDIA・米国株の投資テーマに関連", imageUrl: "/images/market.svg",
      tags: ["NVIDIA", "半導体", "NASDAQ", "AI投資"], company: "NVIDIA",
      impacts: [{ label: "投資", description: "AI関連株の値動きと材料を確認", kind: "investment" }],
      sources: [
        source("nvidia-market", "nv-results", "NVIDIA公式", "official", "https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-second-quarter-fiscal-2027", "2026-08-26T00:00:00Z", "NVIDIA、2027年度第2四半期決算を発表", "データセンター事業の成長と次四半期の見通しを公表。"),
        source("nvidia-market", "nv-nasdaq-ai", "Nasdaq", "media", "https://www.nasdaq.com/articles/global-indexes/powering-the-nasdaq-100-ai-thematic-engine", "2026-09-03T00:00:00Z", "Nasdaq 100のAI投資を巡る成長材料とリスク", "主要クラウド企業の設備投資と、AI関連株を見る際の論点を整理。"),
        source("nvidia-market", "nv-nasdaq-chip", "Nasdaq", "media", "https://www.nasdaq.com/articles/global-indexes/ai-tailwinds-and-memory-shortages-navigating-new-semiconductor-cycle", "2026-01-16T00:00:00Z", "AI需要とメモリ不足が半導体市場に与える影響", "需要拡大と供給制約から、半導体サイクルを分析。"),
        source("nvidia-market", "nv-rubin", "NVIDIA公式", "official", "https://nvidianews.nvidia.com/news/vera-rubin-full-production-agentic-ai-factory", "2026-05-31T00:00:00Z", "NVIDIA、Vera Rubinの量産を発表", "次世代AIインフラ向けプラットフォームの量産状況を紹介。"),
        source("nvidia-market", "nv-ntt", "NTT公式", "official", "https://www.group.ntt/jp/newsrelease/2026/09/09/260909a.html", "2026-09-09T00:00:00Z", "NTT、NVIDIA参加の光ネットワーク投資を発表", "AIデータセンター向け光技術への投資と商用化計画を説明。"),
      ],
    },
    {
      id: "jpcert-alert", title: "JPCERT/CC、脆弱性対応の注意点を公開", category: "security", secondaryCategories: [],
      summary: "国内組織が確認しておきたい脆弱性情報と初動対応のポイントを整理。影響範囲の確認が優先される。",
      publishedAt: at(5.1), importanceScore: 7.5, relevanceScore: 8.8, buzzScore: 5.2,
      personalRelevanceReason: "セキュリティ運用と情報収集に関連", imageUrl: "/images/security.svg",
      tags: ["JPCERT", "脆弱性", "運用"], company: "JPCERT/CC",
      impacts: [{ label: "セキュリティ運用", description: "影響範囲と優先対応の確認に役立つ", kind: "work" }],
      sources: [source("jpcert-alert", "jpcert-official", "JPCERT/CC公式", "official", "https://www.jpcert.or.jp/at/2026/at260028.html", "2026-09-24T00:00:00Z", "F5 BIG-IP APMの脆弱性に関する注意喚起", "影響する構成、悪用の可能性、確認すべき対応を示しています。")],
    },
    {
      id: "microsoft-stock", title: "Microsoft株、AI事業への期待を背景に上昇", category: "stocks", secondaryCategories: ["ai"],
      summary: "投資家はAI関連事業の成長余地に注目。製品発表と株価の反応を分けて見ていく。",
      publishedAt: at(5.8), importanceScore: 7.2, relevanceScore: 8.5, buzzScore: 6.4,
      personalRelevanceReason: "Microsoftへの投資関心に関連", imageUrl: "/images/market.svg",
      tags: ["Microsoft", "株式", "AI投資"], company: "Microsoft",
      impacts: [{ label: "投資", description: "保有・ウォッチ銘柄のニュースを確認", kind: "investment" }],
      sources: [source("microsoft-stock", "ms-nasdaq", "Nasdaq", "media", "https://www.nasdaq.com/articles/global-indexes/powering-the-nasdaq-100-ai-thematic-engine", "2026-09-03T00:00:00Z", "Nasdaq 100のAI投資を巡る成長材料とリスク", "Microsoftなど主要企業のAI関連設備投資と市場への影響を分析。")],
    },
  ];
}

export const mockMarkets: MarketSnapshot[] = [
  { symbol: "N225", name: "日経平均", changePercent: 0.6, points: [3, 4, 4, 3, 5, 5, 7, 6, 8] },
  { symbol: "IXIC", name: "NASDAQ", changePercent: 0.9, points: [2, 4, 3, 5, 4, 7, 6, 8, 9] },
  { symbol: "9432", name: "NTT", changePercent: 1.2, points: [3, 3, 5, 4, 5, 7, 6, 8, 9] },
  { symbol: "MSFT", name: "Microsoft", changePercent: 1.8, points: [2, 4, 3, 6, 5, 7, 7, 9, 10] },
  { symbol: "NVDA", name: "NVIDIA", changePercent: -1.3, points: [9, 8, 9, 7, 8, 6, 5, 6, 4] },
];

export const mockTrends: XTrend[] = [
  { id: "openai", keyword: "OpenAI Agent", changePercent: 310, points: [2, 3, 3, 4, 6, 7, 10] },
  { id: "ms", keyword: "Microsoft Security", changePercent: 145, points: [2, 3, 4, 3, 6, 7, 8] },
  { id: "ntt", keyword: "NTT IOWN", changePercent: 82, points: [2, 2, 4, 3, 5, 6, 7] },
  { id: "nvidia", keyword: "NVIDIA", changePercent: 61, points: [2, 3, 3, 4, 4, 6, 7] },
  { id: "genai", keyword: "生成AI", changePercent: 58, points: [2, 2, 3, 5, 4, 5, 7] },
];

export function getMockChanges(update: UpdateWindow): ChangeItem[] {
  const slot = Number(update.currentSlot.slice(0, 2));
  const time = (minutesBefore: number) => {
    const total = slot * 60 - minutesBefore;
    return `${String(Math.floor(total / 60)).padStart(2, "0")}:${String(total % 60).padStart(2, "0")}`;
  };
  return [
    { id: "change-1", time: time(88), title: "MicrosoftのAI Security関連情報を追加", level: "重要", eventId: "microsoft-ai-security" },
    { id: "change-2", time: time(165), title: "NTT IOWNの新しい動きを確認", level: "注目", eventId: "ntt-iown" },
    { id: "change-3", time: time(200), title: "OpenAI Agentの話題量が増加", level: "注目", eventId: "openai-agent" },
  ];
}
