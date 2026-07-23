import { lazy, Suspense, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  language?: string;
  readOnly?: boolean;
  /** 行番号・ミニマップを畳んだ、入出力ペイン向けの軽い見た目。 */
  compact?: boolean;
  className?: string;
  ariaLabel?: string;
}

const MonacoCodeEditor = lazy(() => import('./monaco-code-editor'));

/**
 * Monaco は `document` を前提にしていて数 MB あるので、
 * マウント後に初めて読み込む。それまでは同じ位置に素の <pre> を出す。
 *
 * この <pre> は prerender した HTML にも出るため、
 * JavaScript を実行しないクローラーにもコードが読める。
 */
function EditorFallback({
  value,
  compact,
}: Pick<CodeEditorProps, 'value' | 'compact'>) {
  return (
    <pre
      className={cn(
        'h-full w-full overflow-auto whitespace-pre bg-card font-mono text-muted-foreground',
        compact ? 'px-3 py-1.5 text-[13px]' : 'px-4 py-3 text-sm',
      )}
    >
      {value}
    </pre>
  );
}

export function CodeEditor({ className, ...props }: CodeEditorProps) {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      {isMounted ? (
        <Suspense fallback={<EditorFallback {...props} />}>
          <MonacoCodeEditor {...props} />
        </Suspense>
      ) : (
        <EditorFallback {...props} />
      )}
    </div>
  );
}
