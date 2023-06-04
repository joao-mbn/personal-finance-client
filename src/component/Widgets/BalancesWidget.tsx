import { useQuery } from '@tanstack/react-query';
import { lazy } from 'react';
import { ptBR } from '../../languages';
import { DashboardService } from '../../service';
import { Widget } from './Widget';

const PieChart = lazy(() => import('../Charts/PieChart'));

interface BalancesWidgetProps {}

export function BalancesWidget(props: BalancesWidgetProps) {
  const { data } = useQuery({
    queryKey: ['balances'],
    queryFn: DashboardService.getBalances,
  });

  return (
    <Widget title={ptBR.balance}>
      <div className="h-48 w-full border-2 border-solid border-black">
        <h3>
          {ptBR.totalBalance}: {data?.totalBalance ?? '-'}
        </h3>
        {data && <PieChart data={data.balances.map(({ name: id, value }) => ({ id, value }))} />}
      </div>
    </Widget>
  );
}

export default BalancesWidget;
