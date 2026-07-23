/// <reference lib="webworker" />
import type { RunRequest, RunResponse } from './protocol';

/**
 * ユーザーコードを Worker 内で実行する。
 *
 * メインスレッドから切り離しているので、
 * - 無限ループを書いても UI が固まらず、タイムアウトで `terminate()` できる
 * - `console.log` の差し替えがアプリ本体の console を壊さない
 * - `document` / `localStorage` に触れないので設定を書き潰される心配もない
 */

interface Bridge {
  __STDIN__: string;
  __STDOUT__: string;
  __STDERR__: string;
}

function describe(error: unknown): string {
  if (error instanceof Error) {
    return error.stack?.split('\n')[0] ?? `${error.name}: ${error.message}`;
  }
  return String(error);
}

self.onmessage = (event: MessageEvent<RunRequest>) => {
  const { code, stdin, hooks } = event.data;
  const bridge: Bridge = {
    __STDIN__: stdin,
    __STDOUT__: '',
    __STDERR__: '',
  };

  let error: string | null = null;
  try {
    // フックを先に評価してから利用者のコードを続ける。`AC_JS_DEBUGGER` を
    // 引数として渡すため、フック側のコードは書き換えずにそのまま動く。
    const source = [hooks.stdout, hooks.stderr, hooks.stdin, code].join('\n\n');
    const run = new Function('AC_JS_DEBUGGER', source);
    run(bridge);
  } catch (caught) {
    error = describe(caught);
  }

  const response: RunResponse = {
    stdout: bridge.__STDOUT__,
    stderr: bridge.__STDERR__,
    error,
  };
  self.postMessage(response);
};
