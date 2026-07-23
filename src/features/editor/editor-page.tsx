import {
  AlertTriangle,
  CheckCircle2,
  CircleAlert,
  Maximize2,
  Map as MinimapIcon,
  Minimize2,
  Play,
  RotateCcw,
  Square,
  Timer,
  WandSparkles,
  WrapText,
} from 'lucide-react';
import type { editor } from 'monaco-editor';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { CodeEditor, type EditorProblems } from '@/components/code-editor';
import { Seo } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { useCodeRunner } from '@/hooks/use-code-runner';
import { useSplitPane } from '@/hooks/use-split-pane';
import { useStore } from '@/hooks/use-store';
import { useI18n } from '@/i18n/context';
import {
  DEFAULT_CODE,
  type EditorDrafts,
  type SourceLanguage,
} from '@/lib/default-code';
import { isOutputAccepted } from '@/lib/judge';
import type { RunOutcome } from '@/lib/runner/protocol';
import { buildPageSeo } from '@/lib/seo';
import {
  editorCacheStore,
  editorExpectedStore,
  editorInputStore,
  editorLanguageStore,
  editorSettingsStore,
} from '@/lib/settings';
import { cn } from '@/lib/utils';
import { IoPane } from './io-pane';

const isMac =
  typeof navigator !== 'undefined' &&
  /Mac|iP(hone|ad)/.test(navigator.platform ?? '');
const RUN_SHORTCUT = isMac ? '⌘ + Enter' : 'Ctrl + Enter';

const EMPTY_PROBLEMS: EditorProblems = { errors: 0, warnings: 0 };

export function EditorPage() {
  const { locale, t } = useI18n();
  const seo = useMemo(() => buildPageSeo(locale, 'editor'), [locale]);

  const [settings, setSettings] = useStore(editorSettingsStore);
  const [cachedDrafts, setCachedDrafts] = useStore(editorCacheStore);
  const [language, setLanguage] = useStore(editorLanguageStore);
  const [stdin, setStdin] = useStore(editorInputStore);
  const [expected, setExpected] = useStore(editorExpectedStore);
  const [drafts, setDrafts] = useState<EditorDrafts>(() =>
    settings.restoreCache ? cachedDrafts : DEFAULT_CODE,
  );
  const [problems, setProblems] = useState(EMPTY_PROBLEMS);
  const [focusMode, setFocusMode] = useState(false);
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const { outcome, isRunning, run, stop, clear } = useCodeRunner();
  const { containerRef, ratio, isDragging, handleProps } = useSplitPane();
  const code = drafts[language];

  const latest = useRef({
    code,
    language,
    stdin,
    settings,
  });
  latest.current = { code, language, stdin, settings };

  const handleCodeChange = useCallback(
    (next: string) => {
      const currentLanguage = latest.current.language;
      setDrafts((previous) => ({ ...previous, [currentLanguage]: next }));
      if (latest.current.settings.restoreCache) {
        setCachedDrafts((previous) => ({
          ...previous,
          [currentLanguage]: next,
        }));
      }
    },
    [setCachedDrafts],
  );

  const handleLanguageChange = useCallback(
    (next: SourceLanguage) => {
      setLanguage(next);
      setProblems(EMPTY_PROBLEMS);
      clear();
      requestAnimationFrame(() => editorRef.current?.focus());
    },
    [clear, setLanguage],
  );

  const handleRun = useCallback(() => {
    const current = latest.current;
    void run(
      {
        code: current.code,
        language: current.language,
        stdin: current.stdin,
      },
      current.settings.timeoutMs,
    );
  }, [run]);

  const handleReset = useCallback(() => {
    const next = DEFAULT_CODE[language];
    setDrafts((previous) => ({ ...previous, [language]: next }));
    if (settings.restoreCache) {
      setCachedDrafts((previous) => ({ ...previous, [language]: next }));
    }
    clear();
  }, [clear, language, settings.restoreCache, setCachedDrafts]);

  const runEditorAction = useCallback((action: string) => {
    const editorInstance = editorRef.current;
    editorInstance?.focus();
    void editorInstance?.getAction(action)?.run();
  }, []);

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

  const failure = describeFailure(outcome, t);
  const hasExpected = expected.trim().length > 0;
  const accepted =
    outcome?.status === 'ok' && hasExpected
      ? isOutputAccepted(expected, outcome.stdout)
      : null;
  const status = getRunStatus({
    outcome,
    isRunning,
    accepted,
    labels: t.editor.status,
  });

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
          style={{
            flexBasis: focusMode ? '100%' : `${ratio}%`,
            flexGrow: 1,
          }}
        >
          <div className="flex min-h-11 shrink-0 flex-wrap items-center gap-1.5 border-border border-b px-2 py-1.5 sm:px-3">
            <div className="flex shrink-0 items-center gap-1.5">
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

              <Select
                value={language}
                onChange={(event) =>
                  handleLanguageChange(event.target.value as SourceLanguage)
                }
                aria-label={t.editor.language}
                className="h-8 w-32 py-1 text-xs"
              >
                <option value="typescript">TypeScript</option>
                <option value="javascript">JavaScript</option>
              </Select>
            </div>

            <div className="mx-0.5 h-5 w-px bg-border" aria-hidden="true" />

            <Button
              size="icon"
              variant="ghost"
              className="size-8"
              onClick={() => runEditorAction('editor.action.formatDocument')}
              title={t.editor.format}
              aria-label={t.editor.format}
            >
              <WandSparkles className="size-4" />
            </Button>
            <Button
              size="icon"
              variant={settings.wordWrap ? 'secondary' : 'ghost'}
              className="size-8"
              onClick={() =>
                setSettings((previous) => ({
                  ...previous,
                  wordWrap: !previous.wordWrap,
                }))
              }
              title={t.editor.toggleWrap}
              aria-label={t.editor.toggleWrap}
              aria-pressed={settings.wordWrap}
            >
              <WrapText className="size-4" />
            </Button>
            <Button
              size="icon"
              variant={settings.minimap ? 'secondary' : 'ghost'}
              className="size-8"
              onClick={() =>
                setSettings((previous) => ({
                  ...previous,
                  minimap: !previous.minimap,
                }))
              }
              title={t.editor.toggleMinimap}
              aria-label={t.editor.toggleMinimap}
              aria-pressed={settings.minimap}
            >
              <MinimapIcon className="size-4" />
            </Button>
            <Button
              size="icon"
              variant={focusMode ? 'secondary' : 'ghost'}
              className="size-8"
              onClick={() => setFocusMode((previous) => !previous)}
              title={focusMode ? t.editor.exitFocus : t.editor.focus}
              aria-label={focusMode ? t.editor.exitFocus : t.editor.focus}
              aria-pressed={focusMode}
            >
              {focusMode ? (
                <Minimize2 className="size-4" />
              ) : (
                <Maximize2 className="size-4" />
              )}
            </Button>

            {problems.errors + problems.warnings > 0 ? (
              <Button
                size="sm"
                variant="ghost"
                className="h-8 gap-2 px-2 font-mono text-[11px]"
                onClick={() => runEditorAction('editor.action.marker.next')}
                title={t.editor.nextProblem}
              >
                <span className="inline-flex items-center gap-1 text-destructive">
                  <CircleAlert className="size-3.5" />
                  {problems.errors}
                </span>
                <span className="inline-flex items-center gap-1 text-warning">
                  <AlertTriangle className="size-3.5" />
                  {problems.warnings}
                </span>
              </Button>
            ) : null}

            <span
              className={cn(
                'ml-auto inline-flex items-center gap-1.5 rounded-full px-2 py-1 font-medium text-[11px]',
                status.className,
              )}
              role="status"
            >
              {status.icon}
              {status.label}
              {outcome ? (
                <span className="inline-flex items-center gap-1 opacity-75">
                  <Timer className="size-3" />
                  {outcome.durationMs} ms
                </span>
              ) : null}
            </span>

            <span className="hidden text-[11px] text-muted-foreground xl:inline">
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">
                {RUN_SHORTCUT}
              </kbd>
            </span>
          </div>
          <div className="min-h-0 flex-1">
            <CodeEditor
              value={code}
              onChange={handleCodeChange}
              language={language}
              path={`file:///main.${language === 'typescript' ? 'ts' : 'js'}`}
              onMount={(instance) => {
                editorRef.current = instance;
              }}
              onProblemsChange={setProblems}
              ariaLabel={t.editor.source}
            />
          </div>
        </div>

        {!focusMode ? (
          <>
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
                height={settings.paneSize}
              />

              <IoPane
                label={t.editor.expected}
                value={expected}
                onChange={setExpected}
                height={settings.paneSize}
                meta={
                  accepted === null ? null : (
                    <span
                      className={accepted ? 'text-success' : 'text-destructive'}
                    >
                      {accepted
                        ? t.editor.status.accepted
                        : t.editor.status.wrongAnswer}
                    </span>
                  )
                }
              />

              <IoPane
                label={t.editor.output}
                value={outcome?.stdout ?? ''}
                readOnly
                onClear={clear}
                height={settings.paneSize}
              />

              {settings.showStderr || outcome?.stderr ? (
                <IoPane
                  label={t.editor.error}
                  tone="error"
                  value={outcome?.stderr ?? ''}
                  readOnly
                  onClear={clear}
                  height={settings.paneSize}
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
          </>
        ) : null}
      </div>
    </>
  );
}

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

function getRunStatus({
  outcome,
  isRunning,
  accepted,
  labels,
}: {
  outcome: RunOutcome | null;
  isRunning: boolean;
  accepted: boolean | null;
  labels: ReturnType<typeof useI18n>['t']['editor']['status'];
}) {
  if (isRunning) {
    return {
      label: labels.running,
      className: 'bg-accent text-accent-foreground',
      icon: <Timer className="size-3" />,
    };
  }
  if (!outcome) {
    return {
      label: labels.ready,
      className: 'bg-muted text-muted-foreground',
      icon: null,
    };
  }
  if (outcome.status !== 'ok') {
    return {
      label: labels.failed,
      className: 'bg-destructive/10 text-destructive',
      icon: <CircleAlert className="size-3" />,
    };
  }
  if (accepted === false) {
    return {
      label: labels.wrongAnswer,
      className: 'bg-destructive/10 text-destructive',
      icon: <CircleAlert className="size-3" />,
    };
  }
  return {
    label: accepted ? labels.accepted : labels.completed,
    className: 'bg-success/10 text-success',
    icon: <CheckCircle2 className="size-3" />,
  };
}
