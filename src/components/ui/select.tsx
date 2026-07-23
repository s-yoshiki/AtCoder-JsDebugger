import { ChevronDown } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';

/** ネイティブ `<select>` にテーマの見た目を被せたもの。 */
const Select = React.forwardRef<
  HTMLSelectElement,
  React.ComponentProps<'select'>
>(({ className, children, ...props }, ref) => (
  <div className="relative inline-flex w-full">
    <select
      ref={ref}
      className={cn(
        'h-9 w-full appearance-none rounded-lg border border-input bg-card py-0 pr-9 pl-3 text-foreground text-sm outline-none transition-colors hover:border-border-strong disabled:opacity-50',
        className,
      )}
      {...props}
    >
      {children}
    </select>
    <ChevronDown className="pointer-events-none absolute top-2.5 right-3 size-4 text-muted-foreground" />
  </div>
));
Select.displayName = 'Select';

export { Select };
