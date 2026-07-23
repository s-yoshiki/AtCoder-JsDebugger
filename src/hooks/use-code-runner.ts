import { useCallback, useEffect, useRef, useState } from 'react';
import type { RunOutcome, RunRequest } from '@/lib/runner/protocol';
import { runCode } from '@/lib/runner/run-code';

export function useCodeRunner() {
  const [outcome, setOutcome] = useState<RunOutcome | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const controllerRef = useRef<AbortController | null>(null);

  const stop = useCallback(() => {
    controllerRef.current?.abort();
  }, []);

  const run = useCallback(async (request: RunRequest, timeoutMs: number) => {
    controllerRef.current?.abort();
    const controller = new AbortController();
    controllerRef.current = controller;

    setIsRunning(true);
    try {
      const next = await runCode(request, {
        timeoutMs,
        signal: controller.signal,
      });
      setOutcome(next);
      return next;
    } finally {
      if (controllerRef.current === controller) {
        controllerRef.current = null;
        setIsRunning(false);
      }
    }
  }, []);

  // 実行したままページを離れても Worker を残さない。
  useEffect(() => () => controllerRef.current?.abort(), []);

  return { outcome, isRunning, run, stop };
}
