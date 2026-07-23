import { useCallback, useSyncExternalStore } from 'react';
import type { Store } from '@/lib/storage';

export type SetStoreValue<T> = (next: T | ((previous: T) => T)) => void;

/** localStorage 上のストアを React の状態として読み書きする。 */
export function useStore<T>(store: Store<T>): [T, SetStoreValue<T>] {
  const value = useSyncExternalStore(
    store.subscribe,
    store.get,
    () => store.defaultValue,
  );

  const setValue = useCallback<SetStoreValue<T>>(
    (next) => {
      store.set(
        typeof next === 'function'
          ? (next as (previous: T) => T)(store.get())
          : next,
      );
    },
    [store],
  );

  return [value, setValue];
}
