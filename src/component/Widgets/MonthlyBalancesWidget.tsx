import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget } from '../../model';
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
          <BarChart
            keys={Object.keys(data[0]).filter(k => k !== 'month')}
            indexBy="month"
            data={data}
            width={data.length * 60}
            height={184}
          />
        )}
      </ChartWrapper>
    </Widget>
  );
}

export default MonthlyBalancesWidget;
