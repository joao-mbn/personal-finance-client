import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget, MonthEntry } from '../../models';
import { DashboardService } from '../../services';
import { WidgetWithFilter } from './Widget';

const BarChart = lazy(() => import('../Charts/BarChart'));
const ChartWrapper = lazy(() => import('../Charts/ChartWrapper'));

interface MonthlyEntriesWidgetProps {}

export function MonthlyEntriesWidget(props: MonthlyEntriesWidgetProps) {
  const { data } = useQuery({
    queryKey: ['monthlyEntries'],
    queryFn: DashboardService.getMonthlyEntries,
  });

  return (
    <WidgetWithFilter
      title={ptBR.monthlyEntries}
      key={DashboardWidget.MonthlyEntries}>
      {data?.length && (
        <ChartWrapper>
          <BarChart<Omit<MonthEntry, ''>>
            valueKeys={['earnings', 'expenses', 'netEarnings']}
            indexBy="month"
            overlapBars={['netEarnings']}
            data={data}
          />
        </ChartWrapper>
      )}
    </WidgetWithFilter>
  );
}

export default MonthlyEntriesWidget;
