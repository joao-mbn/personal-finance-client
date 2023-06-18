import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget, MonthBalance } from '../../model';
import { DashboardService } from '../../service';
import { ChartWrapper } from '../Charts';
import { Widget } from './Widget';

const BarChart = lazy(() => import('../Charts/BarChart'));

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
      <ChartWrapper data={data}>
        {data?.length && (
          <BarChart<MonthBalance>
            valueKeys={['balance']}
            indexBy="month"
            data={data}
          />
        )}
      </ChartWrapper>
    </Widget>
  );
}

export default MonthlyBalancesWidget;
