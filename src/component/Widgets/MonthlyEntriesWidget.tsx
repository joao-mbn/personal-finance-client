import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget } from '../../model';
import { DashboardService } from '../../service';
import { ChartWrapper } from '../Charts';
import { Widget } from './Widget';

const BarChart = lazy(() => import('../Charts/BarChart'));

interface MonthlyEntriesWidgetProps {}

export function MonthlyEntriesWidget(props: MonthlyEntriesWidgetProps) {
  const { data } = useQuery({
    queryKey: ['monthlyEntries'],
    queryFn: DashboardService.getMonthlyEntries,
  });

  return (
    <Widget
      title={ptBR.monthlyEntries}
      key={DashboardWidget.MonthlyEntries}>
      <ChartWrapper data={data}>
        {data?.length && (
          <BarChart
            keys={Object.keys(data[0]).filter(k => k !== 'month')}
            indexBy="month"
            data={data.map(({ netEarnings, ...rest }) => ({
              ...rest,
              expenses: -rest.expenses,
            }))}
            width={data.length * 60}
            height={184}
          />
        )}
      </ChartWrapper>
    </Widget>
  );
}

export default MonthlyEntriesWidget;
