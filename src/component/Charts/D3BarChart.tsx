import classNames from 'classnames';
import { extent, scaleBand, scaleLinear } from 'd3';
import { useMemo } from 'react';
import { useLetterWidthEstimate } from '../../hooks';
import { toBRL } from '../../utils';

const MARGIN = { top: 40, right: 12, bottom: 40, left: 12 };
const BAR_PADDING = 0.1;

type BarChartD3Props<T extends Record<string, number | string>> = {
  height?: number;
  data: T[];
  indexBy: keyof T;
  valueKey: keyof T;
};

export const MyBarChart = <T extends Record<string, number | string>>({
  height = 208,
  data,
  indexBy,
  valueKey,
}: BarChartD3Props<T>) => {
  const fontSize = 12;
  const letterWidth = useLetterWidthEstimate({ size: fontSize });

  const barWidthAndPadding = 75;
  const width = data.length * barWidthAndPadding + MARGIN.right + MARGIN.left;
  const boundsWidth = width - MARGIN.right - MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const xScale = useMemo(() => {
    const groups = data.map(d => d[indexBy] as string);
    return scaleBand().domain(groups).range([0, boundsWidth]).padding(BAR_PADDING);
  }, [data]);

  const yScale = useMemo(() => {
    const [, max] = extent(data.map(d => d[valueKey] as number));
    return scaleLinear()
      .domain([0, max ?? 1000])
      .range([0, boundsHeight]);
  }, [data, width]);

  const allShapes = data.map((d, i) => {
    const index = d[indexBy] as string;
    const value = d[valueKey] as number;

    const x = xScale(index);
    if (x == null) return null;

    const barHeight = yScale(value);
    const barWidth = xScale.bandwidth();
    const roundedness = barHeight > 20 ? 6 : 4;

    // The text is bigger than two lines below the bar, with the bar width.
    const nameIsBig = index.length * letterWidth > 2 * xScale.bandwidth();

    return (
      <g key={i}>
        <rect
          x={x}
          y={boundsHeight - barHeight}
          width={barWidth}
          height={barHeight}
          opacity={0.7}
          className="fill-slate-400 stroke-slate-600"
          strokeWidth={1}
          rx={roundedness}
        />
        <foreignObject
          width={barWidth}
          height={20}
          x={x}
          y={boundsHeight - barHeight - 15}
          fontSize={fontSize}>
          <p className="text-center">{toBRL(value)}</p>
        </foreignObject>
        <foreignObject
          width={barWidth}
          height={30}
          x={x}
          y={boundsHeight + 5}>
          <p
            className={classNames('text-center', {
              'break-words': !nameIsBig,
              truncate: nameIsBig,
            })}>
            {index}
          </p>
        </foreignObject>
      </g>
    );
  });

  const grid = yScale.ticks(5).map((value, i) => (
    <g key={i}>
      <line
        y1={yScale(value)}
        y2={yScale(value)}
        x1={0}
        x2={boundsWidth}
        className="stroke-slate-300"
      />
    </g>
  ));

  return (
    <div>
      <svg
        className="fill-current text-slate-600"
        width={width}
        height={height}>
        <g
          width={boundsWidth}
          height={boundsHeight}
          className="translate-x-3 translate-y-10">
          {grid}
          {allShapes}
        </g>
      </svg>
    </div>
  );
};

export default MyBarChart;
