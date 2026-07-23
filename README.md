# AtCoder-JsDebugger

AtCoder の JavaScript / TypeScript 提出コードを、ブラウザ上でそのまま実行・デバッグできるエディタです。
`require('fs').readFileSync('/dev/stdin', 'utf8')` を書いたコードを、貼り替えずに動かせます。

## DEMO

- 日本語: <https://s-yoshiki.github.io/AtCoder-JsDebugger/>
- English: <https://s-yoshiki.github.io/AtCoder-JsDebugger/en>

## 特徴

- **JavaScript / TypeScript** — 言語ごとに下書きを保持し、TypeScript はブラウザ内で
  JavaScript にコンパイルして実行します。
- **Monaco Editor** — 型診断・補完・整形・問題への移動・折り返し・ミニマップ・
  集中表示を利用できます。`fs` / `require` / `process` の競プロ向け型定義も同梱しています。
- **テスト判定** — 標準入力と期待出力を保存し、実行結果を Accepted / Wrong Answer で表示します。
- **Web Worker 実行** — コードは Worker 内で動くため、無限ループを書いてもタブは固まらず、
  タイムアウトで安全に打ち切られます。
- **ローカル完結** — コードも設定も localStorage に保存され、外部へ送信されません。
  Monaco Editor も CDN ではなく同梱しています。
- **日本語 / 英語** — URL がロケールの正で、ヘッダーから切り替えられます。
- **ライト / ダークテーマ** — アプリとエディタの配色が連動します。

## 技術スタック

| 領域 | 使用しているもの |
| --- | --- |
| パッケージ管理 | pnpm |
| ビルド | Vite |
| UI | React + TypeScript |
| スタイル | Tailwind CSS |
| エディタ | Monaco Editor (`@monaco-editor/react`) + TypeScript Language Service |
| Lint / Format | Biome |
| ルーティング | React Router (BrowserRouter) |

## 開発

```bash
pnpm install
```

```bash
pnpm run dev
```

| コマンド | 内容 |
| --- | --- |
| `pnpm run dev` | 開発サーバーを起動 |
| `pnpm run build` | 型チェック → クライアント → SSR → 静的化 を順に実行 |
| `pnpm run preview` | ビルド結果をローカルで確認 |
| `pnpm run lint` | Biome による Lint |
| `pnpm run format` | Biome による整形とインポート整理 |
| `pnpm run typecheck` | `tsc --noEmit` |
| `pnpm run check` | 整形チェック + Lint + 型チェックをまとめて実行 |

## ディレクトリ構成

```
src/
├── components/   # 汎用 UI (ui/) とレイアウト (layout/)
├── config/       # サイト情報・ルート定義 (routes.ts)
├── features/     # 画面単位のまとまり (editor/ · config/)
├── hooks/        # React フック
├── i18n/         # 文言辞書 (ja.ts / en.ts) とロケール Context
├── lib/          # ストレージ・テーマ・SEO・実行エンジン
│   └── runner/   # ユーザーコードを実行する Web Worker
├── styles/       # Tailwind のエントリとデザイントークン
├── main.tsx      # ブラウザ用エントリ
└── entry-server.tsx  # 静的化用エントリ (HTML / sitemap / robots を生成)
```

## ルーティングと多言語

パスがロケールの正で、日本語は接頭辞なし、英語は `/en` 配下に置いています。

| 画面 | 日本語 | English |
| --- | --- | --- |
| エディタ | `/` | `/en` |
| 設定 | `/config` | `/en/config` |
文言は [`src/i18n/ja.ts`](src/i18n/ja.ts) の `Dictionary` 型が正で、
[`src/i18n/en.ts`](src/i18n/en.ts) はその型に従います。
項目を足し忘れると型エラーになるので、翻訳漏れはビルド時に見つかります。

## SEO と静的化

`pnpm run build` は 3 段階で走ります。

1. `vite build` — クライアント資材
2. `vite build --ssr` — 静的化用のサーバーバンドル
3. `node scripts/prerender.mjs` — ルート × ロケールぶんの HTML を出力

これにより `dist/` には以下が生成されます。

- ルートごとの `index.html` (全 8 ページ + `404.html`)
  — `<title>` / `meta description` / canonical / hreflang / OGP / Twitter Card /
  JSON-LD をページ単位で埋め込み済み。本文も描画済みなので、
  JavaScript を実行しないクローラーにも内容が届きます。
- `sitemap.xml` — `xhtml:link` で日英を相互参照
- `robots.txt`

Monaco はマウント後に動的読み込みされるため、静的化した HTML には含まれず、
初期 JS も 300 KB 程度に収まります。

## デプロイ

`main` への push で [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) が動き、
GitHub Pages へ公開されます。

初回のみ、リポジトリの **Settings → Pages → Build and deployment → Source** を
**GitHub Actions** に変更してください
(以前の `docs/` ディレクトリからの配信は使わなくなりました)。

プロジェクトページ配下 (`/AtCoder-JsDebugger/`) で配信されるため、ワークフローから
`BASE_PATH` を渡してビルドしています。canonical や sitemap の絶対 URL は
[`src/config/site.ts`](src/config/site.ts) の `SITE_ORIGIN` と組み合わせて作られるので、
公開先を変える場合はこの 2 つを合わせてください。

各ルートが実ファイルとして出力されているため、SPA 用の 404 リダイレクトは不要です。
`404.html` は存在しないパスにだけ使われ、`noindex` を付けてあります。

## 設定の互換性

v1 (Vue 版) で保存した localStorage の設定は、そのまま読み込まれます。
`Config → Export Settings` で書き出した JSON も引き続き取り込めます。

## License

[MIT](LICENSE)
