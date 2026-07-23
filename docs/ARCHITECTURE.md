# アーキテクチャ

## 製品境界

AtCoder-JsDebuggerは、JavaScript / TypeScriptに絞ったブラウザ完結の
競技プログラミング用Playgroundです。

行うこと:

- Monaco Editorによる編集支援
- 標準入出力を使うコードのブラウザ内実行
- 期待出力との簡易判定
- 無限ループをUIから分離し、タイムアウトで停止
- コードと設定のローカル保存

行わないこと:

- 完全なNode.js / AtCoderジャッジ互換
- 任意のnpmパッケージの読み込み
- サーバー側でのコード実行
- コードや入力のアプリによる外部送信
- 設定のImport / Export
- ユーザー編集可能な標準入出力フック

## 全体フロー

```text
EditorPage
  ├─ Monaco Editor
  ├─ localStorage stores
  └─ useCodeRunner
       └─ runCode
            └─ disposable Web Worker
                 ├─ TypeScript transpile
                 ├─ Node.js互換shim
                 └─ user code
```

## エディタ

`CodeEditor`はSSR可能な軽量フォールバックを描画し、ブラウザでマウントされた後に
`MonacoCodeEditor`を遅延読み込みします。この境界により、Monaco本体を初期チャンクと
プリレンダリングHTMLから分離しています。

`src/lib/monaco.ts`は次を担当します。

- ライト / ダークテーマ
- TypeScript / JavaScriptコンパイラ設定
- `fs`、`require`、`process`のambient型定義

Monacoの型診断と、実行前のTypeScript変換は別の仕組みです。Monacoはsemantic errorを
表示しますが、Runnerの `transpileModule` は主に構文変換とsyntax diagnosticを行います。

## 実行系

### ホスト

`runCode`は実行ごとに新しいWorkerを作成します。

- 実行間でグローバル状態を共有しない
- AbortSignalでユーザー操作による停止を伝える
- 指定時間を超えるとWorkerを `terminate()`
- Worker完了後も必ず破棄

タイムアウトには、初回のTypeScriptコンパイラ読み込みと変換時間も含まれます。

### Worker

TypeScriptはTypeScript Compiler APIでCommonJS相当のJavaScriptへ変換します。
JavaScriptは変換せず実行します。どちらもAsyncFunctionへ渡し、次のshimを注入します。

- `require("fs")` / `require("node:fs")`
- `process.stdin`
- `process.stdout.write` / `process.stderr.write`
- `console.log` / `info` / `error` / `warn`
- `module` / `exports`

Workerでは `document` とlocalStorageへアクセスできません。一方、Workerグローバルに
存在するブラウザAPIがユーザーコードから利用できる場合があります。

### 終了状態

| 状態 | 意味 |
| --- | --- |
| `ok` | 正常終了 |
| `compile-error` | TypeScript構文変換に失敗 |
| `runtime-error` | ユーザーコードが例外を送出 |
| `timeout` | 制限時間を超過 |
| `aborted` | ユーザーが停止 |
| `worker-error` | Worker自体の読み込み・実行に失敗 |

## 出力判定

Expectedが空の場合は判定せず、実行完了だけを表示します。
Expectedがある場合は、期待値とstdoutを前後空白・連続空白を無視したトークン列として
比較します。浮動小数点の許容誤差判定には対応していません。

## 保存

`src/lib/storage.ts`はlocalStorageと `useSyncExternalStore` の間をつなぐ薄いストアです。
同一タブ内の変更と、別タブからの `storage` イベントを通知します。

保存対象:

- エディタ設定
- JavaScript / TypeScriptの下書き
- 選択言語
- Input
- Expected

旧バージョンの保存形式は、`src/lib/settings.ts` のnormalizerで読み替えます。

## 多言語とルーティング

日本語を既定ロケールとし、英語だけ `/en` 接頭辞を持ちます。
`src/config/routes.ts`の `ROUTES` が、React Router、SEO、プリレンダリング、
sitemapの共通入力です。

`src/i18n/ja.ts`で定義する `Dictionary`型を英語辞書にも適用し、
翻訳漏れを型チェックで検出します。

## ビルドと配信

1. Viteでクライアントビルド
2. Vite SSRで静的生成用バンドルを作成
3. `scripts/prerender.mjs`で全ロケール / ルートをHTML化
4. sitemapとrobots.txtを生成
5. GitHub ActionsからPagesへデプロイ

MonacoとTypeScript Workerは大きいため遅延チャンクになります。意図せず初期チャンクへ
取り込まないよう、Monacoのimport境界は維持してください。
