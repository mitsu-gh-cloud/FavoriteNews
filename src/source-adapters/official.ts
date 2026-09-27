import type { SourceAdapter } from "./types";

export interface OfficialInput { title: string; url: string; publishedAt: string; organization: string; tags?: string[] }
export const officialAdapter: SourceAdapter<OfficialInput> = {
  normalize: (input) => ({ title: input.title, url: input.url, publishedAt: input.publishedAt, sourceName: input.organization, tags: input.tags ?? [] }),
};
