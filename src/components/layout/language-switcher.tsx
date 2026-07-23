import { Languages } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { Button } from '@/components/ui/button';
import { LOCALES, localizePath, parseLocalePath } from '@/config/routes';
import { getDictionary } from '@/i18n';
import { useI18n } from '@/i18n/context';
import { cn } from '@/lib/utils';

/**
 * 表示中のページの別言語版へのリンク。
 * URL がロケールの正となるため、切り替えは単なるページ遷移になる。
 */
export function LanguageSwitcher() {
  const { locale, t } = useI18n();
  const { pathname } = useLocation();
  const { path } = parseLocalePath(pathname);

  return (
    <nav
      className="ml-1 flex items-center gap-1 rounded-lg border border-border p-0.5"
      aria-label={t.header.language}
    >
      <Languages
        className="ml-1 size-3.5 shrink-0 text-muted-foreground"
        aria-hidden="true"
      />
      {LOCALES.map((candidate) => {
        const isCurrent = candidate === locale;
        return (
          <Button
            key={candidate}
            variant="ghost"
            size="sm"
            asChild
            className={cn(
              'h-6 px-1.5 text-[11px] uppercase',
              isCurrent && 'bg-muted text-foreground',
            )}
          >
            <Link
              to={localizePath(candidate, path)}
              hrefLang={candidate}
              aria-current={isCurrent ? 'true' : undefined}
              title={getDictionary(candidate).localeName}
            >
              {candidate}
            </Link>
          </Button>
        );
      })}
    </nav>
  );
}
