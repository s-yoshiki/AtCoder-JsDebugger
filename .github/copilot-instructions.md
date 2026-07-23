# Copilot instructions

このリポジトリでコードを提案・変更する前に、ルートの `AGENTS.md` を読み、
その指示を正として従ってください。

特に次を守ってください。

- JavaScript / TypeScriptのブラウザ内Playgroundという製品境界を維持する
- ユーザーコードをUIスレッドや外部サーバーで実行しない
- Monacoのlazy importとWorkerの実行分離を維持する
- Runnerのprotocol / host / workerを同時に更新する
- 日本語 / 英語の翻訳を同じ変更で更新する
- localStorageの既存データをnormalizerで移行する
- 変更後に `pnpm run check` と `pnpm run build` を実行する

詳細:

- `docs/ARCHITECTURE.md`
- `docs/DEVELOPMENT.md`
- `CONTRIBUTING.md`
