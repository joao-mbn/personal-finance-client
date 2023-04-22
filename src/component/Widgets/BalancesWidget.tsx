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
      <div className="w-full border-solid border-2 border-black h-48">
        <h3>
          {ptBR.totalBalance}: {data?.totalBalance ?? '-'}
        </h3>
        {data && (
          <PieChart data={data.balancePerTarget.map(({ target: id, value }) => ({ id, value }))} />
        )}
      </div>
    </Widget>
  );
}

export default BalancesWidget;
