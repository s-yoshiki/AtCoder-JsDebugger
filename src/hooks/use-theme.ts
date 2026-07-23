import { useCallback, useSyncExternalStore } from 'react';
import { type AppTheme, getTheme, setTheme, subscribeTheme } from '@/lib/theme';

export function useTheme() {
  const theme = useSyncExternalStore(subscribeTheme, getTheme, () => 'light');
  const toggle = useCallback(() => {
    setTheme(getTheme() === 'dark' ? 'light' : 'dark');
  }, []);

  return { theme: theme as AppTheme, setTheme, toggle };
}
