import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget, Debt } from '../../model';
import { DashboardService } from '../../service';
import { toBRL } from '../../utils';
import { Widget } from './Widget';

const BarChart = lazy(() => import('../Charts/BarChart'));
const ChartWrapper = lazy(() => import('../Charts/ChartWrapper'));

interface DebtsWidgetProps {}

export function DebtsWidget(props: DebtsWidgetProps) {
  const { data } = useQuery({
    queryKey: ['debts'],
    queryFn: DashboardService.getDebts,
  });

  return (
    <Widget
      title={`${ptBR.totalDebts}: ${data?.totalDebts ? toBRL(data.totalDebts) : '???'}`}
      key={DashboardWidget.Debts}>
      {data?.debts.length && (
        <ChartWrapper className="!h-60">
          <BarChart<Debt>
            data={data.debts}
            indexBy="name"
            valueKeys={['value']}
          />
        </ChartWrapper>
      )}
    </Widget>
  );
}

export default DebtsWidget;
