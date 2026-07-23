import { AlertTriangle, Play, RotateCcw, Square, Timer } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CodeEditor } from '@/components/code-editor';
import { Seo } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { useCodeRunner } from '@/hooks/use-code-runner';
import { useSplitPane } from '@/hooks/use-split-pane';
import { useStore } from '@/hooks/use-store';
import { useI18n } from '@/i18n/context';
import type { RunOutcome } from '@/lib/runner/protocol';
import { buildPageSeo } from '@/lib/seo';
import {
  editorCacheStore,
  editorSettingsStore,
  snippetsStore,
  stderrHookStore,
  stdinHookStore,
  stdoutHookStore,
} from '@/lib/settings';
import { cn } from '@/lib/utils';
import { IoPane } from './io-pane';

const isMac =
  typeof navigator !== 'undefined' &&
  /Mac|iP(hone|ad)/.test(navigator.platform ?? '');
const RUN_SHORTCUT = isMac ? '⌘ + Enter' : 'Ctrl + Enter';

export function EditorPage() {
  const { locale, t } = useI18n();
  const seo = useMemo(() => buildPageSeo(locale, 'editor'), [locale]);

  const [settings] = useStore(editorSettingsStore);
  const [snippet] = useStore(snippetsStore);
  const [stdinHook] = useStore(stdinHookStore);
  const [stdoutHook] = useStore(stdoutHookStore);
  const [stderrHook] = useStore(stderrHookStore);
  const [cachedCode, setCachedCode] = useStore(editorCacheStore);

  const [code, setCode] = useState(() =>
    settings.restoreCache && cachedCode ? cachedCode : snippet,
  );
  const [stdin, setStdin] = useState('');
  const { outcome, isRunning, run, stop } = useCodeRunner();
  const { containerRef, ratio, isDragging, handleProps } = useSplitPane();

  // 最新の値を副作用から参照するための入れ物 (ショートカット登録を再実行しない)。
  const latest = useRef({
    code,
    stdin,
    settings,
    stdinHook,
    stdoutHook,
    stderrHook,
  });
  latest.current = { code, stdin, settings, stdinHook, stdoutHook, stderrHook };

  const handleCodeChange = useCallback(
    (next: string) => {
      setCode(next);
      if (latest.current.settings.restoreCache) {
        setCachedCode(next);
      }
    },
    [setCachedCode],
  );

  const handleRun = useCallback(() => {
    const current = latest.current;
    void run(
      {
        code: current.code,
        stdin: current.stdin,
        hooks: {
          stdin: current.stdinHook,
          stdout: current.stdoutHook,
          stderr: current.stderrHook,
        },
      },
      current.settings.timeoutMs,
    );
  }, [run]);

  const handleReset = useCallback(() => {
    setCode(snippet);
    if (settings.restoreCache) {
      setCachedCode(snippet);
    }
  }, [snippet, settings.restoreCache, setCachedCode]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        event.preventDefault();
        handleRun();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handleRun]);

  const paneSize = settings.paneSize;
  const failure = describeFailure(outcome, t);

  return (
    <>
      <Seo seo={seo} />
      <h1 className="sr-only">{seo.title}</h1>
      <div
        ref={containerRef}
        className="flex min-h-0 flex-1 flex-col lg:flex-row"
        data-dragging={isDragging || undefined}
      >
        <div
          className="flex min-h-[45vh] min-w-0 flex-col lg:min-h-0"
          style={{ flexBasis: `${ratio}%`, flexGrow: 1 }}
        >
          <div className="flex h-11 shrink-0 items-center gap-2 border-border border-b px-3">
            <Button size="sm" onClick={handleRun} disabled={isRunning}>
              <Play className="size-3.5" />
              {t.editor.run}
            </Button>
            {isRunning ? (
              <Button size="sm" variant="outline" onClick={stop}>
                <Square className="size-3.5" />
                {t.editor.stop}
              </Button>
            ) : (
              <Button size="sm" variant="outline" onClick={handleReset}>
                <RotateCcw className="size-3.5" />
                {t.editor.reset}
              </Button>
            )}
            <span className="ml-auto hidden text-[11px] text-muted-foreground sm:inline">
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">
                {RUN_SHORTCUT}
              </kbd>
              <span className="ml-1.5">{t.editor.shortcutHint}</span>
            </span>
          </div>
          <div className="min-h-0 flex-1">
            <CodeEditor
              value={code}
              onChange={handleCodeChange}
              ariaLabel={t.editor.source}
            />
          </div>
        </div>

        {/* biome-ignore lint/a11y/useAriaPropsSupportedByRole: フォーカス可能な separator は aria-label を取れる */}
        <div
          {...handleProps}
          aria-label={t.editor.resize}
          className={cn(
            'hidden w-1.5 shrink-0 cursor-col-resize bg-border transition-colors hover:bg-primary lg:block',
            isDragging && 'bg-primary',
          )}
        />

        <aside
          className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 overflow-y-auto border-border border-t p-3 lg:border-t-0 lg:border-l"
          style={{ flexBasis: `${100 - ratio}%` }}
        >
          <IoPane
            label={t.editor.input}
            value={stdin}
            onChange={setStdin}
            height={paneSize}
          />

          <IoPane
            label={t.editor.output}
            value={outcome?.stdout ?? ''}
            readOnly
            height={paneSize}
            meta={
              outcome ? (
                <span className="inline-flex items-center gap-1">
                  <Timer className="size-3" />
                  {outcome.durationMs} ms
                </span>
              ) : null
            }
          />

          {settings.showStderr ? (
            <IoPane
              label={t.editor.error}
              tone="error"
              value={outcome?.stderr ?? ''}
              readOnly
              height={paneSize}
            />
          ) : null}

          {failure ? (
            <div
              role="alert"
              className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-[13px] text-destructive"
            >
              <AlertTriangle className="mt-0.5 size-4 shrink-0" />
              <pre className="min-w-0 flex-1 whitespace-pre-wrap break-words font-mono">
                {failure}
              </pre>
            </div>
          ) : null}
        </aside>
      </div>
    </>
  );
}

/** 実行結果を、表示すべきエラー文言 (なければ null) に変換する。 */
function describeFailure(
  outcome: RunOutcome | null,
  t: ReturnType<typeof useI18n>['t'],
): string | null {
  if (!outcome) {
    return null;
  }
  switch (outcome.status) {
    case 'timeout':
      return t.runner.timeout(outcome.timeoutMs);
    case 'aborted':
      return t.runner.aborted;
    case 'worker-error':
      return outcome.error ?? t.runner.unknown;
    default:
      return outcome.error;
  }
}
