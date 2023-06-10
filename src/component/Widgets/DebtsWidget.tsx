import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget } from '../../model';
import { DashboardService } from '../../service';
import { toBRL } from '../../utils';
import { ChartWrapper } from '../Charts';
import { Widget } from './Widget';

const PieChart = lazy(() => import('../Charts/PieChart'));

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
      <ChartWrapper data={data}>
        {data?.debts.length && (
          <PieChart data={data.debts.map(({ name: id, value }) => ({ id, value }))} />
        )}
      </ChartWrapper>
    </Widget>
  );
}

export default DebtsWidget;
