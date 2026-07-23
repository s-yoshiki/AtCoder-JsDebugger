import type { ReactNode } from 'react';
import { Outlet, Route, Routes } from 'react-router';
import { Header } from '@/components/layout/header';
import { DEFAULT_LOCALE, LOCALES, type Locale } from '@/config/routes';
import { ConfigLayout } from '@/features/config/config-layout';
import { AboutPage } from '@/features/config/pages/about-page';
import { EditorSettingsPage } from '@/features/config/pages/editor-settings-page';
import { ExportSettingsPage } from '@/features/config/pages/export-settings-page';
import {
  SnippetsPage,
  StderrPage,
  StdinPage,
  StdoutPage,
} from '@/features/config/pages/hook-pages';
import { ImportSettingsPage } from '@/features/config/pages/import-settings-page';
import { ConfigIndexPage } from '@/features/config/pages/index-page';
import { EditorPage } from '@/features/editor/editor-page';
import { NotFoundPage } from '@/features/not-found-page';
import { LocaleProvider } from '@/i18n/context';

function LocaleLayout({
  locale,
  children,
}: {
  locale: Locale;
  children?: ReactNode;
}) {
  return (
    <LocaleProvider locale={locale}>
      <div className="flex h-full flex-col">
        <Header />
        {children ?? <Outlet />}
      </div>
    </LocaleProvider>
  );
}

/** ロケールごとに同じ構成を生やす。既定ロケールだけ接頭辞を持たない。 */
function localeRoutes(locale: Locale) {
  return (
    <Route
      key={locale}
      path={locale === DEFAULT_LOCALE ? '/' : `/${locale}`}
      element={<LocaleLayout locale={locale} />}
    >
      <Route index element={<EditorPage />} />
      <Route path="config" element={<ConfigLayout />}>
        <Route index element={<ConfigIndexPage />} />
        <Route path="editor-settings" element={<EditorSettingsPage />} />
        <Route path="snippets" element={<SnippetsPage />} />
        <Route path="stdin" element={<StdinPage />} />
        <Route path="stdout" element={<StdoutPage />} />
        <Route path="stderr" element={<StderrPage />} />
        <Route path="import-settings" element={<ImportSettingsPage />} />
        <Route path="export-settings" element={<ExportSettingsPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Route>
  );
}

export function App() {
  return (
    <Routes>
      {LOCALES.map((locale) => localeRoutes(locale))}
      <Route
        path="*"
        element={
          <LocaleLayout locale={DEFAULT_LOCALE}>
            <NotFoundPage />
          </LocaleLayout>
        }
      />
    </Routes>
  );
}
