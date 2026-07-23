import { ChevronRight, HardDrive, ShieldCheck, Zap } from 'lucide-react';
import { Link } from 'react-router';
import { Card, CardContent } from '@/components/ui/card';
import { CONFIG_ROUTES } from '@/config/routes';
import { useI18n } from '@/i18n/context';

const icons = [HardDrive, ShieldCheck, Zap];

export function ConfigIndexPage() {
  const { t, to } = useI18n();

  return (
    <div className="space-y-8">
      <div className="grid gap-3 sm:grid-cols-3">
        {t.configIndex.highlights.map((highlight, index) => {
          const Icon = icons[index] ?? HardDrive;
          return (
            <Card key={highlight.title}>
              <CardContent className="space-y-2">
                <Icon className="size-4 text-primary" />
                <h2 className="font-medium text-sm">{highlight.title}</h2>
                <p className="text-[13px] text-muted-foreground leading-relaxed">
                  {highlight.body}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <ul className="space-y-2">
        {CONFIG_ROUTES.filter((route) => route.path !== '/config').map(
          (route) => {
            const page = t.pages[route.key];
            return (
              <li key={route.path}>
                <Link
                  to={to(route.path)}
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-border-strong hover:bg-muted"
                >
                  <span className="min-w-0">
                    <span className="block font-medium text-sm">
                      {page.title}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-muted-foreground">
                      {page.description}
                    </span>
                  </span>
                  <ChevronRight className="ml-auto size-4 shrink-0 text-muted-foreground" />
                </Link>
              </li>
            );
          },
        )}
      </ul>
    </div>
  );
}
