import { useQuery } from '@tanstack/react-query';
import { ptBR } from '../../languages';
import { DashboardService } from '../../service';
import { Widget } from './Widget';

interface MonthlyDebtsWidgetProps {}

export function MonthlyDebtsWidget(props: MonthlyDebtsWidgetProps) {
  const { data } = useQuery({
    queryKey: ['monthlyDebts'],
    queryFn: DashboardService.getMonthlyDebts,
  });

  return (
    <Widget title={ptBR.monthlyDebts}>
      <div className="w-full bg-red-300 h-56">
        <ul>
          {data?.map((d, i) => (
            <li key={i}>
              {d.debt} - {d.month.toString()}
            </li>
          ))}
        </ul>
      </div>
    </Widget>
  );
}

export default MonthlyDebtsWidget;
