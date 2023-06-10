import { Bar, BarSvgProps } from '@nivo/bar';
import { toBRL } from '../../utils';

type T = Record<string, number | string>;
type BarChartProps = Partial<Omit<BarSvgProps<T>, 'data' | 'keys' | 'indexBy'>> & {
  data: T[];
  keys: (keyof T)[];
  indexBy: keyof T;
  bottomLegend?: string;
  width?: number;
  height?: number;
};

export function BarChart({ bottomLegend, ...props }: BarChartProps) {
  const { data, width, height } = props;
  return (
    <Bar
      margin={{ top: 20, right: 8, bottom: 40, left: 8 }}
      padding={0.1}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'blue_green' }}
      valueFormat={toBRL}
      borderRadius={4}
      borderWidth={2}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 3]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: bottomLegend,
        legendPosition: 'middle',
        legendOffset: 32,
      }}
      axisLeft={null}
      labelTextColor={{
        from: 'color',
        modifiers: [['darker', 3]],
      }}
      isInteractive={false}
      animate={false}
      theme={{ fontSize: 12 }}
      ariaLabel="Bar Chart"
      barAriaLabel={e => `${e.id}: ${e.formattedValue} in ${props.indexBy} ${e.indexValue}`}
      {...props}
      height={height ?? 184}
      width={width ?? data.length * 100}
    />
  );
}

export default BarChart;
