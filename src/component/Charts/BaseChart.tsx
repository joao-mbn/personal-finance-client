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
        className="fill-current text-slate-600"
        width={width}
        height={height}
        rx={6}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          className="translate-x-2 translate-y-5">
          {children}
        </g>
      </svg>
    </div>
  );
}
