import { useQuery } from '@tanstack/react-query';
import { ptBR } from '../../languages';
import { DashboardService } from '../../service';
import { Widget } from './Widget';

interface DueSoonBillsWidgetProps {}

export function DueSoonBillsWidget(props: DueSoonBillsWidgetProps) {
  const { data } = useQuery({
    queryKey: ['dueSoonBills'],
    queryFn: DashboardService.getDueSoonBills,
  });

  return (
    <Widget title={ptBR.dueSoonBills}>
      <div className="w-full bg-red-300 h-56">
        <ul>
          {data?.map(d => (
            <li key={d.name}>
              {d.name}: {d.value} - {d.dueDate.toString()}
            </li>
          ))}
        </ul>
      </div>
    </Widget>
  );
}

export default DueSoonBillsWidget;
