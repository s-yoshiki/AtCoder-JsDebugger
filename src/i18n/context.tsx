import { createContext, type ReactNode, useContext, useMemo } from 'react';
import { DEFAULT_LOCALE, type Locale, localizePath } from '@/config/routes';
import { type Dictionary, getDictionary } from './index';

const LocaleContext = createContext<Locale>(DEFAULT_LOCALE);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export interface I18n {
  locale: Locale;
  /** 現在のロケールの文言。 */
  t: Dictionary;
  /** ロケール接頭辞を付けたアプリ内パスを返す。 */
  to: (path: string) => string;
}

export function useI18n(): I18n {
  const locale = useContext(LocaleContext);
  return useMemo(
    () => ({
      locale,
      t: getDictionary(locale),
      to: (path: string) => localizePath(locale, path),
    }),
    [locale],
  );
}
