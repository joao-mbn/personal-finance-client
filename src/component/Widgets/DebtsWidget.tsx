import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget, Debt } from '../../models';
import { DashboardService } from '../../services';
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
      title={
        <div className="flex gap-1">
          <span>{ptBR.totalDebts}:</span>
          <span className="font-bold">{data?.totalDebts ? toBRL(data.totalDebts) : '???'}</span>
        </div>
      }
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
