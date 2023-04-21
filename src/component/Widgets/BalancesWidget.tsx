import { useQuery } from '@tanstack/react-query';
import { ptBR } from '../../languages';
import { DashboardService } from '../../service';
import { Widget } from './Widget';

interface BalancesWidgetProps {}

export function BalancesWidget(props: BalancesWidgetProps) {
  const { data } = useQuery({
    queryKey: ['balances'],
    queryFn: DashboardService.getBalances,
  });

  return (
    <Widget title={ptBR.balance}>
      <div className="w-full bg-red-300 h-56">
        <ul>
          {data?.balancePerTarget.map(d => (
            <li key={d.target}>
              {d.target}: {d.value}
            </li>
          ))}
        </ul>
      </div>
    </Widget>
  );
}

export default BalancesWidget;
