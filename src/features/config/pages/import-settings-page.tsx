import { FolderOpen, Save } from 'lucide-react';
import { useRef, useState } from 'react';
import { CodeEditor } from '@/components/code-editor';
import { Button } from '@/components/ui/button';
import {
  StatusMessage,
  useTransientStatus,
} from '@/components/ui/status-message';
import { ImportError, importSettings } from '@/features/config/settings-file';
import { useI18n } from '@/i18n/context';

export function ImportSettingsPage() {
  const { t } = useI18n();
  const [json, setJson] = useState('{}');
  const [status, setStatus] = useTransientStatus(5000);
  const fileInput = useRef<HTMLInputElement>(null);

  const save = () => {
    try {
      const applied = importSettings(json);
      setStatus({ tone: 'success', text: t.importSettings.applied(applied) });
    } catch (error) {
      setStatus({
        tone: 'error',
        text:
          error instanceof ImportError
            ? t.importSettings.errors[error.code]
            : String(error),
      });
    }
  };

  const openFile = async (file: File | undefined) => {
    if (!file) {
      return;
    }
    setJson(await file.text());
  };

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground text-sm leading-relaxed">
        {t.importSettings.intro}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={save}>
          <Save className="size-3.5" />
          {t.importSettings.save}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => fileInput.current?.click()}
        >
          <FolderOpen className="size-3.5" />
          {t.importSettings.chooseFile}
        </Button>
        <input
          ref={fileInput}
          type="file"
          accept="application/json,.json"
          className="hidden"
          onChange={(event) => void openFile(event.target.files?.[0])}
        />
        <StatusMessage status={status} className="ml-1" />
      </div>

      <div className="h-96 overflow-hidden rounded-xl border border-border bg-card">
        <CodeEditor value={json} onChange={setJson} language="json" />
      </div>
    </div>
  );
}
