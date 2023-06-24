import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { Balance, DashboardWidget } from '../../model';
import { DashboardService } from '../../service';
import { toBRL } from '../../utils';
import { Widget } from './Widget';

const BarChart = lazy(() => import('../Charts/BarChart'));
const ChartWrapper = lazy(() => import('../Charts/ChartWrapper'));

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
      {data?.balances.length && (
        <ChartWrapper className="!h-60">
          <BarChart<Balance>
            data={data.balances}
            indexBy="name"
            valueKeys={['value']}
          />
        </ChartWrapper>
      )}
    </Widget>
  );
}

export default BalancesWidget;
