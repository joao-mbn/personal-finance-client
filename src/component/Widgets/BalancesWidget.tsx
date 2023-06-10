import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget } from '../../model';
import { DashboardService } from '../../service';
import { ChartWrapper } from '../Charts';
import { Widget } from './Widget';

const PieChart = lazy(() => import('../Charts/PieChart'));

interface BalancesWidgetProps {}

export function BalancesWidget(props: BalancesWidgetProps) {
  const { data } = useQuery({
    queryKey: ['balances'],
    queryFn: DashboardService.getBalances,
  });

  return (
    <Widget
      title={`${ptBR.totalBalance}: ${data?.totalBalance ?? '-'}`}
      key={DashboardWidget.Balances}>
      <ChartWrapper data={data}>
        {data?.balances.length && (
          <PieChart data={data.balances.map(({ name: id, value }) => ({ id, value }))} />
        )}
      </ChartWrapper>
    </Widget>
  );
}

export default BalancesWidget;
