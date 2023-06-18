import { extent } from 'd3-array';
import { scaleDiverging } from 'd3-scale';
import { useMemo } from 'react';
import { BarLabel, BarLegend, BarRect, BaseChart } from '.';
import { useBarChart } from '../../hooks';
import { toBRL } from '../../utils';

type DivergingBarChartProps<T> = {
  height?: number;
  data: T[];
  indexBy: keyof T;
  valueKeys: (keyof T)[];
};

export function BarChart<T>({ height = 304, data, indexBy, valueKeys }: DivergingBarChartProps<T>) {
  const {
    xScale,
    letterWidth,
    boundsHeight,
    boundsWidth,
    width,
    FONT_SIZE,
    MIN_HEIGHT_FOR_TEXT_DISPLAY,
  } = useBarChart(height, data, indexBy);

  const minMax = useMemo(() => {
    const values = data.flatMap(d => valueKeys.map(key => (isNaN(+d[key]) ? 0 : +d[key])));
    const minMax = extent(values);
    const min = minMax[0] != null && minMax[0] < 0 ? minMax[0] : 0;
    const max = minMax[1] ?? 50;

    return { min, max };
  }, [data]);
  const { min, max } = minMax;

  const yScale = useMemo(() => {
    const allowance = max * 0.1;

    // If min = 0, the chart behaves as non-divergent.
    const poundedOrigin = Math.abs(max) / (Math.abs(min) + max);
    return scaleDiverging()
      .domain([min - allowance, 0, max + allowance])
      .range([0, boundsHeight * poundedOrigin, boundsHeight])
      .clamp(true);
  }, [minMax]);

  const origin = yScale(0);

  const getHeight = (value: number) => {
    const proportionalHeight = Math.abs(value) / (Math.abs(min) + max);

    return proportionalHeight * boundsHeight;
  };

  const allShapes = data.map((d, i) => {
    const index = d[indexBy] as string;
    const x = xScale(index);
    if (x == null) return null;
    const barWidth = xScale.bandwidth();

    // The text is bigger than two lines below the bar, with the bar width.
    const nameIsBig = index.length * letterWidth > 2 * xScale.bandwidth();

    let accNegativeBar = 0;
    let accPositiveBar = 0;

    return (
      <g key={i}>
        {valueKeys.map((valueKey, j) => {
          const value = d[valueKey] as number;
          const barHeight = getHeight(value);
          const roundedness = barHeight > 20 ? 6 : 4;

          const y = value < 0 ? origin + accNegativeBar : origin - barHeight - accPositiveBar;

          if (value >= 0) {
            accPositiveBar += barHeight;
          } else {
            accNegativeBar += barHeight;
          }

          return (
            <g key={j}>
              <BarRect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx={roundedness}
              />
              {barHeight > MIN_HEIGHT_FOR_TEXT_DISPLAY && (
                <BarLabel
                  width={barWidth}
                  height={MIN_HEIGHT_FOR_TEXT_DISPLAY}
                  x={x}
                  y={y + (barHeight - FONT_SIZE) / 2}
                  fontSize={FONT_SIZE}
                  label={toBRL(value)}
                />
              )}
            </g>
          );
        })}
        <BarLegend
          width={barWidth}
          x={x}
          y={boundsHeight + 5}
          legend={index}
          nameIsBig={nameIsBig}
        />
      </g>
    );
  });

  return (
    <BaseChart
      height={height}
      width={width}
      boundsWidth={boundsWidth}
      boundsHeight={boundsHeight}>
      {allShapes}
      <line
        y1={yScale(0)}
        y2={yScale(0)}
        x1={0}
        x2={boundsWidth}
        className="stroke-slate-900"
      />
    </BaseChart>
  );
}

export default BarChart;
