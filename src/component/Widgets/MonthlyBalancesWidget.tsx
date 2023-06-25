import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget, MonthBalance } from '../../models';
import { DashboardService } from '../../services';
import { WidgetWithFilter } from './Widget';

const BarChart = lazy(() => import('../Charts/BarChart'));
const ChartWrapper = lazy(() => import('../Charts/ChartWrapper'));

interface MonthlyBalancesWidgetProps {}

export function MonthlyBalancesWidget(props: MonthlyBalancesWidgetProps) {
  const { data } = useQuery({
    queryKey: ['monthlyBalance'],
    queryFn: DashboardService.getMonthlyBalances,
  });

  return (
    <WidgetWithFilter
      key={DashboardWidget.MonthlyBalance}
      title={ptBR.monthlyBalance}>
      {data?.length && (
        <ChartWrapper>
          <BarChart<MonthBalance>
            data={data}
            indexBy="month"
            valueKeys={['balance']}
          />
        </ChartWrapper>
      )}
    </WidgetWithFilter>
  );
}

export default MonthlyBalancesWidget;
