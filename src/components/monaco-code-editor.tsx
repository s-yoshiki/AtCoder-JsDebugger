import Editor from '@monaco-editor/react';
import { Loader2 } from 'lucide-react';
import { useCallback } from 'react';
import type { CodeEditorProps } from '@/components/code-editor';
import { useStore } from '@/hooks/use-store';
import { useTheme } from '@/hooks/use-theme';
import { resolveMonacoTheme } from '@/lib/monaco';
import { editorSettingsStore } from '@/lib/settings';

/**
 * 実際に Monaco を描画する部分。`code-editor.tsx` から遅延読み込みされるので、
 * このモジュール (と `@/lib/monaco`) は初期バンドルに入らない。
 */
export default function MonacoCodeEditor({
  value,
  onChange,
  language = 'javascript',
  readOnly = false,
  compact = false,
  ariaLabel,
}: CodeEditorProps) {
  const [settings] = useStore(editorSettingsStore);
  const { theme } = useTheme();

  const handleChange = useCallback(
    (next: string | undefined) => onChange?.(next ?? ''),
    [onChange],
  );

  return (
    <Editor
      value={value}
      onChange={handleChange}
      language={language}
      theme={resolveMonacoTheme(settings.theme, theme)}
      loading={
        <Loader2 className="size-5 animate-spin text-muted-foreground" />
      }
      options={{
        // Monaco が内部で使う textarea にそのまま付く。
        ariaLabel,
        readOnly,
        fontSize: compact ? settings.fontSize - 1 : settings.fontSize,
        fontFamily: 'var(--font-mono-stack)',
        minimap: { enabled: settings.minimap && !compact },
        wordWrap: settings.wordWrap ? 'on' : 'off',
        lineNumbers: compact ? 'off' : 'on',
        folding: !compact,
        glyphMargin: false,
        lineDecorationsWidth: compact ? 8 : 12,
        lineNumbersMinChars: 3,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        smoothScrolling: true,
        renderLineHighlight: compact ? 'none' : 'line',
        padding: { top: compact ? 6 : 12, bottom: compact ? 6 : 12 },
        scrollbar: {
          verticalScrollbarSize: 10,
          horizontalScrollbarSize: 10,
          alwaysConsumeMouseWheel: false,
        },
        tabSize: 2,
      }}
    />
  );
}
