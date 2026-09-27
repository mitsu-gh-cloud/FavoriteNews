import type { SourceAdapter } from "./types";

export interface RssInput { title: string; link: string; isoDate: string; feedName: string; categories?: string[] }
export const rssAdapter: SourceAdapter<RssInput> = {
  normalize: (input) => ({ title: input.title, url: input.link, publishedAt: input.isoDate, sourceName: input.feedName, tags: input.categories ?? [] }),
};
