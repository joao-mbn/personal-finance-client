import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget, MonthDebt } from '../../models';
import { DashboardService } from '../../services';
import { Widget } from './Widget';

const BarChart = lazy(() => import('../Charts/BarChart'));
const ChartWrapper = lazy(() => import('../Charts/ChartWrapper'));

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
      {data?.length && (
        <ChartWrapper className="!h-60">
          <BarChart<MonthDebt>
            valueKeys={['debt']}
            indexBy="month"
            data={data}
          />
        </ChartWrapper>
      )}
    </Widget>
  );
}

export default MonthlyDebtsWidget;
