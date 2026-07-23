export const THEME_STORAGE_KEY = 'theme';

export type AppTheme = 'light' | 'dark';

const listeners = new Set<() => void>();

/**
 * 実際に適用されているテーマ。真実は `<html>` のクラスなので、
 * 初回描画前に走る index.html のスクリプトと食い違わない。
 */
export function getTheme(): AppTheme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
}

export function setTheme(theme: AppTheme): void {
  const isDark = theme === 'dark';
  document.documentElement.classList.toggle('dark', isDark);
  document.documentElement.style.colorScheme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* 保存できなくても、このセッションの表示には反映されている */
  }
  for (const listener of listeners) {
    listener();
  }
}

export function subscribeTheme(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}
