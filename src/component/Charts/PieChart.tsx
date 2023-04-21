import { ResponsivePie } from '@nivo/pie';

type PieChartProps = Omit<typeof ResponsivePie, 'data'> & {
  data: {
    id: string | number;
    value: number;
  }[];
};

export function PieChart({ data, ...props }: PieChartProps) {
  return (
    <ResponsivePie
      data={data}
      margin={{ top: 20, right: 8, bottom: 20, left: 8 }}
      valueFormat=" >-$,.0d"
      startAngle={-90}
      endAngle={90}
      sortByValue={true}
      innerRadius={0.5}
      cornerRadius={4}
      colors={{ scheme: 'blue_green' }}
      borderWidth={2}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.3]],
      }}
      enableArcLinkLabels={false}
      enableArcLabels={false}
      tooltip={({ datum: { label, value } }) => (
        <span className="text-tiny">
          {label}: {value}
        </span>
      )}
      {...props}
    />
  );
}

export default PieChart;
