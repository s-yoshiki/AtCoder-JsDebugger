# AGENTS.md

このファイルは、リポジトリを変更するAIエージェント向けの正本です。
リポジトリ全体に適用されます。

## 最初に読むもの

1. `README.md`
2. `docs/ARCHITECTURE.md`
3. `docs/DEVELOPMENT.md`
4. 変更対象に近いソース

作業開始時に `git status --short --branch` を確認し、既存の未コミット変更を
利用者の変更として保持してください。

## プロダクトの目的

AtCoder向けJavaScript / TypeScriptコードをブラウザ内で編集・実行するPlaygroundです。
中心となる価値は、ローカル完結、Monacoの編集支援、Web Workerによる安全な停止です。

## 守るべき境界

- JavaScript / TypeScriptに集中する
- ユーザーコードをアプリのサーバーへ送信しない
- ユーザーコードはUIスレッドで実行しない
- 実行ごとにWorkerを破棄し、タイムアウトを維持する
- 完全なNode.js互換を暗黙に約束しない
- npmパッケージ実行や外部実行サービスを追加しない
- 設定Import / Exportとユーザー編集可能なI/Oフックを復活させない
- 日本語 / 英語のURL構造を維持する
- Monacoの遅延読み込み境界を維持する
- `dist/`、`dist-ssr/`をコミットしない

この境界を変える必要がある場合は、コードより先に理由と影響を
`docs/ARCHITECTURE.md`へ記録してください。

## 技術スタック

- Node.js 22以上
- pnpm（`package.json#packageManager`が正）
- React、TypeScript、Vite
- Tailwind CSS
- Monaco Editor
- Biome
- React Router

依存関係の操作にはnpm / yarnではなくpnpmを使います。

## 主要な変更ルール

### UI

- 共通UIは `src/components/ui/` を再利用する
- Tailwindのセマンティックカラーを使い、直接色指定を増やさない
- キーボード操作、aria-label、フォーカス表示を維持する
- Run、Reset、言語選択は同じ行の操作グループとして維持する
- モバイルと `lg` 以上の分割レイアウトを両方確認する

### Monaco

- `src/components/code-editor.tsx` のlazy importを維持する
- 設定は `src/lib/monaco.ts` と `monaco-code-editor.tsx` に集約する
- 言語を増やす場合は、実行系、型定義、保存形式、UIを同じ変更で扱う
- 診断件数と現在のモデルが言語切替後に同期することを確認する

### Runner

- `protocol.ts`、`run-code.ts`、`runner.worker.ts` の型を同期する
- Workerで例外を閉じ込め、必ず終了状態を返す
- タイムアウト、AbortSignal、Worker破棄を回帰させない
- 新しいNode.js shimは対応範囲をREADMEとアーキテクチャへ追記する
- TypeScript semantic errorはMonaco、syntax / transform errorはRunnerが担当する

### 保存

- 既存のlocalStorageキーを不用意に変更しない
- 保存型を変更する場合はnormalizerで旧値を移行する
- SSRではlocalStorageへ直接アクセスしない

### ルートと翻訳

- ルート追加時は `src/config/routes.ts` を正として更新する
- `src/i18n/ja.ts` の `Dictionary`型と日英辞書を同時に更新する
- SEO、プリレンダリング、sitemapの件数を確認する

## 検証

小さな変更でも次を実行します。

```bash
pnpm run check
pnpm run build
```

Runner、Monaco、保存、ルートを変更した場合は
`docs/DEVELOPMENT.md`の手動確認も実施します。

テスト結果を報告するときは、実行したコマンドと未確認事項を明記してください。

## GitとGitHub

- 既定ブランチは `main`
- CIとPagesは `.github/workflows/` が正
- コミット、push、PR作成は依頼された場合だけ行う
- 無関係な差分をstage、revert、整形しない
- `git reset --hard` や広い削除を行わない
- PagesはGitHub Actions配信（`build_type: workflow`）

## ドキュメント同期

利用者向け挙動が変わる場合はREADMEを更新します。
設計境界やデータフローが変わる場合は `docs/ARCHITECTURE.md`、
セットアップや検証方法が変わる場合は `docs/DEVELOPMENT.md` を更新します。
