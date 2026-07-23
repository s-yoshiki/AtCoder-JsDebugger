import type { Locale } from '@/config/routes';
import { en } from './en';
import { type Dictionary, ja } from './ja';

export type { Dictionary, PageMeta } from './ja';

export const dictionaries: Record<Locale, Dictionary> = { ja, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** `<html lang>` と hreflang に使う BCP 47 タグ。 */
export const HTML_LANG: Record<Locale, string> = {
  ja: 'ja',
  en: 'en',
};
