export const LOCALES = ['ja', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

/** 接頭辞を持たない既定のロケール。 */
export const DEFAULT_LOCALE: Locale = 'ja';

export const PAGE_KEYS = [
  'editor',
  'config',
  'editorSettings',
  'about',
] as const;
export type PageKey = (typeof PAGE_KEYS)[number];

export interface RouteDef {
  key: PageKey;
  /** ロケール接頭辞を除いたパス。 */
  path: string;
  /** sitemap.xml の優先度。 */
  priority: number;
}

export const ROUTES: readonly RouteDef[] = [
  { key: 'editor', path: '/', priority: 1.0 },
  { key: 'config', path: '/config', priority: 0.6 },
  { key: 'editorSettings', path: '/config/editor-settings', priority: 0.5 },
  { key: 'about', path: '/config/about', priority: 0.7 },
];

/** 設定画面のサイドバーに並ぶページ。 */
export const CONFIG_ROUTES = ROUTES.filter((route) =>
  route.path.startsWith('/config'),
);

/** ロケール接頭辞を付けたアプリ内パスを返す (`/config` → `/en/config`)。 */
export function localizePath(locale: Locale, path: string): string {
  if (locale === DEFAULT_LOCALE) {
    return path;
  }
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

/** `localizePath` の逆。ロケールと接頭辞なしパスに分解する。 */
export function parseLocalePath(pathname: string): {
  locale: Locale;
  path: string;
} {
  for (const locale of LOCALES) {
    if (locale === DEFAULT_LOCALE) {
      continue;
    }
    if (pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)) {
      return { locale, path: pathname.slice(locale.length + 1) || '/' };
    }
  }
  return { locale: DEFAULT_LOCALE, path: pathname || '/' };
}
