import { useQuery } from '@tanstack/react-query';
import { lazy, useMemo, useRef } from 'react';
import { Column, DateRange } from '../../models';
import { RegistryService } from '../../services';
import { formatDateBR, getDefaultRange, toBRL } from '../../utils';
import { WidgetWithFilter } from './Widget';

const Table = lazy(() => import('../Table/Table'));

const { FROM_DATE, TO_DATE } = getDefaultRange();

export function RegistriesWidget() {
  const filterRef = useRef<DateRange>({ from: FROM_DATE, to: TO_DATE });

  const { data, refetch } = useQuery({
    queryKey: ['registries', filterRef.current],
    queryFn: () => RegistryService.getAll(filterRef.current),
  });

  const parsedData = useMemo(() => {
    return (
      data?.map(r => {
        return {
          typeAndTarget: (
            <div className="flex flex-col gap-1 text-xs">
              <span className="truncate font-bold">{r.type}</span>
              <span>{r.target}</span>
            </div>
          ),
          priceWithDate: (
            <div className="flex flex-col items-end gap-1 text-xs">
              <span className="font-bold">{toBRL(r.value)}</span>
              <span>{formatDateBR(new Date(r.timestamp))}</span>
            </div>
          ),
        };
      }) ?? []
    );
  }, [data]);

  const columns: Column<(typeof parsedData)[number]>[] = [
    { value: 'typeAndTarget', width: '70%' },
    { value: 'priceWithDate' },
  ];

  return (
    <WidgetWithFilter
      initialFilter={filterRef.current}
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

export default RegistriesWidget;
