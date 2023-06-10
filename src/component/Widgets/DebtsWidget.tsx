import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget } from '../../model';
import { DashboardService } from '../../service';
import { toBRL } from '../../utils';
import { ChartWrapper } from '../Charts';
import { Widget } from './Widget';

const BarChart = lazy(() => import('../Charts/BarChart'));

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
          <BarChart
            keys={['value']}
            indexBy="name"
            data={data.debts}
          />
        )}
      </ChartWrapper>
    </Widget>
  );
}

export default DebtsWidget;
