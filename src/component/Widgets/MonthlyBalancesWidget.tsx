import { useQuery } from '@tanstack/react-query';
import { ptBR } from '../../languages';
import { DashboardService } from '../../service';
import { Widget } from './Widget';

interface MonthlyBalancesWidgetProps {}

export function MonthlyBalancesWidget(props: MonthlyBalancesWidgetProps) {
  const { data } = useQuery({
    queryKey: ['monthlyBalance'],
    queryFn: DashboardService.getMonthlyBalances,
  });

  return (
    <Widget title={ptBR.monthlyBalance}>
      <div className="w-full bg-red-300 h-56">
        <ul>
          {data?.map((d, i) => (
            <li key={i}>
              {d.balance} - {d.month.toString()}
            </li>
          ))}
        </ul>
      </div>
    </Widget>
  );
}

export default MonthlyBalancesWidget;
