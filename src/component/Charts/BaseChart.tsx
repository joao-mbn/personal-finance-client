import { ReactNode } from 'react';

type BaseChartProps = {
  height: number;
  width: number;
  boundsWidth: number;
  boundsHeight: number;
  children: ReactNode;
};

export function BaseChart({
  height = 304,
  width,
  boundsWidth,
  boundsHeight,
  children,
}: BaseChartProps) {
  return (
    <div>
      <svg
        height={height}
        rx={6}
        width={width}>
        <g
          className="translate-x-2 translate-y-5"
          height={boundsHeight}
          width={boundsWidth}>
          {children}
        </g>
      </svg>
    </div>
  );
}
