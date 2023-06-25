import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { Balance, DashboardWidget } from '../../models';
import { DashboardService } from '../../services';
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
      key={DashboardWidget.Balances}
      title={
        <div className="flex gap-1">
          <span>{ptBR.totalBalance}:</span>
          <span className="font-bold">{data?.totalBalance ? toBRL(data.totalBalance) : '???'}</span>
        </div>
      }>
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
