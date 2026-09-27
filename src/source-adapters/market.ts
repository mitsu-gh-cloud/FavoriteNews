export interface MarketInput { symbol: string; name: string; price: number; previousClose: number; capturedAt: string }
export function normalizeMarket(input: MarketInput) {
  return { symbol: input.symbol, name: input.name, price: input.price,
    changePercent: input.previousClose ? ((input.price - input.previousClose) / input.previousClose) * 100 : 0,
    capturedAt: input.capturedAt };
}
