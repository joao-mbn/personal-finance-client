import { extent, scaleBand, scaleDiverging } from 'd3';
import { useContext, useMemo } from 'react';
import { BarLabel, BarLegend, BarRect, BaseChart } from '.';
import { ChartWrapperContext } from '../../contexts';
import { useLetterWidthEstimate } from '../../hooks';
import { REM_PX_RATIO, toBRL } from '../../utils';

const MARGIN = { top: 30, right: 12, bottom: 30, left: 12 };
const BAR_PADDING = 0.1;
const BAR_WIDTH_AND_PADDING = 75;
const FONT_SIZE = 12;
const MIN_HEIGHT_FOR_TEXT_DISPLAY = 1.2 * FONT_SIZE;

type DivergingBarChartProps<T> = {
  data: T[];
  indexBy: keyof T;
  overlapBars?: (keyof T)[] /* value keys whose bars will overlap each other, instead of stacking. */;
  valueKeys: (keyof T)[];
};

export function BarChart<T>({ data, indexBy, overlapBars, valueKeys }: DivergingBarChartProps<T>) {
  const letterWidth = useLetterWidthEstimate({ size: FONT_SIZE });
  const {
    dimensions: { width: containerWidth, height: containerHeight },
  } = useContext(ChartWrapperContext);

  const height = containerHeight - 1 * REM_PX_RATIO;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const X_MARGINS = MARGIN.right + MARGIN.left;
  const boundsWidth = Math.max(containerWidth - X_MARGINS, data.length * BAR_WIDTH_AND_PADDING);
  const width = boundsWidth + X_MARGINS;

  const xScale = useMemo(() => {
    const groups = data.map(d => d[indexBy] as string);
    return scaleBand().domain(groups).range([0, boundsWidth]).padding(BAR_PADDING);
  }, [data]);

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
          const roundedness = barHeight > 20 ? 4 : 2;

          const overlapModifier = overlapBars?.some(b => b === valueKey) ? 0 : 1;

          const y =
            value < 0
              ? origin + accNegativeBar * overlapModifier
              : origin - barHeight - accPositiveBar * overlapModifier;

          if (value >= 0) {
            accPositiveBar += barHeight * overlapModifier;
          } else {
            accNegativeBar += barHeight * overlapModifier;
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
        className="min-w-full stroke-slate-900"
      />
    </BaseChart>
  );
}

export default BarChart;
