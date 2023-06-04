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
      <div className="h-48 w-full border-2 border-solid border-black">
        <h3>
          {ptBR.totalDebts}: {data?.totalDebts ?? '-'}
        </h3>
        {data && <PieChart data={data.debts.map(({ name: id, value }) => ({ id, value }))} />}
      </div>
    </Widget>
  );
}

export default DebtsWidget;
