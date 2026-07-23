import {
  DEFAULT_CODE,
  DEFAULT_STDERR_HOOK,
  DEFAULT_STDIN_HOOK,
  DEFAULT_STDOUT_HOOK,
} from './default-code';
import { type AnyStore, createStore, STORAGE_KEYS } from './storage';

export const EDITOR_THEMES = [
  'auto',
  'light',
  'dark',
  'high-contrast',
] as const;
export type EditorTheme = (typeof EDITOR_THEMES)[number];

export interface EditorSettings {
  /** 標準エラー出力ペインを表示するか。 */
  showStderr: boolean;
  /** 起動時に前回の編集内容を復元するか。 */
  restoreCache: boolean;
  /** エディタ配色。`auto` はアプリのテーマに追従する。 */
  theme: EditorTheme;
  /** 入出力ペインの高さ (px)。 */
  paneSize: number;
  /** エディタのフォントサイズ (px)。 */
  fontSize: number;
  /** 折り返しの有無。 */
  wordWrap: boolean;
  /** ミニマップの表示。 */
  minimap: boolean;
  /** 実行のタイムアウト (ms)。無限ループを打ち切るために使う。 */
  timeoutMs: number;
}

export const DEFAULT_EDITOR_SETTINGS: EditorSettings = {
  showStderr: false,
  restoreCache: true,
  theme: 'auto',
  paneSize: 200,
  fontSize: 14,
  wordWrap: false,
  minimap: false,
  timeoutMs: 5000,
};

function toBoolean(value: unknown, fallback: boolean): boolean {
  return typeof value === 'boolean' ? value : fallback;
}

function toNumber(value: unknown, fallback: number): number {
  const parsed = typeof value === 'string' ? Number(value) : value;
  return typeof parsed === 'number' && Number.isFinite(parsed)
    ? parsed
    : fallback;
}

/** v1 の Monaco テーマ名を新しい設定値へ読み替える。 */
function toEditorTheme(value: unknown, fallback: EditorTheme): EditorTheme {
  const legacy: Record<string, EditorTheme> = {
    vs: 'light',
    'vs-dark': 'dark',
    'hc-black': 'high-contrast',
  };
  if (typeof value !== 'string') {
    return fallback;
  }
  if ((EDITOR_THEMES as readonly string[]).includes(value)) {
    return value as EditorTheme;
  }
  return legacy[value] ?? fallback;
}

/**
 * 保存済みの設定を正規化する。
 * v1 (`errorpaineStatus` / `chacheStatus` / `themeColor` / `paineSize`) の
 * 綴りもここで吸収するので、既存ユーザーの設定はそのまま引き継がれる。
 */
export function normalizeEditorSettings(raw: unknown): EditorSettings {
  if (typeof raw !== 'object' || raw === null) {
    return DEFAULT_EDITOR_SETTINGS;
  }
  const value = raw as Record<string, unknown>;
  const d = DEFAULT_EDITOR_SETTINGS;

  return {
    showStderr: toBoolean(
      value.showStderr ?? value.errorpaineStatus,
      d.showStderr,
    ),
    restoreCache: toBoolean(
      value.restoreCache ?? value.chacheStatus,
      d.restoreCache,
    ),
    theme: toEditorTheme(value.theme ?? value.themeColor, d.theme),
    paneSize: clamp(toNumber(value.paneSize ?? value.paineSize, d.paneSize), {
      min: 120,
      max: 480,
    }),
    fontSize: clamp(toNumber(value.fontSize, d.fontSize), { min: 10, max: 24 }),
    wordWrap: toBoolean(value.wordWrap, d.wordWrap),
    minimap: toBoolean(value.minimap, d.minimap),
    timeoutMs: clamp(toNumber(value.timeoutMs, d.timeoutMs), {
      min: 500,
      max: 60_000,
    }),
  };
}

function clamp(value: number, { min, max }: { min: number; max: number }) {
  return Math.min(max, Math.max(min, value));
}

function normalizeText(fallback: string) {
  return (raw: unknown): string => (typeof raw === 'string' ? raw : fallback);
}

export const editorSettingsStore = createStore<EditorSettings>(
  STORAGE_KEYS.editorSettings,
  DEFAULT_EDITOR_SETTINGS,
  { normalize: normalizeEditorSettings },
);

export const snippetsStore = createStore<string>(
  STORAGE_KEYS.snippets,
  DEFAULT_CODE,
  { normalize: normalizeText(DEFAULT_CODE) },
);

export const stdinHookStore = createStore<string>(
  STORAGE_KEYS.stdin,
  DEFAULT_STDIN_HOOK,
  { normalize: normalizeText(DEFAULT_STDIN_HOOK) },
);

export const stdoutHookStore = createStore<string>(
  STORAGE_KEYS.stdout,
  DEFAULT_STDOUT_HOOK,
  { normalize: normalizeText(DEFAULT_STDOUT_HOOK) },
);

export const stderrHookStore = createStore<string>(
  STORAGE_KEYS.stderr,
  DEFAULT_STDERR_HOOK,
  { normalize: normalizeText(DEFAULT_STDERR_HOOK) },
);

export const editorCacheStore = createStore<string>(
  STORAGE_KEYS.editorCache,
  '',
  { normalize: normalizeText('') },
);

export const ALL_STORES: readonly AnyStore[] = [
  editorSettingsStore,
  snippetsStore,
  stdinHookStore,
  stdoutHookStore,
  stderrHookStore,
  editorCacheStore,
];
