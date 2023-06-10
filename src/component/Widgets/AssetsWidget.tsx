import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget } from '../../model';
import { DashboardService } from '../../service';
import { ChartWrapper } from '../Charts';
import { Widget } from './Widget';

const BarChart = lazy(() => import('../Charts/BarChart'));

interface AssetsWidgetProps {}

export function AssetsWidget(props: AssetsWidgetProps) {
  const { data } = useQuery({ queryKey: ['assets'], queryFn: DashboardService.getAssets });

  return (
    <Widget
      title={ptBR.assets}
      key={DashboardWidget.Assets}>
      <ChartWrapper data={data}>
        {data?.length && (
          <BarChart
            keys={Object.keys(data[0]).filter(k => k !== 'type')}
            indexBy="type"
            data={data}
            width={data.length * 60}
            height={184}
          />
        )}
      </ChartWrapper>
    </Widget>
  );
}

export default AssetsWidget;
