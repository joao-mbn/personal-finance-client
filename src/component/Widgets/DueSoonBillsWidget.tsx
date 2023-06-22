import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { useMemo } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget, DueSoonBill } from '../../model';
import { DashboardService } from '../../service';
import { getTimeDiff, toBRL } from '../../utils';
import { Table } from '../Table/Table';
import { Widget } from './Widget';

const columns: { value: keyof DueSoonBill; label: string }[] = [
  { value: 'name', label: '' },
  { value: 'dueDate', label: '' },
  { value: 'value', label: '' },
];

interface DueSoonBillsWidgetProps {}

export function DueSoonBillsWidget(props: DueSoonBillsWidgetProps) {
  const { data } = useQuery({
    queryKey: ['dueSoonBills'],
    queryFn: DashboardService.getDueSoonBills,
  });

  const now = Date.now();
  const parsedData = useMemo(() => {
    return (
      data
        ?.filter(d => !d.isPaid)
        .map(({ ...d }) => {
          const timeDiff = getTimeDiff(d.dueDate, now, 'days');
          return {
            ...d,
            value: toBRL(d.value),
            dueDate: (
              <span
                className={classNames({
                  'font-extrabold': timeDiff && timeDiff < 7,
                  'font-semibold': timeDiff && timeDiff > 7 && timeDiff < 30,
                })}>
                {new Date(d.dueDate).toLocaleDateString()}
              </span>
            ),
          };
        }) ?? []
    );
  }, [data]);

  return (
    <Widget
      title={ptBR.dueSoonBills}
      key={DashboardWidget.DueSoonBills}>
      <Table<DueSoonBill>
        columns={columns}
        data={parsedData}
      />
    </Widget>
  );
}

export default DueSoonBillsWidget;
