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
      key={DashboardWidget.MonthlyEntries}
      title={ptBR.monthlyEntries}>
      {data?.length && (
        <ChartWrapper>
          <BarChart<Omit<MonthEntry, ''>>
            data={data}
            indexBy="month"
            overlapBars={['netEarnings']}
            valueKeys={['earnings', 'expenses', 'netEarnings']}
          />
        </ChartWrapper>
      )}
    </WidgetWithFilter>
  );
}

export default MonthlyEntriesWidget;
