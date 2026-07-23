import type { SourceLanguage } from '@/lib/default-code';

export interface RunRequest {
  /** エディタに書かれたユーザーコード。 */
  code: string;
  /** JavaScript はそのまま、TypeScript はコンパイル後に実行する。 */
  language: SourceLanguage;
  /** 標準入力に流し込む文字列。 */
  stdin: string;
}

export interface RunResponse {
  stdout: string;
  stderr: string;
  /** 実行時例外のメッセージ。正常終了時は null。 */
  error: string | null;
  errorKind: 'compile' | 'runtime' | null;
}

/**
 * 実行がどう終わったか。文言はロケールごとに変わるので、
 * ここでは種別だけを返して表示側で翻訳する。
 */
export type RunStatus =
  | 'ok'
  | 'compile-error'
  | 'runtime-error'
  | 'timeout'
  | 'aborted'
  | 'worker-error';

export type RunOutcome = RunResponse & {
  status: RunStatus;
  /** 実行にかかった時間 (ms)。 */
  durationMs: number;
  /** タイムアウト時に適用されていた上限 (ms)。 */
  timeoutMs: number;
};
