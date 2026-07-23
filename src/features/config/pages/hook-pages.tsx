import { CodeSettingPage } from '@/features/config/code-setting-page';
import { useI18n } from '@/i18n/context';
import {
  snippetsStore,
  stderrHookStore,
  stdinHookStore,
  stdoutHookStore,
} from '@/lib/settings';

export function SnippetsPage() {
  const { t } = useI18n();
  return (
    <CodeSettingPage store={snippetsStore}>{t.hooks.snippets}</CodeSettingPage>
  );
}

export function StdinPage() {
  const { t } = useI18n();
  return (
    <CodeSettingPage store={stdinHookStore}>{t.hooks.stdin}</CodeSettingPage>
  );
}

export function StdoutPage() {
  const { t } = useI18n();
  return (
    <CodeSettingPage store={stdoutHookStore}>{t.hooks.stdout}</CodeSettingPage>
  );
}

export function StderrPage() {
  const { t } = useI18n();
  return (
    <CodeSettingPage store={stderrHookStore}>{t.hooks.stderr}</CodeSettingPage>
  );
}
