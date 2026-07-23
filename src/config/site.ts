/** 公開先のオリジン。canonical / OGP / sitemap の絶対 URL に使う。 */
export const SITE_ORIGIN = 'https://s-yoshiki.github.io';

/**
 * 配信されるパスの接頭辞 (`/AtCoder-JsDebugger/`)。
 * Vite が `BASE_PATH` からビルド時に埋め込む。
 */
export const BASE_URL: string = import.meta.env.BASE_URL;

export const SITE = {
  repository: 'https://github.com/s-yoshiki/AtCoder-JsDebugger',
  ogImage: 'og.png',
  author: {
    name: 's-yoshiki',
    url: 'https://s-yoshiki.github.io',
    github: 'https://github.com/s-yoshiki',
    blog: 'https://tech-blog.s-yoshiki.com',
  },
} as const;

/** アプリ内パスを、配信先の絶対 URL に変換する。 */
export function absoluteUrl(path: string): string {
  const base = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
  const suffix = path === '/' ? '/' : path;
  return `${SITE_ORIGIN}${base}${suffix}`;
}
