import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget, MonthDebt } from '../../models';
import { DashboardService } from '../../services';
import { WidgetWithFilter } from './Widget';

const BarChart = lazy(() => import('../Charts/BarChart'));
const ChartWrapper = lazy(() => import('../Charts/ChartWrapper'));

interface MonthlyDebtsWidgetProps {}

export function MonthlyDebtsWidget(props: MonthlyDebtsWidgetProps) {
  const { data } = useQuery({
    queryKey: ['monthlyDebts'],
    queryFn: DashboardService.getMonthlyDebts,
  });

  return (
    <WidgetWithFilter
      key={DashboardWidget.MonthlyDebts}
      title={ptBR.monthlyDebts}>
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
