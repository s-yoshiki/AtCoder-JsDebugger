import { Check, Copy, Eraser } from 'lucide-react';
import { type ReactNode, useState } from 'react';
import { CodeEditor } from '@/components/code-editor';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/i18n/context';
import { cn } from '@/lib/utils';

interface IoPaneProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  readOnly?: boolean;
  height: number;
  /** ラベル右に出す補足 (実行時間など)。 */
  meta?: ReactNode;
  tone?: 'default' | 'error';
  className?: string;
}

export function IoPane({
  label,
  value,
  onChange,
  onClear,
  readOnly = false,
  height,
  meta,
  tone = 'default',
  className,
}: IoPaneProps) {
  const { t } = useI18n();
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* クリップボードが許可されていない環境では何もしない */
    }
  };

  return (
    <section className={cn('flex min-w-0 flex-col', className)}>
      <div className="flex h-8 items-center gap-2 px-1">
        <h2
          className={cn(
            'font-medium text-xs uppercase tracking-wider',
            tone === 'error' ? 'text-destructive' : 'text-muted-foreground',
          )}
        >
          {label}
        </h2>
        {meta ? (
          <span className="truncate text-[11px] text-muted-foreground">
            {meta}
          </span>
        ) : null}
        <div className="ml-auto flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            onClick={copy}
            disabled={value.length === 0}
            aria-label={t.editor.copy(label)}
          >
            {copied ? (
              <Check className="size-3.5 text-success" />
            ) : (
              <Copy className="size-3.5" />
            )}
          </Button>
          {onChange || onClear ? (
            <Button
              variant="ghost"
              size="icon"
              className="size-7"
              onClick={() => (onClear ? onClear() : onChange?.(''))}
              disabled={value.length === 0}
              aria-label={t.editor.clear(label)}
            >
              <Eraser className="size-3.5" />
            </Button>
          ) : null}
        </div>
      </div>

      <div
        className="overflow-hidden rounded-lg border border-border bg-card"
        style={{ height }}
      >
        <CodeEditor
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          language="plaintext"
          compact
          ariaLabel={label}
        />
      </div>
    </section>
  );
}
