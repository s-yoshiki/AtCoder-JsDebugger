import {
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  useCallback,
  useRef,
  useState,
} from 'react';

interface SplitPaneOptions {
  /** 左ペインの初期幅 (%)。 */
  initial?: number;
  min?: number;
  max?: number;
}

/**
 * 横並びのペインをドラッグでリサイズする。
 * ポインタキャプチャを使うので、カーソルがエディタ上に乗っても追従する。
 */
export function useSplitPane({
  initial = 56,
  min = 25,
  max = 80,
}: SplitPaneOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState(initial);
  const [isDragging, setIsDragging] = useState(false);

  const clamp = useCallback(
    (value: number) => Math.min(max, Math.max(min, value)),
    [min, max],
  );

  const onPointerDown = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  }, []);

  const onPointerMove = useCallback(
    (event: ReactPointerEvent<HTMLElement>) => {
      if (!isDragging || !containerRef.current) {
        return;
      }
      const rect = containerRef.current.getBoundingClientRect();
      setRatio(clamp(((event.clientX - rect.left) / rect.width) * 100));
    },
    [isDragging, clamp],
  );

  const onPointerUp = useCallback((event: ReactPointerEvent<HTMLElement>) => {
    event.currentTarget.releasePointerCapture(event.pointerId);
    setIsDragging(false);
  }, []);

  /** キーボードでも幅を変えられるようにする。 */
  const onKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setRatio((current) => clamp(current - 2));
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        setRatio((current) => clamp(current + 2));
      }
    },
    [clamp],
  );

  return {
    containerRef,
    ratio,
    isDragging,
    handleProps: {
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onKeyDown,
      role: 'separator' as const,
      'aria-orientation': 'vertical' as const,
      'aria-valuenow': Math.round(ratio),
      'aria-valuemin': min,
      'aria-valuemax': max,
      tabIndex: 0,
    },
  };
}
