import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { lazy, useMemo, useRef } from 'react';
import { ptBR } from '../../languages';
import { Column, DashboardWidget, DateRange } from '../../models';
import { DashboardService } from '../../services';
import { formatDateBR, getDefaultRange, getTimeDiff, toBRL } from '../../utils';
import { WidgetWithFilter } from '../Widget/WidgetWithFilter';

const Table = lazy(() => import('../Table/Table'));

const { FROM_DATE, TO_DATE } = getDefaultRange();

export function DueSoonBillsWidget() {
  const filterRef = useRef<DateRange>({ from: FROM_DATE, to: TO_DATE });

  const { data, refetch } = useQuery({
    queryKey: ['dueSoonBills', filterRef.current],
    queryFn: () => DashboardService.getDueSoonBills(filterRef.current),
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
                    'font-bold': timeDiff && timeDiff < 0,
                    'text-cerulean-800': timeDiff && timeDiff > 0 && timeDiff < 7,
                  })}>
                  {toBRL(d.value)}
                </span>
                <span>{formatDateBR(new Date(d.dueDate))}</span>
              </div>
            ),
          };
        }) ?? []
    );
  }, [data]);

  const columns: Column<(typeof parsedData)[number]>[] = [
    { value: 'name', width: '70%' },
    { value: 'priceWithDate' },
  ];

  return (
    <WidgetWithFilter
      initialFilter={filterRef.current}
      key={DashboardWidget.DueSoonBills}
      title={ptBR.dueSoonBills}
      updateWidgetFilter={filter => {
        filterRef.current = filter;
        refetch();
      }}>
      {parsedData?.length && (
        <Table<(typeof parsedData)[number]>
          columns={columns}
          data={parsedData}
          showHeaders={false}
        />
      )}
    </WidgetWithFilter>
  );
}

export default DueSoonBillsWidget;
