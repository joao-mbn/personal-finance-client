import { ReactNode, useEffect, useState } from 'react';
import { ChartWrapperContext } from '../../context';
import { useRect } from '../../hooks';

interface ChartWrapperProps {
  children?: ReactNode;
  data: unknown;
}

export function ChartWrapper({ children, data }: ChartWrapperProps) {
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  const rect = useRect(containerRef);
  useEffect(() => {
    if (!containerRef) return;

    containerRef.scrollLeft = containerRef.scrollWidth;
  }, [data, containerRef]);

  return (
    <ChartWrapperContext.Provider
      value={{ dimensions: { height: rect?.height ?? 0, width: rect?.width ?? 0 } }}>
      <div
        className="h-80 overflow-auto rounded-lg bg-slate-200"
        ref={setContainerRef}>
        {children}
      </div>
    </ChartWrapperContext.Provider>
  );
}
