import { ReactNode, useEffect, useRef } from 'react';

interface ChartWrapperProps {
  children?: ReactNode;
  data: unknown;
}

export function ChartWrapper({ children, data }: ChartWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.scrollLeft = containerRef.current.scrollWidth;
  }, [data]);

  return (
    <div
      className="h-80 overflow-auto rounded-lg bg-slate-200"
      ref={containerRef}>
      {children}
    </div>
  );
}
