export interface RunRequest {
  /** エディタに書かれたユーザーコード。 */
  code: string;
  /** 標準入力に流し込む文字列。 */
  stdin: string;
  /** 設定画面で編集できる入出力フックのコード。 */
  hooks: {
    stdin: string;
    stdout: string;
    stderr: string;
  };
}

export interface RunResponse {
  stdout: string;
  stderr: string;
  /** 実行時例外のメッセージ。正常終了時は null。 */
  error: string | null;
}

/**
 * 実行がどう終わったか。文言はロケールごとに変わるので、
 * ここでは種別だけを返して表示側で翻訳する。
 */
export type RunStatus = 'ok' | 'timeout' | 'aborted' | 'worker-error';

export type RunOutcome = RunResponse & {
  status: RunStatus;
  /** 実行にかかった時間 (ms)。 */
  durationMs: number;
  /** タイムアウト時に適用されていた上限 (ms)。 */
  timeoutMs: number;
};
