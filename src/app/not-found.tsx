import Link from "next/link";
export default function NotFound() { return <main className="page not-found-page"><div className="empty-card"><strong>ニュースが見つかりません</strong><span>削除されたか、URLが変更された可能性があります。</span><Link href="/news" className="primary-link">ニュース一覧へ戻る</Link></div></main>; }
