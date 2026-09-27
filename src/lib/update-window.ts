import type { UpdateWindow } from "@/types/news";

export function getUpdateWindow(now = new Date()): UpdateWindow {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", hourCycle: "h23",
  }).formatToParts(now);
  const get = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? 0);
  const year = get("year");
  const month = get("month");
  const day = get("day");
  const hour = get("hour");
  const current = hour >= 18 ? 18 : hour >= 12 ? 12 : hour >= 6 ? 6 : 18;
  const date = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
  if (hour < 6) date.setUTCDate(date.getUTCDate() - 1);
  const dayLabel = new Intl.DateTimeFormat("ja-JP", { month: "long", day: "numeric", weekday: "short", timeZone: "UTC" }).format(date);
  const previous = current === 6 ? "18:00" : current === 12 ? "06:00" : "12:00";
  const next = current === 6 ? "12:00" : current === 12 ? "18:00" : "06:00";
  const snapshotAt = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), current - 9)).toISOString();
  return { label: `${dayLabel} ${String(current).padStart(2, "0")}:00 更新`, currentSlot: `${String(current).padStart(2, "0")}:00`, previousSlot: previous, nextSlot: next, snapshotAt };
}
