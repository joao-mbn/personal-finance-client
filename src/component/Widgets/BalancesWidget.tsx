import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget } from '../../model';
import { DashboardService } from '../../service';
import { toBRL } from '../../utils';
import { ChartWrapper } from '../Charts';
import { Widget } from './Widget';

const BarChart = lazy(() => import('../Charts/D3BarChart'));

interface BalancesWidgetProps {}

export function BalancesWidget(props: BalancesWidgetProps) {
  const { data } = useQuery({
    queryKey: ['balances'],
    queryFn: DashboardService.getBalances,
  });

  return (
    <Widget
      title={`${ptBR.totalBalance}: ${data?.totalBalance ? toBRL(data.totalBalance) : '???'}`}
      key={DashboardWidget.Balances}>
      <ChartWrapper data={data}>
        {data?.balances.length && (
          <BarChart
            data={data.balances}
            indexBy="name"
            valueKey="value"
          />
        )}
      </ChartWrapper>
    </Widget>
  );
}

export default BalancesWidget;
