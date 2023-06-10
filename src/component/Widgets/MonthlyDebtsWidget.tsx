import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget } from '../../model';
import { DashboardService } from '../../service';
import { ChartWrapper } from '../Charts';
import { Widget } from './Widget';

const BarChart = lazy(() => import('../Charts/BarChart'));

interface MonthlyDebtsWidgetProps {}

export function MonthlyDebtsWidget(props: MonthlyDebtsWidgetProps) {
  const { data } = useQuery({
    queryKey: ['monthlyDebts'],
    queryFn: DashboardService.getMonthlyDebts,
  });

  return (
    <Widget
      title={ptBR.monthlyDebts}
      key={DashboardWidget.MonthlyDebts}>
      <ChartWrapper data={data}>
        {data?.length && (
          <BarChart
            keys={Object.keys(data[0]).filter(k => k !== 'month')}
            indexBy="month"
            data={data}
          />
        )}
      </ChartWrapper>
    </Widget>
  );
}

export default MonthlyDebtsWidget;
