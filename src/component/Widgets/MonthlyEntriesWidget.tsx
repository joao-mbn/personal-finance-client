import { useQuery } from '@tanstack/react-query';
import { lazy, useRef } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget, DateRange, MonthEntry } from '../../models';
import { DashboardService } from '../../services';
import { getDefaultRange } from '../../utils';
import { WidgetWithFilter } from './Widget';

const BarChart = lazy(() => import('../Charts/BarChart'));
const ChartWrapper = lazy(() => import('../Charts/ChartWrapper'));

const { FROM_DATE, TO_DATE } = getDefaultRange();

export function MonthlyEntriesWidget() {
  const filterRef = useRef<DateRange>({ from: FROM_DATE, to: TO_DATE });

  const { data, refetch } = useQuery({
    queryKey: ['monthlyEntries', filterRef.current],
    queryFn: () => DashboardService.getMonthlyEntries(filterRef.current),
  });

  return (
    <WidgetWithFilter
      initialFilter={filterRef.current}
      key={DashboardWidget.MonthlyEntries}
      title={ptBR.monthlyEntries}
      updateWidgetFilter={filter => {
        filterRef.current = filter;
        refetch();
      }}>
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
