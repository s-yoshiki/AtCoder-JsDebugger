import type {
  RunOutcome,
  RunRequest,
  RunResponse,
  RunStatus,
} from './protocol';
import RunnerWorker from './runner.worker?worker';

export interface RunOptions {
  /** これを超えたら Worker を強制終了する。 */
  timeoutMs: number;
  /** 呼び出し側から実行を打ち切るための signal。 */
  signal?: AbortSignal;
}

const EMPTY: RunResponse = { stdout: '', stderr: '', error: null };

/**
 * ユーザーコードを使い捨ての Worker で実行する。
 *
 * 実行ごとに Worker を作り直すことで、前回の実行が汚したグローバルや
 * 走りっぱなしのタイマーを持ち越さずに済む。
 */
export function runCode(
  request: RunRequest,
  { timeoutMs, signal }: RunOptions,
): Promise<RunOutcome> {
  return new Promise<RunOutcome>((resolve) => {
    const worker = new RunnerWorker();
    const startedAt = performance.now();
    let settled = false;

    const finish = (response: RunResponse, status: RunStatus) => {
      if (settled) {
        return;
      }
      settled = true;
      clearTimeout(timer);
      signal?.removeEventListener('abort', onAbort);
      worker.terminate();
      resolve({
        ...response,
        status,
        timeoutMs,
        durationMs: Math.round(performance.now() - startedAt),
      });
    };

    const onAbort = () => finish(EMPTY, 'aborted');
    const timer = setTimeout(() => finish(EMPTY, 'timeout'), timeoutMs);

    worker.onmessage = (event: MessageEvent<RunResponse>) => {
      finish(event.data, 'ok');
    };

    worker.onerror = (event) => {
      finish({ ...EMPTY, error: event.message || null }, 'worker-error');
    };

    if (signal?.aborted) {
      onAbort();
      return;
    }
    signal?.addEventListener('abort', onAbort);

    worker.postMessage(request);
  });
}
