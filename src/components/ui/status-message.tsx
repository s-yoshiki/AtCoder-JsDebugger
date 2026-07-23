import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export interface Status {
  tone: 'success' | 'error';
  text: string;
}

export function StatusMessage({
  status,
  className,
}: {
  status: Status | null;
  className?: string;
}) {
  if (!status) {
    return null;
  }
  const Icon = status.tone === 'success' ? CheckCircle2 : AlertCircle;
  return (
    <p
      role="status"
      className={cn(
        'inline-flex items-center gap-1.5 text-[13px]',
        status.tone === 'success' ? 'text-success' : 'text-destructive',
        className,
      )}
    >
      <Icon className="size-4" />
      {status.text}
    </p>
  );
}

/** 数秒で自動的に消える保存メッセージ。 */
export function useTransientStatus(timeoutMs = 3000) {
  const [status, setStatus] = useState<Status | null>(null);

  useEffect(() => {
    if (!status) {
      return;
    }
    const timer = setTimeout(() => setStatus(null), timeoutMs);
    return () => clearTimeout(timer);
  }, [status, timeoutMs]);

  return [status, setStatus] as const;
}
