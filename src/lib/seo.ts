import {
  DEFAULT_LOCALE,
  LOCALES,
  type Locale,
  localizePath,
  type PageKey,
  ROUTES,
} from '@/config/routes';
import { absoluteUrl, SITE } from '@/config/site';
import { getDictionary, HTML_LANG } from '@/i18n';

export interface AlternateLink {
  hreflang: string;
  href: string;
}

export interface PageSeo {
  key: PageKey | 'notFound';
  /** ロケール接頭辞込みのアプリ内パス。 */
  path: string;
  lang: string;
  title: string;
  description: string;
  canonical: string;
  ogImage: string;
  alternates: AlternateLink[];
  jsonLd: unknown;
}

function documentTitle(locale: Locale, key: PageKey): string {
  const dictionary = getDictionary(locale);
  const page = dictionary.pages[key];
  return page.documentTitle
    ? key === 'editor'
      ? page.documentTitle
      : `${page.documentTitle} | ${dictionary.siteTitle}`
    : `${page.title} | ${dictionary.siteTitle}`;
}

/**
 * 各ロケールへの hreflang。既定ロケールを `x-default` にも割り当て、
 * 未対応言語からの流入を日本語版へ寄せる。
 */
function alternatesFor(path: string): AlternateLink[] {
  const links = LOCALES.map((locale) => ({
    hreflang: HTML_LANG[locale],
    href: absoluteUrl(localizePath(locale, path)),
  }));
  return [
    ...links,
    {
      hreflang: 'x-default',
      href: absoluteUrl(localizePath(DEFAULT_LOCALE, path)),
    },
  ];
}

function jsonLdFor(locale: Locale, key: PageKey, canonical: string): unknown {
  const dictionary = getDictionary(locale);
  const page = dictionary.pages[key];
  const author = {
    '@type': 'Person',
    name: SITE.author.name,
    url: SITE.author.url,
  };

  if (key === 'editor') {
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: dictionary.siteTitle,
      description: dictionary.siteDescription,
      url: canonical,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Any',
      inLanguage: HTML_LANG[locale],
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'JPY' },
      author,
      codeRepository: SITE.repository,
      license: 'https://opensource.org/licenses/MIT',
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: canonical,
    inLanguage: HTML_LANG[locale],
    isPartOf: {
      '@type': 'WebSite',
      name: dictionary.siteTitle,
      url: absoluteUrl(localizePath(locale, '/')),
    },
    author,
  };
}

export function buildPageSeo(locale: Locale, key: PageKey): PageSeo {
  const route = ROUTES.find((candidate) => candidate.key === key);
  const path = localizePath(locale, route?.path ?? '/');
  const canonical = absoluteUrl(path);
  const dictionary = getDictionary(locale);

  return {
    key,
    path,
    lang: HTML_LANG[locale],
    title: documentTitle(locale, key),
    description: dictionary.pages[key].description,
    canonical,
    ogImage: absoluteUrl(`/${SITE.ogImage}`),
    alternates: alternatesFor(route?.path ?? '/'),
    jsonLd: jsonLdFor(locale, key, canonical),
  };
}

/** 静的化 (prerender / sitemap) の対象となる全ページ。 */
export function allPageSeo(): PageSeo[] {
  return LOCALES.flatMap((locale) =>
    ROUTES.map((route) => buildPageSeo(locale, route.key)),
  );
}

/** 見つからないパス向け。インデックスさせない。 */
export function notFoundSeo(locale: Locale = DEFAULT_LOCALE): PageSeo {
  const dictionary = getDictionary(locale);
  return {
    key: 'notFound',
    path: localizePath(locale, '/404'),
    lang: HTML_LANG[locale],
    title: `${dictionary.notFound.documentTitle} | ${dictionary.siteTitle}`,
    description: dictionary.siteDescription,
    canonical: absoluteUrl(localizePath(locale, '/')),
    ogImage: absoluteUrl(`/${SITE.ogImage}`),
    alternates: [],
    jsonLd: null,
  };
}
