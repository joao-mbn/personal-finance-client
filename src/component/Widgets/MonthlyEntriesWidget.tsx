import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget, MonthEntry } from '../../model';
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
      {data?.length && (
        <ChartWrapper data={data}>
          <BarChart<Omit<MonthEntry, ''>>
            valueKeys={['earnings', 'expenses', 'netEarnings']}
            indexBy="month"
            overlapBars={['netEarnings']}
            data={data}
          />
        </ChartWrapper>
      )}
    </Widget>
  );
}

export default MonthlyEntriesWidget;
