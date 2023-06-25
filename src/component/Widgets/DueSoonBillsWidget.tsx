import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { lazy, useMemo } from 'react';
import { ptBR } from '../../languages';
import { DashboardWidget } from '../../models';
import { DashboardService } from '../../services';
import { getTimeDiff, toBRL } from '../../utils';
import { WidgetWithFilter } from './Widget';

const Table = lazy(() => import('../Table/Table'));

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
            name: <span className="text-xs">{d.name}</span>,
            priceWithDate: (
              <div className="flex flex-col items-end gap-1">
                <span
                  className={classNames({
                    'font-bold ': timeDiff && timeDiff < 0,
                    'text-slate-800': timeDiff && timeDiff > 0 && timeDiff < 7,
                  })}>
                  {toBRL(d.value)}
                </span>
                <span>{new Date(d.dueDate).toLocaleDateString()}</span>
              </div>
            ),
          };
        }) ?? []
    );
  }, [data]);

  const columns: { value: keyof (typeof parsedData)[number]; label: string }[] = [
    { value: 'name', label: '' },
    { value: 'priceWithDate', label: '' },
  ];

  return (
    <WidgetWithFilter
      key={DashboardWidget.DueSoonBills}
      title={ptBR.dueSoonBills}>
      {parsedData?.length && (
        <Table<(typeof parsedData)[number]>
          className="text-tiny"
          columns={columns}
          data={parsedData}
          showHeaders={false}
        />
      )}
    </WidgetWithFilter>
  );
}

export default DueSoonBillsWidget;
