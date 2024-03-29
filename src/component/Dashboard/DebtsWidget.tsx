import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget, Debt } from '../../models';
import { DashboardService } from '../../services';
import { formatCurrency } from '../../utils';
import { Widget } from '../Widget/Widget';

const BarChart = lazy(() => import('../Charts/BarChart'));
const ChartWrapper = lazy(() => import('../Charts/ChartWrapper'));

export function DebtsWidget() {
  const { data } = useQuery({
    queryKey: ['debts'],
    queryFn: DashboardService.getDebts,
  });

  return (
    <Widget
      key={DashboardWidget.Debts}
      title={
        <div className="flex gap-1">
          <span>{ptBR.totalDebts}:</span>
          <span className="font-bold text-cerulean-800">
            {data?.totalDebts ? formatCurrency(data.totalDebts, 'pt-BR', 'BRL') : '???'}
          </span>
        </div>
      }>
      {data?.debts.length && (
        <ChartWrapper className="!h-60">
          <BarChart<Debt>
            data={data.debts}
            indexBy="name"
            valueKeys={['value']}
          />
        </ChartWrapper>
      )}
    </Widget>
  );
}

export default DebtsWidget;
