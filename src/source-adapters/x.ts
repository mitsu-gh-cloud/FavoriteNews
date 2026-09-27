export interface XAggregateInput { keyword: string; postCount: number; previousPostCount: number; capturedAt: string }
export function normalizeXTrend(input: XAggregateInput) {
  return { keyword: input.keyword, postCount: input.postCount,
    changePercent: input.previousPostCount ? ((input.postCount - input.previousPostCount) / input.previousPostCount) * 100 : 0,
    capturedAt: input.capturedAt };
}
