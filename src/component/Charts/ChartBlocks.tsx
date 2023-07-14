import classNames from 'classnames';
import { ScaleLinear } from 'd3';
import { SVGProps } from 'react';

interface BaseBarProps extends SVGProps<SVGRectElement> {}

export function BarRect({ ...props }: BaseBarProps) {
  return (
    <rect
      className="fill-cerulean-200 stroke-cerulean-400"
      opacity={0.7}
      strokeWidth={1}
      {...props}
    />
  );
}

interface BarLabelProps extends SVGProps<SVGForeignObjectElement> {
  label: string;
}

export function BarLabel({ label, ...props }: BarLabelProps) {
  return (
    <foreignObject {...props}>
      <p className="text-center text-cerulean-900">{label}</p>
    </foreignObject>
  );
}

interface BarLegendProps extends SVGProps<SVGForeignObjectElement> {
  legend: string;
  nameIsBig: boolean;
}

export function BarLegend({ legend, nameIsBig, ...props }: BarLegendProps) {
  return (
    <foreignObject
      height={30}
      {...props}>
      <p
        className={classNames('text-center text-hoki-800', {
          'break-words': !nameIsBig,
          truncate: nameIsBig,
        })}>
        {legend}
      </p>
    </foreignObject>
  );
}

interface GridProps {
  yScale: ScaleLinear<number, number>;
  boundsWidth: number;
  ticks?: number;
}

export function Grid({ yScale, boundsWidth, ticks = 5 }: GridProps) {
  return (
    <>
      {yScale.ticks(ticks).map((value, i) => (
        <g key={i}>
          <line
            className="stroke-cerulean-600"
            x1={0}
            x2={boundsWidth}
            y1={yScale(value)}
            y2={yScale(value)}
          />
        </g>
      ))}
    </>
  );
}
