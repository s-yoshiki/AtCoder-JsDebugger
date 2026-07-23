import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/icons/github';
import { Card, CardContent } from '@/components/ui/card';
import { SITE } from '@/config/site';
import { useI18n } from '@/i18n/context';

export function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="space-y-8">
      <p className="text-muted-foreground text-sm leading-relaxed">
        {t.siteDescription} {t.about.lead}
      </p>

      <section>
        <h2 className="font-semibold text-lg tracking-tight">
          {t.about.shortcutsHeading}
        </h2>
        <dl className="mt-3 divide-y divide-border rounded-xl border border-border bg-card">
          {t.about.shortcuts.map((shortcut) => (
            <div
              key={shortcut.keys}
              className="flex items-center justify-between gap-4 px-4 py-3"
            >
              <dt className="text-muted-foreground text-sm">
                {shortcut.description}
              </dt>
              <dd>
                <kbd className="rounded border border-border bg-muted px-2 py-1 font-mono text-xs">
                  {shortcut.keys}
                </kbd>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section>
        <h2 className="font-semibold text-lg tracking-tight">
          {t.about.environmentHeading}
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {t.about.environment.map((item) => (
            <Card key={item.title}>
              <CardContent>
                <h3 className="font-medium text-sm">{item.title}</h3>
                <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
                  {item.body}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="font-semibold text-lg tracking-tight">
          {t.about.linksHeading}
        </h2>
        <ul className="mt-3 space-y-2 text-sm">
          <li>
            <a
              href={SITE.repository}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <GithubIcon className="size-4" />
              {SITE.repository}
            </a>
          </li>
          <li>
            <a
              href={SITE.author.blog}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:underline"
            >
              <ExternalLink className="size-4" />
              {t.about.blogLabel}
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}
