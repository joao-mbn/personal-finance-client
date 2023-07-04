import { useQuery } from '@tanstack/react-query';
import { lazy, useRef } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget, DateRange, MonthDebt } from '../../models';
import { DashboardService } from '../../services';
import { getDefaultRange } from '../../utils';
import { WidgetWithFilter } from './Widget';

const BarChart = lazy(() => import('../Charts/BarChart'));
const ChartWrapper = lazy(() => import('../Charts/ChartWrapper'));

const { FROM_DATE, TO_DATE } = getDefaultRange();

export function MonthlyDebtsWidget() {
  const filterRef = useRef<DateRange>({ from: FROM_DATE, to: TO_DATE });

  const { data, refetch } = useQuery({
    queryKey: ['monthlyDebts', filterRef.current],
    queryFn: () => DashboardService.getMonthlyDebts(filterRef.current),
  });

  return (
    <WidgetWithFilter
      initialFilter={filterRef.current}
      key={DashboardWidget.MonthlyDebts}
      title={ptBR.monthlyDebts}
      updateWidgetFilter={filter => {
        filterRef.current = filter;
        refetch();
      }}>
      {data?.length && (
        <ChartWrapper className="!h-60">
          <BarChart<MonthDebt>
            data={data}
            indexBy="month"
            valueKeys={['debt']}
          />
        </ChartWrapper>
      )}
    </WidgetWithFilter>
  );
}

export default MonthlyDebtsWidget;
