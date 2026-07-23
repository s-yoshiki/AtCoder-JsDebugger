import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * ビルド済みのクライアント HTML を雛形に、ルートごとの静的ページを書き出す。
 *
 * SPA のままだと GitHub Pages では `/config` のような URL が 404 になり、
 * クローラーにも空の <div id="root"> しか届かない。ここで各ルートを
 * 実ファイルとして出しておくことで、その両方を解決する。
 */

const root = resolve(import.meta.dirname, '..');
const distDir = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const template = await readFile(join(distDir, 'index.html'), 'utf8');
const server = await import(
  pathToFileURL(join(ssrDir, 'entry-server.js')).href
);

const pages = server.getPages();

for (const page of pages) {
  const html = template
    .replace('<html lang="ja">', `<html lang="${page.lang}">`)
    // 雛形の <title> は各ページの head に含まれるものへ置き換える。
    .replace(/<title>.*?<\/title>\s*/s, '')
    .replace('<!--app-head-->', page.head)
    .replace('<!--app-html-->', page.body);

  const outPath = join(distDir, page.outFile);
  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, html, 'utf8');
}

await writeFile(join(distDir, 'robots.txt'), server.renderRobotsTxt(), 'utf8');
await writeFile(
  join(distDir, 'sitemap.xml'),
  server.renderSitemap(pages),
  'utf8',
);

// SSR バンドルは成果物ではないので残さない。
await rm(ssrDir, { recursive: true, force: true });

const sitemapCount = pages.filter((page) => page.sitemap).length;
console.log(
  `prerendered ${pages.length} pages (${sitemapCount} in sitemap.xml)`,
);
