import { useMemo } from 'react';
import { Link, Outlet, useLocation } from 'react-router';
import { Seo } from '@/components/seo';
import { CONFIG_ROUTES, parseLocalePath } from '@/config/routes';
import { useI18n } from '@/i18n/context';
import { buildPageSeo } from '@/lib/seo';
import { cn } from '@/lib/utils';

export function ConfigLayout() {
  const { locale, t, to } = useI18n();
  const { pathname } = useLocation();
  const { path } = parseLocalePath(pathname);
  const normalized = path.replace(/\/$/, '') || '/config';

  const current =
    CONFIG_ROUTES.find((route) => route.path === normalized) ??
    CONFIG_ROUTES[0];
  const key = current?.key ?? 'config';
  const seo = useMemo(() => buildPageSeo(locale, key), [locale, key]);
  const page = t.pages[key];

  return (
    <>
      <Seo seo={seo} />
      <div className="flex min-h-0 flex-1 flex-col md:flex-row">
        <nav
          aria-label={t.header.config}
          className="shrink-0 overflow-y-auto border-border border-b bg-card p-3 md:w-72 md:border-r md:border-b-0"
        >
          <ul className="flex gap-2 overflow-x-auto md:block md:space-y-1 md:overflow-visible">
            {CONFIG_ROUTES.map((route) => {
              const isCurrent = route.path === normalized;
              const item = t.pages[route.key];
              return (
                <li key={route.path} className="shrink-0 md:shrink">
                  <Link
                    to={to(route.path)}
                    aria-current={isCurrent ? 'page' : undefined}
                    className={cn(
                      'block rounded-lg px-3 py-2 text-sm transition-colors',
                      isCurrent
                        ? 'bg-accent text-accent-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                    )}
                  >
                    <span className="font-medium">{item.title}</span>
                    <span className="mt-0.5 hidden text-[12px] text-muted-foreground leading-snug md:block">
                      {item.description}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
            <header className="border-border border-b pb-5">
              <h1 className="font-semibold text-2xl tracking-tight">
                {page.title}
              </h1>
              <p className="mt-1.5 text-muted-foreground text-sm">
                {page.description}
              </p>
            </header>
            <div className="pt-6 pb-16">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
