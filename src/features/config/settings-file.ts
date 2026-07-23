import { ALL_STORES } from '@/lib/settings';
import { NON_EXPORTABLE_KEYS, readRaw, writeRaw } from '@/lib/storage';

export interface SettingsFile {
  header: {
    name: string;
    v: string;
    datetime: string;
  };
  data: Record<string, unknown>;
}

export const SETTINGS_FILE_NAME = 'settings.json';

/** 表示側で翻訳するため、原因は種別で返す。 */
export type ImportErrorCode =
  | 'invalidJson'
  | 'notAnObject'
  | 'missingData'
  | 'nothingApplied';

export class ImportError extends Error {
  readonly code: ImportErrorCode;

  constructor(code: ImportErrorCode) {
    super(code);
    this.name = 'ImportError';
    this.code = code;
  }
}

/** 現在の設定を v1 と同じ形の JSON にまとめる。 */
export function exportSettings(): string {
  const data: Record<string, unknown> = {};
  for (const store of ALL_STORES) {
    if (NON_EXPORTABLE_KEYS.includes(store.key)) {
      continue;
    }
    data[store.key] = readRaw(store.key) ?? store.get();
  }

  const file: SettingsFile = {
    header: {
      name: 'atcoder-jsdebugger',
      v: '2.0.0',
      datetime: new Date().toISOString(),
    },
    data,
  };
  return JSON.stringify(file, null, '\t');
}

/**
 * エクスポートした JSON を読み込む。
 * 知っているキーだけを取り込むので、余計な項目が混ざっていても無視される。
 */
export function importSettings(json: string): number {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new ImportError('invalidJson');
  }
  if (typeof parsed !== 'object' || parsed === null) {
    throw new ImportError('notAnObject');
  }
  const data = (parsed as SettingsFile).data;
  if (typeof data !== 'object' || data === null) {
    throw new ImportError('missingData');
  }

  let applied = 0;
  for (const store of ALL_STORES) {
    if (!(store.key in data)) {
      continue;
    }
    writeRaw(store.key, (data as Record<string, unknown>)[store.key]);
    applied += 1;
  }
  if (applied === 0) {
    throw new ImportError('nothingApplied');
  }
  return applied;
}
