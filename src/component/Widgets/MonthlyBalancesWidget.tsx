import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget, MonthBalance } from '../../models';
import { DashboardService } from '../../services';
import { Widget } from './Widget';

const BarChart = lazy(() => import('../Charts/BarChart'));
const ChartWrapper = lazy(() => import('../Charts/ChartWrapper'));

interface MonthlyBalancesWidgetProps {}

export function MonthlyBalancesWidget(props: MonthlyBalancesWidgetProps) {
  const { data } = useQuery({
    queryKey: ['monthlyBalance'],
    queryFn: DashboardService.getMonthlyBalances,
  });

  return (
    <Widget
      title={ptBR.monthlyBalance}
      key={DashboardWidget.MonthlyBalance}>
      {data?.length && (
        <ChartWrapper>
          <BarChart<MonthBalance>
            valueKeys={['balance']}
            indexBy="month"
            data={data}
          />
        </ChartWrapper>
      )}
    </Widget>
  );
}

export default MonthlyBalancesWidget;
