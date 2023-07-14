import classNames from 'classnames';
import { HTMLAttributes, ReactNode, useState } from 'react';
import { ChartWrapperContext } from '../../contexts';
import { useRect } from '../../hooks';

interface ChartWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function ChartWrapper({ children, className }: ChartWrapperProps) {
  const [container, setContainer] = useState<HTMLDivElement>();
  const rect = useRect(container);

  return (
    <ChartWrapperContext.Provider
      value={{ dimensions: { height: rect?.height ?? 0, width: rect?.width ?? 0 } }}>
      <div
        className={classNames('h-80 overflow-auto rounded-lg bg-white', className)}
        ref={ref => {
          if (ref) {
            setContainer(ref);
            ref.scrollLeft = ref.scrollWidth;
          }
        }}>
        {rect && children}
      </div>
    </ChartWrapperContext.Provider>
  );
}

export default ChartWrapper;
