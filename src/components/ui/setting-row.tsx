import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SettingRowProps {
  title: string;
  description?: ReactNode;
  control: ReactNode;
  /** 右側のコントロール幅。select と switch で見え方を揃えるために使う。 */
  controlClassName?: string;
}

export function SettingRow({
  title,
  description,
  control,
  controlClassName,
}: SettingRowProps) {
  return (
    <div className="flex items-start justify-between gap-6 border-border border-b py-5 last:border-b-0">
      <div className="min-w-0">
        <h3 className="font-medium text-foreground text-sm">{title}</h3>
        {description ? (
          <p className="mt-1 text-muted-foreground text-[13px] leading-relaxed">
            {description}
          </p>
        ) : null}
      </div>
      <div className={cn('flex shrink-0 justify-end', controlClassName)}>
        {control}
      </div>
    </div>
  );
}
