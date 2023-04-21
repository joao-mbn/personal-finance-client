import { useQuery } from '@tanstack/react-query';
import { ptBR } from '../../languages';
import { DashboardService } from '../../service';
import { Widget } from './Widget';

interface MonthlyEntriesWidgetProps {}

export function MonthlyEntriesWidget(props: MonthlyEntriesWidgetProps) {
  const { data } = useQuery({
    queryKey: ['monthlyEntries'],
    queryFn: DashboardService.getMonthlyEntries,
  });

  return (
    <Widget title={ptBR.monthlyEntries}>
      <div className="w-full bg-red-300 h-56">
        <ul>
          {data?.map((d, i) => (
            <li key={i}>
              {d.earnings} | {d.expenses} | {d.netEarnings} | {d.month.toString()}
            </li>
          ))}
        </ul>
      </div>
    </Widget>
  );
}

export default MonthlyEntriesWidget;
