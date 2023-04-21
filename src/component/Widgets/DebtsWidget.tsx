import { useQuery } from '@tanstack/react-query';
import { ptBR } from '../../languages';
import { DashboardService } from '../../service';
import { Widget } from './Widget';

interface DebtsWidgetProps {}

export function DebtsWidget(props: DebtsWidgetProps) {
  const { data } = useQuery({
    queryKey: ['debts'],
    queryFn: DashboardService.getDebts,
  });

  return (
    <Widget title={ptBR.debts}>
      <div className="w-full bg-red-300 h-56">
        <ul>
          {data?.debtsPerTarget.map(d => (
            <li key={d.target}>
              {d.target}: {d.value}
            </li>
          ))}
        </ul>
      </div>
    </Widget>
  );
}

export default DebtsWidget;
