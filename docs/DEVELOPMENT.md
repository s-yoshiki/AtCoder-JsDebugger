# 開発ガイド

## 前提

- Node.js 22以上
- pnpm 11.15.1
- Git

pnpmのバージョンは `package.json` の `packageManager` が正です。
Corepackを使う場合は、必要に応じて先に有効化してください。

```bash
corepack enable
pnpm install
```

## ローカル開発

```bash
pnpm dev
```

Viteの既定URLは <http://localhost:5173/> です。
GitHub Pages用のパスを確認したい場合は、環境変数を付けてビルドします。

```bash
BASE_PATH=/AtCoder-JsDebugger/ pnpm build
pnpm preview
```

## 品質チェック

変更前後で最低限、次を実行してください。

```bash
pnpm run check
pnpm run build
```

`pnpm run check`は、Biomeのフォーマット確認、Lint、TypeScript型チェックを実行します。
`pnpm run build`はそれらに加えてクライアント / SSRビルドと静的生成を確認します。

現在、専用の自動テストスイートはありません。実行系やMonacoを変更した場合は、
次の手動確認も必要です。

## 手動確認

### エディタ

- Run、Reset、言語選択が同じ行に表示される
- JavaScript / TypeScriptを切り替えると、それぞれの下書きが復元される
- 整形、折り返し、ミニマップ、集中表示が動作する
- TypeScriptの型エラー / 警告数が表示され、F8で移動できる

### 実行

- `require("fs").readFileSync(0, "utf8")` でInputを取得できる
- `console.log`がOutputへ、`console.error`がErrorへ表示される
- TypeScriptの構文エラーがCompile Errorとして表示される
- 実行時例外とタイムアウトが表示される
- Expected一致時はAccepted、不一致時はWrong Answerになる
- Stopで実行中のWorkerを終了できる

### 保存とルーティング

- 再読み込み後もコード、言語、Input、Expected、設定が復元される
- `/`、`/config`、`/config/editor-settings`、`/config/about`が開ける
- `/en`配下で英語表示になる
- `sitemap.xml`に日英8ルートが含まれる

## 変更箇所の目安

| 変更内容 | 主なファイル |
| --- | --- |
| エディタUI | `src/features/editor/editor-page.tsx` |
| Monaco設定 | `src/components/monaco-code-editor.tsx`, `src/lib/monaco.ts` |
| 実行プロトコル | `src/lib/runner/protocol.ts` |
| 実行ホスト | `src/lib/runner/run-code.ts` |
| ランタイム | `src/lib/runner/runner.worker.ts` |
| 保存形式 | `src/lib/storage.ts`, `src/lib/settings.ts` |
| 翻訳 | `src/i18n/ja.ts`, `src/i18n/en.ts` |
| ルート / SEO | `src/config/routes.ts`, `src/lib/seo.ts` |

## 翻訳の追加

`src/i18n/ja.ts` の `Dictionary`型を正として、日英両方を同じ変更で更新します。
翻訳キーが不足している場合は型チェックが失敗します。

## localStorageの変更

既存利用者の値を壊さないよう、保存キーは原則として変更しません。
値の型を変える場合は、`src/lib/settings.ts` のnormalizerで旧形式を移行してください。

## GitHub Pages

- CI: `.github/workflows/ci.yml`
- デプロイ: `.github/workflows/deploy.yml`
- 公開方式: GitHub Actions
- 対象ブランチ: `main`

デプロイ失敗時は、buildとdeployのどちらが失敗したかを先に分けて確認します。
Pages設定の `build_type` は `workflow` である必要があります。

## トラブルシュート

### MonacoやTypeScriptの変更が反映されない

Viteの依存最適化キャッシュを使っている場合があります。開発サーバーを再起動し、
ブラウザを再読み込みしてください。

### TypeScript実行だけ遅い

TypeScriptコンパイラはRunner Workerの遅延チャンクとして読み込まれます。
初回実行は2回目以降より時間がかかります。

### プリレンダリングでlocalStorage警告が出る

サーバー側ではlocalStorageを利用できません。アプリのストアは既定値へ
フォールバックする設計です。ビルド結果と終了コードが成功なら問題ありません。
