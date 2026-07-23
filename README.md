# AtCoder-JsDebugger

AtCoder向けのJavaScript / TypeScriptコードを、ブラウザ内だけで編集・実行・確認できるPlaygroundです。
`require("fs").readFileSync(0, "utf8")` を使う提出コードを、そのまま試せます。

- 日本語: <https://s-yoshiki.github.io/AtCoder-JsDebugger/>
- English: <https://s-yoshiki.github.io/AtCoder-JsDebugger/en>

## 主な機能

- JavaScript / TypeScriptの切り替えと、言語ごとの下書き保存
- Monaco Editorによる補完、型診断、整形、問題への移動
- 折り返し、ミニマップ、エディタ集中表示
- 標準入力、標準出力、標準エラー出力のブラウザ内再現
- 期待出力との比較によるAccepted / Wrong Answer判定
- Web Workerによる実行分離とタイムアウト
- 日本語 / 英語、ライト / ダークテーマ
- コードと設定のlocalStorage保存

コードや入力をアプリが外部サーバーへ送信することはありません。
Monaco EditorとTypeScriptコンパイラも配信物に同梱しています。

## 使い方

1. JavaScriptまたはTypeScriptを選択します。
2. エディタへ提出コードを入力します。
3. Inputへ標準入力を入力します。
4. 必要であればExpectedへ期待出力を入力します。
5. `Run`または `Ctrl / ⌘ + Enter` で実行します。

Expectedが入力されている場合、空白区切りのトークン列を比較して
Accepted / Wrong Answerを表示します。

### ショートカット

| 操作 | キー |
| --- | --- |
| 実行 | `Ctrl / ⌘ + Enter` |
| 整形 | `Shift + Alt + F` |
| 折り返し | `Alt + Z` |
| 次の問題へ移動 | `F8` |
| エディタ内検索 | `Ctrl / ⌘ + F` |

## 対応している実行API

ブラウザ内ランタイムは、競技プログラミングでよく使う最小限のNode.js APIを提供します。

- `require("fs")` / `require("node:fs")`
- `fs.readFileSync(...)`
- `process.stdin.fd`
- `process.stdout.write(...)` / `process.stderr.write(...)`
- `console.log(...)` / `console.info(...)`
- `console.error(...)` / `console.warn(...)`

完全なNode.js互換環境ではありません。npmパッケージ、Node.js組み込みモジュール全般、
AtCoderジャッジ固有のライブラリは利用できません。TypeScript実行時の変換は構文変換であり、
型エラーはMonaco Editorの診断として表示されます。

詳しくは[アーキテクチャ](docs/ARCHITECTURE.md)を参照してください。

## 開発

### 必要な環境

- Node.js 22以上
- pnpm 11.15.1

```bash
pnpm install
pnpm dev
```

| コマンド | 内容 |
| --- | --- |
| `pnpm dev` | 開発サーバーを起動 |
| `pnpm run check` | フォーマット、Lint、型チェック |
| `pnpm run build` | 型チェック、クライアント / SSRビルド、静的生成 |
| `pnpm preview` | `dist/`をローカルで確認 |
| `pnpm format` | Biomeで整形とimport整理 |
| `pnpm lint` | BiomeでLint |
| `pnpm typecheck` | TypeScript型チェック |

詳細なセットアップ、確認項目、トラブルシュートは
[開発ガイド](docs/DEVELOPMENT.md)にまとめています。

## ドキュメント

| ドキュメント | 対象 |
| --- | --- |
| [開発ガイド](docs/DEVELOPMENT.md) | セットアップ、コマンド、手動確認 |
| [アーキテクチャ](docs/ARCHITECTURE.md) | 実行系、Monaco、保存、静的生成 |
| [コントリビューションガイド](CONTRIBUTING.md) | Issue / Pull Requestの進め方 |
| [セキュリティポリシー](SECURITY.md) | 脆弱性報告と実行境界 |
| [AIエージェント向け指示](AGENTS.md) | 自動変更時の規約と検証手順 |

## ディレクトリ構成

```text
src/
├── components/       # 共通UI、レイアウト、Monacoラッパー
├── config/           # サイト情報、ルート定義
├── features/         # エディタ画面、設定画面
├── hooks/            # ストア、実行、テーマ、分割ペイン
├── i18n/             # 日本語 / 英語辞書とLocale Context
├── lib/
│   ├── runner/       # Web Worker実行プロトコルとホスト
│   ├── judge.ts      # 期待出力の判定
│   ├── monaco.ts     # Monacoテーマ、TypeScript型定義
│   └── storage.ts    # localStorageストア
├── styles/           # Tailwind CSSとデザイントークン
├── main.tsx          # ブラウザエントリ
└── entry-server.tsx  # 静的生成用エントリ
```

## ルーティングと静的生成

日本語は接頭辞なし、英語は `/en` 配下です。

| 画面 | 日本語 | English |
| --- | --- | --- |
| エディタ | `/` | `/en` |
| 設定 | `/config` | `/en/config` |
| エディタ設定 | `/config/editor-settings` | `/en/config/editor-settings` |
| About | `/config/about` | `/en/config/about` |

`pnpm build`はクライアント、SSR、プリレンダリングを順に実行し、
8ルートと `404.html`、`sitemap.xml`、`robots.txt`を `dist/`へ生成します。
Monacoはマウント後に遅延読み込みされるため、プリレンダリングHTMLには含まれません。

## デプロイ

`main`へのpushでGitHub Actionsが実行され、GitHub Pagesへ公開されます。
プロジェクトページ配下へ配信するため、ワークフローが
`BASE_PATH=/<repository>/` を渡してビルドします。

公開先を変更する場合は、[デプロイワークフロー](.github/workflows/deploy.yml)の
`BASE_PATH`と [`SITE_ORIGIN`](src/config/site.ts) を合わせて変更してください。

## プライバシーと制約

アプリ自身はコード、入力、設定を外部へ送信しません。ただし、実行するユーザーコードから
Web Workerで利用可能なブラウザAPIへアクセスできる場合があります。信頼できないコードは
実行しないでください。詳細は[セキュリティポリシー](SECURITY.md)を参照してください。

## License

[MIT](LICENSE)
