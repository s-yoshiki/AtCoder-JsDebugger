import { RotateCcw, Save } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { CodeEditor } from '@/components/code-editor';
import { Button } from '@/components/ui/button';
import {
  StatusMessage,
  useTransientStatus,
} from '@/components/ui/status-message';
import { useI18n } from '@/i18n/context';
import type { Store } from '@/lib/storage';

interface CodeSettingPageProps {
  store: Store<string>;
  /** エディタの上に出す解説。 */
  children?: ReactNode;
  language?: string;
}

/**
 * 「保存された文字列をエディタで編集する」設定ページの共通形。
 * Snippets / Stdin / Stdout / Stderr がこれを使う。
 */
export function CodeSettingPage({
  store,
  children,
  language = 'javascript',
}: CodeSettingPageProps) {
  const { t } = useI18n();
  const [code, setCode] = useState(() => store.get());
  const [status, setStatus] = useTransientStatus();

  const save = () => {
    store.set(code);
    setStatus({ tone: 'success', text: t.codeSetting.saved });
  };

  const reset = () => {
    store.reset();
    setCode(store.get());
    setStatus({ tone: 'success', text: t.codeSetting.resetDone });
  };

  return (
    <div className="space-y-4">
      {children ? (
        <p className="text-muted-foreground text-sm leading-relaxed">
          {children}
        </p>
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={save}>
          <Save className="size-3.5" />
          {t.codeSetting.save}
        </Button>
        <Button size="sm" variant="outline" onClick={reset}>
          <RotateCcw className="size-3.5" />
          {t.codeSetting.reset}
        </Button>
        <StatusMessage status={status} className="ml-1" />
      </div>

      <div className="h-96 overflow-hidden rounded-xl border border-border bg-card">
        <CodeEditor value={code} onChange={setCode} language={language} />
      </div>
    </div>
  );
}
