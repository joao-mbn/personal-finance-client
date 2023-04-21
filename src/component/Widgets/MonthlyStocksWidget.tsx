import { useQuery } from '@tanstack/react-query';
import { ptBR } from '../../languages';
import { DashboardService } from '../../service';
import { Widget } from './Widget';

interface MonthlyStocksWidgetProps {}

export function MonthlyStocksWidget(props: MonthlyStocksWidgetProps) {
  const { data } = useQuery({
    queryKey: ['monthlyStocks'],
    queryFn: DashboardService.getMonthlyStocks,
  });

  return (
    <Widget title={ptBR.monthlyStocks}>
      <div className="w-full bg-red-300 h-56">
        <ul>
          {data?.map((d, i) => (
            <li key={i}>
              {d.stocks} | {d.month.toString()}
            </li>
          ))}
        </ul>
      </div>
    </Widget>
  );
}

export default MonthlyStocksWidget;
