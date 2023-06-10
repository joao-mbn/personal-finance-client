import { Bar } from '@nivo/bar';

type T = Record<string, number | string>;
type BarChartProps = Omit<typeof Bar, 'data' | 'keys' | 'indexBy'> & {
  data: T[];
  keys: (keyof T)[];
  indexBy: keyof T;
  bottomLegend?: string;
  width: number;
  height: number;
};

export function BarChart({ bottomLegend, ...props }: BarChartProps) {
  return (
    <Bar
      margin={{ top: 20, right: 8, bottom: 40, left: 8 }}
      padding={0.2}
      valueScale={{ type: 'linear' }}
      indexScale={{ type: 'band', round: true }}
      colors={{ scheme: 'blue_green' }}
      valueFormat={v => `R$${(v / 1000).toFixed(v > 1e3 && v < 1e5 ? 1 : 0)}${v > 1000 ? 'k' : ''}`}
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
      role="application"
      ariaLabel="Nivo bar chart demo"
      barAriaLabel={function (e) {
        return e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue;
      }}
      theme={{ fontSize: 8 }}
      {...props}
    />
  );
}

export default BarChart;
