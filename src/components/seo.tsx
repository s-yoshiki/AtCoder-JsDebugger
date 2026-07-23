import { useEffect } from 'react';
import type { PageSeo } from '@/lib/seo';

/**
 * ビルド時に埋め込んだ head を、クライアント遷移でも同じ内容に保つ。
 * prerender した HTML と同じタグを書き換えるので、初回表示では実質何もしない。
 */
function upsertMeta(
  selector: string,
  attributes: Record<string, string>,
): void {
  let element = document.head.querySelector<HTMLElement>(selector);
  if (!element) {
    const tag = selector.startsWith('link') ? 'link' : 'meta';
    element = document.createElement(tag);
    document.head.appendChild(element);
  }
  for (const [name, value] of Object.entries(attributes)) {
    element.setAttribute(name, value);
  }
}

export function Seo({
  seo,
  noIndex = false,
}: {
  seo: PageSeo;
  noIndex?: boolean;
}) {
  useEffect(() => {
    document.title = seo.title;
    document.documentElement.lang = seo.lang;

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: seo.description,
    });
    upsertMeta('link[rel="canonical"]', {
      rel: 'canonical',
      href: seo.canonical,
    });
    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: seo.title,
    });
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: seo.description,
    });
    upsertMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: seo.canonical,
    });
    upsertMeta('meta[property="og:locale"]', {
      property: 'og:locale',
      content: seo.lang === 'ja' ? 'ja_JP' : 'en_US',
    });

    // hreflang はページごとに数が変わるので、毎回入れ替える。
    for (const link of document.head.querySelectorAll(
      'link[rel="alternate"][hreflang]',
    )) {
      link.remove();
    }
    for (const alternate of seo.alternates) {
      const link = document.createElement('link');
      link.rel = 'alternate';
      link.hreflang = alternate.hreflang;
      link.href = alternate.href;
      document.head.appendChild(link);
    }

    const robots = document.head.querySelector('meta[name="robots"]');
    if (noIndex) {
      upsertMeta('meta[name="robots"]', {
        name: 'robots',
        content: 'noindex, follow',
      });
    } else {
      robots?.remove();
    }
  }, [seo, noIndex]);

  return null;
}
