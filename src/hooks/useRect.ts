import { useEffect, useState } from 'react';

export function useRect(node?: HTMLElement | null) {
  const [rect, setRect] = useState<DOMRect>();

  useEffect(() => {
    if (!node) return;

    const observer = new ResizeObserver(entries => {
      setRect(entries[0].contentRect);
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, [node]);

  return rect;
}
