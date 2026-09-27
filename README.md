# FavoriteNews

LifeOS向けのモバイルファーストなニュースインテリジェンス画面です。現在のリポジトリには既存アプリのコードがなかったため、独立したNext.jsアプリとして作成しています。

## 起動

```powershell
pnpm install
pnpm dev
```

`http://localhost:3000` で開きます。初期状態はデモデータです。iPhone 15相当の幅は393pxです。

## データソース

`.env.example` を `.env.local` にコピーして、`NEWS_DATA_SOURCE=supabase`、`NEXT_PUBLIC_SUPABASE_URL`、`NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` を設定すると、`src/lib/news-service.ts` の取得先がSupabaseに切り替わります。未設定・一部取得失敗時は該当部分にデモデータを表示し、警告を出します。秘密鍵を `NEXT_PUBLIC_` 変数に入れないでください。

`supabase/schema.sql` はPhase 1用スキーマです。SupabaseプロジェクトのSQL Editorで適用できます。認証連携はまだありません。マイテーマの追加・削除は現段階では端末のlocalStorageに保存され、DB上の `user_themes` は将来のLifeOS認証接続用です。

個人向けのニュース行を登録する場合は必ず `news_events.user_id` に本人のSupabase Auth IDを設定してください。`user_id` が空の行は公開編集データとして読み取れる設計です。LifeOS認証を接続するまでは、個人データをSupabaseモードで公開しないでください。

`src/source-adapters/` はPhase 2の収集処理が共通形式へ変換する境界です。現段階では外部API・定期実行は実装していません。画面の時刻は日本時間の06:00/12:00/18:00を基準に表示しますが、実データの収集スケジュールは今後の実装が必要です。

デモニュースは画面検証用です。関連リンクには記事の見出しと短い概要を表示し、確認できた元記事へ移動します。Xのリンクは関連投稿の検索結果です。イベントの更新時刻とスコアはデモ用であり、リンク先記事の発行時刻や実際の市場変動とは一致しません。実運用時は収集した元記事URLと公開日時を登録してください。外部記事の本文は保存しません。

## 構成

- `src/app/`: ホーム、ニュース、詳細、分析、マイテーマ、設定、検索
- `src/components/`: 共通UIと操作画面
- `src/data/mock.ts`: デモデータ
- `src/lib/news-service.ts`: データ取得の切替とスナップショット差分
- `src/source-adapters/`: 将来の収集元アダプター
- `supabase/schema.sql`: テーブル、インデックス、RLS

## デプロイ

Vercelへリポジトリを接続し、必要なら上記環境変数を設定してNext.jsプロジェクトとしてデプロイします。初期状態のままでもデモ画面としてビルドできます。
