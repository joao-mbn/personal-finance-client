import { useQuery } from '@tanstack/react-query';
import { ptBR } from '../../languages';
import { DashboardWidget } from '../../model';
import { DashboardService } from '../../service';
import { toBRL } from '../../utils';
import { Widget } from './Widget';

interface DueSoonBillsWidgetProps {}

export function DueSoonBillsWidget(props: DueSoonBillsWidgetProps) {
  const { data } = useQuery({
    queryKey: ['dueSoonBills'],
    queryFn: DashboardService.getDueSoonBills,
  });

  return (
    <Widget
      title={ptBR.dueSoonBills}
      key={DashboardWidget.DueSoonBills}>
      <div className="h-56 w-full bg-red-300">
        <ul>
          {data?.map(d => (
            <li key={d.name}>
              {d.name}: {toBRL(d.value)} - {d.dueDate}
            </li>
          ))}
        </ul>
      </div>
    </Widget>
  );
}

export default DueSoonBillsWidget;
