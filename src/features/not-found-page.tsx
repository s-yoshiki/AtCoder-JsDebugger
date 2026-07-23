import { useMemo } from 'react';
import { Link } from 'react-router';
import { Seo } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/context';
import { notFoundSeo } from '@/lib/seo';

export function NotFoundPage() {
  const { locale, t, to } = useI18n();
  const seo = useMemo(() => notFoundSeo(locale), [locale]);

  return (
    <>
      <Seo seo={seo} noIndex />
      <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
        <p className="font-mono text-5xl text-muted-foreground">404</p>
        <h1 className="font-semibold text-xl tracking-tight">
          {t.notFound.title}
        </h1>
        <Button asChild variant="outline" size="sm">
          <Link to={to('/')}>{t.notFound.back}</Link>
        </Button>
      </div>
    </>
  );
}
