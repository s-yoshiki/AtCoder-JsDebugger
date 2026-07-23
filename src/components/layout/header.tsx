import { Code2, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { GithubIcon } from '@/components/icons/github';
import { Button } from '@/components/ui/button';
import { parseLocalePath } from '@/config/routes';
import { SITE } from '@/config/site';
import { useI18n } from '@/i18n/context';
import { LanguageSwitcher } from './language-switcher';
import { ThemeToggle } from './theme-toggle';

export function Header() {
  const { t, to } = useI18n();
  const { pathname } = useLocation();
  const { path } = parseLocalePath(pathname);

  const navItems = [
    { path: '/', label: t.header.editor, icon: Code2 },
    { path: '/config', label: t.header.config, icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 shrink-0 border-border border-b bg-background/85 backdrop-blur-md">
      <div className="flex h-(--header-height) items-center gap-3 px-4 sm:px-6">
        <Link
          to={to('/')}
          className="flex shrink-0 items-center gap-2.5 rounded-lg font-semibold tracking-tight"
        >
          <span className="grid size-7 place-items-center rounded-lg bg-primary font-mono text-[11px] text-primary-foreground">
            TS
          </span>
          <span className="truncate text-sm">{t.siteTitle}</span>
        </Link>

        <nav
          className="ml-auto flex items-center gap-0.5"
          aria-label={t.header.nav}
        >
          {navItems.map((item) => {
            const isCurrent =
              item.path === '/' ? path === '/' : path.startsWith(item.path);
            const Icon = item.icon;
            return (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                asChild
                className={isCurrent ? 'text-foreground' : undefined}
              >
                <Link
                  to={to(item.path)}
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  <Icon className="size-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              </Button>
            );
          })}
          <ThemeToggle />
          <Button variant="ghost" size="icon" asChild>
            <a
              href={SITE.repository}
              target="_blank"
              rel="noreferrer"
              aria-label={t.header.github}
            >
              <GithubIcon className="size-4" />
            </a>
          </Button>
          <LanguageSwitcher />
        </nav>
      </div>
    </header>
  );
}
