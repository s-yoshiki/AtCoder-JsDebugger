import { renderToStaticMarkup } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { App } from './app';
import { ROUTES } from './config/routes';
import { BASE_URL, SITE_ORIGIN } from './config/site';
import { allPageSeo, notFoundSeo, type PageSeo } from './lib/seo';

export { BASE_URL, SITE_ORIGIN };

export interface PrerenderPage {
  /** dist からの相対パス。 */
  outFile: string;
  /** <html lang>。 */
  lang: string;
  /** </head> の直前に差し込む HTML。 */
  head: string;
  /** #root の中身。 */
  body: string;
  /** sitemap.xml 用。noIndex のページは null。 */
  sitemap: {
    loc: string;
    priority: number;
    alternates: { hreflang: string; href: string }[];
  } | null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/** アプリ内パスを、配信されるパス (base 込み) に変換する。 */
function withBase(path: string): string {
  const base = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
  return path === '/' ? `${base}/` : `${base}${path}`;
}

function renderHead(seo: PageSeo, noIndex: boolean): string {
  const tags = [
    `<title>${escapeHtml(seo.title)}</title>`,
    `<meta name="description" content="${escapeHtml(seo.description)}" />`,
    `<link rel="canonical" href="${seo.canonical}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="AtCoder-JsDebugger" />`,
    `<meta property="og:title" content="${escapeHtml(seo.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(seo.description)}" />`,
    `<meta property="og:url" content="${seo.canonical}" />`,
    `<meta property="og:image" content="${seo.ogImage}" />`,
    `<meta property="og:locale" content="${seo.lang === 'ja' ? 'ja_JP' : 'en_US'}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escapeHtml(seo.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(seo.description)}" />`,
    `<meta name="twitter:image" content="${seo.ogImage}" />`,
  ];

  for (const alternate of seo.alternates) {
    tags.push(
      `<link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}" />`,
    );
  }

  if (noIndex) {
    tags.push(`<meta name="robots" content="noindex, follow" />`);
  }

  if (seo.jsonLd) {
    // </script> と < を潰しておかないと、HTML のパースが壊れる。
    const json = JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c');
    tags.push(`<script type="application/ld+json">${json}</script>`);
  }

  return tags.join('\n    ');
}

function renderBody(path: string): string {
  return renderToStaticMarkup(
    <StaticRouter basename={BASE_URL} location={withBase(path)}>
      <App />
    </StaticRouter>,
  );
}

/** アプリ内パスから、出力先のファイル名を決める。 */
function outFileFor(path: string): string {
  return path === '/' ? 'index.html' : `${path.replace(/^\//, '')}/index.html`;
}

export function getPages(): PrerenderPage[] {
  const pages: PrerenderPage[] = allPageSeo().map((seo) => {
    const route = ROUTES.find((candidate) => candidate.key === seo.key);
    return {
      outFile: outFileFor(seo.path),
      lang: seo.lang,
      head: renderHead(seo, false),
      body: renderBody(seo.path),
      sitemap: {
        loc: seo.canonical,
        priority: route?.priority ?? 0.5,
        // x-default は sitemap では重複になるので落とす。
        alternates: seo.alternates.filter(
          (alternate) => alternate.hreflang !== 'x-default',
        ),
      },
    } satisfies PrerenderPage;
  });

  const missing = notFoundSeo();
  pages.push({
    outFile: '404.html',
    lang: missing.lang,
    head: renderHead(missing, true),
    body: renderBody('/__not-found__'),
    sitemap: null,
  });

  return pages;
}

export function renderRobotsTxt(): string {
  const base = BASE_URL.endsWith('/') ? BASE_URL.slice(0, -1) : BASE_URL;
  return [
    'User-agent: *',
    'Allow: /',
    '',
    `Sitemap: ${SITE_ORIGIN}${base}/sitemap.xml`,
    '',
  ].join('\n');
}

export function renderSitemap(pages: PrerenderPage[]): string {
  const today = new Date().toISOString().slice(0, 10);

  const urls = pages.flatMap((page) => {
    if (!page.sitemap) {
      return [];
    }
    const { loc, priority, alternates } = page.sitemap;
    return [
      [
        '  <url>',
        `    <loc>${loc}</loc>`,
        ...alternates.map(
          (alternate) =>
            `    <xhtml:link rel="alternate" hreflang="${alternate.hreflang}" href="${alternate.href}" />`,
        ),
        `    <lastmod>${today}</lastmod>`,
        `    <priority>${priority.toFixed(1)}</priority>`,
        '  </url>',
      ].join('\n'),
    ];
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}
