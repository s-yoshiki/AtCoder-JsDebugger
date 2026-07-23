/**
 * localStorage の薄いラッパー。
 *
 * - 値は JSON でシリアライズする (v1 と同じ形式なので設定は引き継がれる)
 * - パース結果をキャッシュし `useSyncExternalStore` から安全に読めるようにする
 * - 同一タブ内の更新とタブ間の `storage` イベントの両方を購読者へ通知する
 */

/** v1 からのキー。`editor_chache` の綴りは互換のため意図的に据え置く。 */
export const STORAGE_KEYS = {
  editorSettings: 'editor_settings',
  editorCache: 'editor_chache',
  editorLanguage: 'editor_language',
  editorInput: 'editor_input',
  editorExpected: 'editor_expected',
} as const;

export type StorageKey = (typeof STORAGE_KEYS)[keyof typeof STORAGE_KEYS];

/** 設定のエクスポート対象から外すキー (作業中コードは持ち出さない)。 */
export interface Store<T> {
  readonly key: StorageKey;
  readonly defaultValue: T;
  get(): T;
  set(value: T): void;
  reset(): void;
  subscribe(listener: () => void): () => void;
}

const listeners = new Map<string, Set<() => void>>();
const invalidators = new Map<string, Set<() => void>>();

function notify(key: string) {
  // 購読者へ渡すスナップショットが古くならないよう、通知より先に破棄する。
  for (const invalidate of invalidators.get(key) ?? []) {
    invalidate();
  }
  for (const listener of listeners.get(key) ?? []) {
    listener();
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('storage', (event) => {
    if (event.key) {
      notify(event.key);
    }
  });
}

/** 生の JSON 文字列を読む。壊れた値や未設定は `null` を返す。 */
export function readRaw(key: string): unknown {
  try {
    const item = localStorage.getItem(key);
    if (item === null) {
      return null;
    }
    return JSON.parse(item) as unknown;
  } catch {
    return null;
  }
}

export function writeRaw(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* 保存領域が使えない (プライベートモード等) 場合は黙って諦める */
  }
  notify(key);
}

export interface CreateStoreOptions<T> {
  /**
   * 保存済みの値を検証・移行する。想定外の値なら `undefined` を返すと
   * 既定値にフォールバックする。
   */
  normalize?: (raw: unknown) => T | undefined;
}

export function createStore<T>(
  key: StorageKey,
  defaultValue: T,
  { normalize }: CreateStoreOptions<T> = {},
): Store<T> {
  let cache: { value: T } | null = null;

  const cacheSet = invalidators.get(key) ?? new Set();
  cacheSet.add(() => {
    cache = null;
  });
  invalidators.set(key, cacheSet);

  const read = (): T => {
    if (cache) {
      return cache.value;
    }
    const raw = readRaw(key);
    const value =
      raw === null ? defaultValue : (normalize?.(raw) ?? (raw as T));
    cache = { value };
    return value;
  };

  const store: Store<T> = {
    key,
    defaultValue,
    get: read,
    set(value) {
      writeRaw(key, value);
    },
    reset() {
      store.set(defaultValue);
    },
    subscribe(listener) {
      const set = listeners.get(key) ?? new Set();
      set.add(listener);
      listeners.set(key, set);
      return () => {
        set.delete(listener);
      };
    },
  };

  return store;
}

/** 値の型を問わず束ねて扱いたい場面 (設定の入出力・初期化) 向けの見え方。 */
export interface AnyStore {
  readonly key: StorageKey;
  get(): unknown;
  set(value: unknown): void;
  reset(): void;
}

/** すべての設定を消し、既定値へ戻す。 */
export function resetAllStores(stores: readonly AnyStore[]): void {
  for (const store of stores) {
    store.reset();
  }
}
