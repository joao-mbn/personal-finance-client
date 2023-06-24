import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { Asset, DashboardWidget } from '../../model';
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
      {data?.length && (
        <ChartWrapper data={data}>
          <BarChart<Asset>
            data={data}
            indexBy="type"
            valueKeys={['value']}
          />
        </ChartWrapper>
      )}
    </Widget>
  );
}

export default AssetsWidget;
