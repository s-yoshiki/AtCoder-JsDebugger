# Contributing

IssueやPull Requestによる改善を歓迎します。

## はじめに

1. 既存IssueとPull Requestに同じ内容がないか確認します。
2. 大きな仕様変更は、実装前にIssueで製品境界とUXを相談してください。
3. [開発ガイド](docs/DEVELOPMENT.md)に従って環境を準備します。

## ブランチ

`main`から目的ごとの短いブランチを作成してください。

```bash
git switch main
git pull --ff-only
git switch -c feature/short-description
```

## 実装方針

- 1つのPull Requestでは1つの目的を扱う
- 日本語 / 英語の文言を同時に更新する
- localStorage形式を変更する場合は移行処理を用意する
- RunnerとUIのプロトコルを同じ変更で更新する
- Monaco、Runner、TypeScriptは初期バンドルへ引き上げない
- アプリ自身からユーザーコードや入力を外部送信しない
- 新機能にはキーボード操作とアクセシビリティを考慮する

## 確認

```bash
pnpm run check
pnpm run build
```

エディタまたは実行系を変更した場合は、
[手動確認項目](docs/DEVELOPMENT.md#手動確認)も実施してください。

## Pull Request

本文に次を含めてください。

- 変更した内容
- 変更が必要な理由
- 利用者への影響
- 実施した自動 / 手動確認
- UI変更時のスクリーンショット

生成物の `dist/`、`dist-ssr/`、依存関係の `node_modules/` はコミットしません。
