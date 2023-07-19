import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { Asset, DashboardWidget } from '../../models';
import { DashboardService } from '../../services';
import { Widget } from '../Widget/Widget';

const BarChart = lazy(() => import('../Charts/BarChart'));
const ChartWrapper = lazy(() => import('../Charts/ChartWrapper'));

export function AssetsWidget() {
  const { data } = useQuery({ queryKey: ['assets'], queryFn: DashboardService.getAssets });

  return (
    <Widget
      key={DashboardWidget.Assets}
      title={ptBR.assets}>
      {data?.length && (
        <ChartWrapper className="!h-60">
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
