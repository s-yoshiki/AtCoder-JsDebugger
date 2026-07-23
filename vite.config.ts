import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * GitHub Pages はプロジェクトページ (`/AtCoder-JsDebugger/`) 配下で配信される。
 * ワークフローから `BASE_PATH` を渡してビルド時に切り替える。
 */
const base = process.env.BASE_PATH ?? '/';

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'es2022',
    // Monaco の source map だけで 15 MB 超になり、Pages への成果物が
    // 現実的でない大きさになるため本番では出力しない。
    sourcemap: false,
    // Monaco 本体は分割しても数 MB になるため、警告の閾値を現実に合わせる。
    chunkSizeWarningLimit: 5_000,
    // Monaco は `components/monaco-code-editor.tsx` から動的 import される。
    // manualChunks でまとめてしまうと初期チャンクへ引き上げられ、
    // modulepreload の対象になってしまうので、分割は既定のままにしておく。
  },
});
