import { Check, Copy, Download } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CodeEditor } from '@/components/code-editor';
import { Button } from '@/components/ui/button';
import {
  exportSettings,
  SETTINGS_FILE_NAME,
} from '@/features/config/settings-file';
import { useI18n } from '@/i18n/context';

export function ExportSettingsPage() {
  const { t } = useI18n();
  const json = useMemo(() => exportSettings(), []);
  const [copied, setCopied] = useState(false);

  const download = () => {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = SETTINGS_FILE_NAME;
    link.click();
    URL.revokeObjectURL(url);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(json);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* クリップボードが使えない環境では何もしない */
    }
  };

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm leading-relaxed">
        {t.exportSettings.intro}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={download}>
          <Download className="size-3.5" />
          {t.exportSettings.download}
        </Button>
        <Button size="sm" variant="outline" onClick={copy}>
          {copied ? (
            <Check className="size-3.5 text-success" />
          ) : (
            <Copy className="size-3.5" />
          )}
          {t.exportSettings.copy}
        </Button>
      </div>

      <div className="h-96 overflow-hidden rounded-xl border border-border bg-card">
        <CodeEditor value={json} language="json" readOnly />
      </div>
    </div>
  );
}
