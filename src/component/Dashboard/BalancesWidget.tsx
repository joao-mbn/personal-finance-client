import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { Balance, DashboardWidget } from '../../models';
import { DashboardService } from '../../services';
import { formatCurrency } from '../../utils';
import { Widget } from '../Widget/Widget';

const BarChart = lazy(() => import('../Charts/BarChart'));
const ChartWrapper = lazy(() => import('../Charts/ChartWrapper'));

export function BalancesWidget() {
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
          <span className="font-bold text-cerulean-800">
            {data?.totalBalance ? formatCurrency(data.totalBalance, 'pt-BR', 'BRL') : '???'}
          </span>
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
