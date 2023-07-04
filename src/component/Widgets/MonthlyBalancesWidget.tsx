import { useQuery } from '@tanstack/react-query';
import { lazy, useRef } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget, DateRange, MonthBalance } from '../../models';
import { DashboardService } from '../../services';
import { getDefaultRange } from '../../utils';
import { WidgetWithFilter } from './Widget';

const BarChart = lazy(() => import('../Charts/BarChart'));
const ChartWrapper = lazy(() => import('../Charts/ChartWrapper'));

const { FROM_DATE, TO_DATE } = getDefaultRange();

export function MonthlyBalancesWidget() {
  const filterRef = useRef<DateRange>({ from: FROM_DATE, to: TO_DATE });

  const { data, refetch } = useQuery({
    queryKey: ['monthlyBalance', filterRef.current],
    queryFn: () => DashboardService.getMonthlyBalances(filterRef.current),
  });

  return (
    <WidgetWithFilter
      initialFilter={filterRef.current}
      key={DashboardWidget.MonthlyBalance}
      title={ptBR.monthlyBalance}
      updateWidgetFilter={filter => {
        filterRef.current = filter;
        refetch();
      }}>
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
