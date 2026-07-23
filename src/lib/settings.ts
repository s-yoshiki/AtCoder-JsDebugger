import {
  DEFAULT_CODE,
  DEFAULT_LANGUAGE,
  type EditorDrafts,
  SAMPLE_STDIN,
  type SourceLanguage,
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

function normalizeDrafts(raw: unknown): EditorDrafts {
  // v2.0 以前の単一 JavaScript キャッシュも引き継ぐ。
  if (typeof raw === 'string') {
    return { ...DEFAULT_CODE, javascript: raw || DEFAULT_CODE.javascript };
  }
  if (typeof raw !== 'object' || raw === null) {
    return DEFAULT_CODE;
  }
  const value = raw as Record<string, unknown>;
  return {
    javascript:
      typeof value.javascript === 'string'
        ? value.javascript
        : DEFAULT_CODE.javascript,
    typescript:
      typeof value.typescript === 'string'
        ? value.typescript
        : DEFAULT_CODE.typescript,
  };
}

function normalizeLanguage(raw: unknown): SourceLanguage {
  return raw === 'javascript' || raw === 'typescript' ? raw : DEFAULT_LANGUAGE;
}

export const editorCacheStore = createStore<EditorDrafts>(
  STORAGE_KEYS.editorCache,
  DEFAULT_CODE,
  { normalize: normalizeDrafts },
);

export const editorLanguageStore = createStore<SourceLanguage>(
  STORAGE_KEYS.editorLanguage,
  DEFAULT_LANGUAGE,
  { normalize: normalizeLanguage },
);

export const editorInputStore = createStore<string>(
  STORAGE_KEYS.editorInput,
  SAMPLE_STDIN,
  { normalize: normalizeText(SAMPLE_STDIN) },
);

export const editorExpectedStore = createStore<string>(
  STORAGE_KEYS.editorExpected,
  '',
  { normalize: normalizeText('') },
);

export const ALL_STORES: readonly AnyStore[] = [
  editorSettingsStore,
  editorCacheStore,
  editorLanguageStore,
  editorInputStore,
  editorExpectedStore,
];
