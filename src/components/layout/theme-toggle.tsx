import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/hooks/use-theme';
import { useI18n } from '@/i18n/context';

export function ThemeToggle() {
  const { t } = useI18n();
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggle}
      aria-label={isDark ? t.header.toLight : t.header.toDark}
      aria-pressed={isDark}
    >
      {/* CSS で出し分けるので、初期描画でもテーマとずれない。 */}
      <Sun className="size-4 dark:hidden" />
      <Moon className="hidden size-4 dark:block" />
    </Button>
  );
}
