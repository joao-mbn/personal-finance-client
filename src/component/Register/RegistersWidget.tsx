import { useQuery } from '@tanstack/react-query';
import { lazy, useMemo, useRef } from 'react';
import { RegisterContext } from '../../contexts';
import { Column, DateRange, Register } from '../../models';
import { RegisterService } from '../../services';
import { formatDateBR, getDefaultRange, toBRL } from '../../utils';
import { WidgetWithFilter } from '../Widget/WidgetWithFilter';

const Table = lazy(() => import('../Table/Table'));
const RegisterMenu = lazy(() => import('./RegisterMenu'));

const { FROM_DATE, TO_DATE } = getDefaultRange();

export function RegistersWidget() {
  const filterRef = useRef<DateRange>({ from: FROM_DATE, to: TO_DATE });

  const { data, refetch } = useQuery({
    queryKey: ['register', filterRef.current],
    queryFn: () => RegisterService.getAll(filterRef.current),
  });

  const { registers, targetOptions, typeOptions } = data ?? {};

  const parsedTargetOptions = useMemo(
    () => (targetOptions ?? []).map(opt => ({ key: opt, value: opt })),
    [data]
  );

  const parsedTypeOptions = useMemo(
    () =>
      (typeOptions ?? [])
        .filter((opt): opt is string => !!opt)
        .map(opt => ({ key: opt, value: opt })),
    [data]
  );

  const parsedRegisters = useMemo(() => {
    return (
      registers?.map(r => {
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
              <span>{formatDateBR(r.timestamp)}</span>
            </div>
          ),
          menu: (
            <RegisterMenu
              onDelete={() => undefined}
              onEdit={(register: Register) => undefined}
              register={r}
            />
          ),
        };
      }) ?? []
    );
  }, [data]);

  const columns: Column<(typeof parsedRegisters)[number]>[] = [
    { value: 'typeAndTarget' },
    { value: 'priceWithDate', width: '30%' },
    { value: 'menu', width: '2.5rem' },
  ];

  return (
    <WidgetWithFilter
      initialFilter={filterRef.current}
      updateWidgetFilter={filter => {
        filterRef.current = filter;
        refetch();
      }}>
      {parsedRegisters?.length && (
        <RegisterContext.Provider
          value={{
            targetOptions: parsedTargetOptions ?? [],
            typeOptions: parsedTypeOptions ?? [],
          }}>
          <Table<(typeof parsedRegisters)[number]>
            columns={columns}
            data={parsedRegisters}
            showHeaders={false}
          />
        </RegisterContext.Provider>
      )}
    </WidgetWithFilter>
  );
}

export default RegistersWidget;
