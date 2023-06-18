import { scaleBand } from 'd3-scale';
import { useMemo } from 'react';
import { useLetterWidthEstimate } from '.';

const MARGIN = { top: 30, right: 12, bottom: 30, left: 12 };
const BAR_PADDING = 0.1;
const BAR_WIDTH_AND_PADDING = 75;
const FONT_SIZE = 12;
const MIN_HEIGHT_FOR_TEXT_DISPLAY = 1.2 * FONT_SIZE;

export const useBarChart = <T,>(height: number, data: T[], indexBy: keyof T) => {
  const letterWidth = useLetterWidthEstimate({ size: FONT_SIZE });

  const boundsWidth = data.length * BAR_WIDTH_AND_PADDING;
  const width = boundsWidth + MARGIN.right + MARGIN.left;
  const boundsHeight = height - MARGIN.top - MARGIN.bottom;

  const xScale = useMemo(() => {
    const groups = data.map(d => d[indexBy] as string);
    return scaleBand().domain(groups).range([0, boundsWidth]).padding(BAR_PADDING);
  }, [data]);

  return {
    xScale,
    width,
    letterWidth,
    boundsHeight,
    boundsWidth,
    MARGIN,
    BAR_PADDING,
    BAR_WIDTH_AND_PADDING,
    FONT_SIZE,
    MIN_HEIGHT_FOR_TEXT_DISPLAY,
  };
};
