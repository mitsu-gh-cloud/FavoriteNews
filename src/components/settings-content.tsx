"use client";
import { useEffect, useState } from "react";
import { Bell, Clock3, Database, Info, ShieldCheck } from "lucide-react";
import { AppHeader } from "./ui";
import type { NewsData } from "@/types/news";
export function SettingsContent({ data }: { data: NewsData }) {
  const [notices, setNotices] = useState(false);
  useEffect(() => { setNotices(localStorage.getItem("favorite-news-notices") === "true"); }, []);
  return <main className="page settings-page"><AppHeader title="設定" /><div className="page-intro"><span className="eyebrow">PREFERENCES</span><h1>表示とデータ</h1><p>FavoriteNewsの更新と情報の扱いについて。</p></div>
    <section className="settings-section"><h2>更新スケジュール</h2><div className="panel setting-panel"><span className="setting-icon"><Clock3 size={20} /></span><div><strong>毎日 3回更新</strong><p>06:00 · 12:00 · 18:00（日本時間）</p><small>次回更新 {data.update.nextSlot}</small></div></div></section>
    <section className="settings-section"><h2>通知</h2><div className="panel setting-panel"><span className="setting-icon purple"><Bell size={20} /></span><div><strong>重要ニュース通知</strong><p>この端末での通知希望を保存します</p></div><button role="switch" aria-checked={notices} aria-label="重要ニュース通知" className={`switch ${notices ? "on" : ""}`} onClick={() => { const next = !notices; setNotices(next); localStorage.setItem("favorite-news-notices", String(next)); }}><span /></button></div><p className="footnote">プッシュ通知の配信は今後対応予定です。</p></section>
    <section className="settings-section"><h2>データソース</h2><div className="panel setting-panel"><span className="setting-icon green"><Database size={20} /></span><div><strong>{data.isDemo ? "デモデータ" : "Supabase"}</strong><p>{data.isDemo ? "画面確認用のサンプル情報を表示中" : "Supabaseから取得した情報を表示中"}</p></div></div>{data.warning ? <div className="warning-banner">{data.warning}</div> : null}</section>
    <section className="settings-section"><h2>情報について</h2><div className="panel info-panel"><div><ShieldCheck size={19} /><span>ニュース本文は保存せず、要約と外部リンクを表示します。</span></div><div><Info size={19} /><span>重要度・関連度・Buzzは参考指標です。Xは取得できた投稿群の傾向として扱います。</span></div></div></section>
  </main>;
}
