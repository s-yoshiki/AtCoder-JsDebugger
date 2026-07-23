import { cn } from '@/lib/utils';

interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  id?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
  disabled?: boolean;
  className?: string;
}

/** ネイティブの checkbox を土台にした、テーマ準拠のトグル。 */
export function Switch({
  checked,
  onCheckedChange,
  className,
  disabled,
  ...props
}: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        'inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-transparent transition-colors disabled:opacity-50',
        checked ? 'bg-primary' : 'bg-border-strong',
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          'pointer-events-none size-5 rounded-full bg-white shadow-sm transition-transform',
          checked ? 'translate-x-[22px]' : 'translate-x-0.5',
        )}
      />
    </button>
  );
}
