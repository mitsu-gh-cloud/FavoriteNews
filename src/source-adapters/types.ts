export interface CollectedItem {
  title: string;
  url: string;
  publishedAt: string;
  sourceName: string;
  tags: string[];
}

export interface SourceAdapter<Input> {
  normalize(input: Input): CollectedItem;
}
