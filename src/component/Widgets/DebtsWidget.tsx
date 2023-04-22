import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardService } from '../../service';
import { Widget } from './Widget';

const PieChart = lazy(() => import('../Charts/PieChart'));

interface DebtsWidgetProps {}

export function DebtsWidget(props: DebtsWidgetProps) {
  const { data } = useQuery({
    queryKey: ['debts'],
    queryFn: DashboardService.getDebts,
  });

  return (
    <Widget title={ptBR.debts}>
      <div className="w-full border-solid border-2 border-black h-48">
        <h3>
          {ptBR.totalDebts}: {data?.totalDebts ?? '-'}
        </h3>
        {data && (
          <PieChart data={data.debtsPerTarget.map(({ target: id, value }) => ({ id, value }))} />
        )}
      </div>
    </Widget>
  );
}

export default DebtsWidget;
