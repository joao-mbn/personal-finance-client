import { lazy, useMemo, useRef } from 'react';
import { RegisterContext } from '../../contexts';
import { Column, DateRange } from '../../models';
import { formatDateBR, getDefaultRange, toBRL } from '../../utils';
import { WidgetWithFilter } from '../Widget/WidgetWithFilter';
import { useRegisterCrud } from './useRegisterCrud';

const Table = lazy(() => import('../Table/Table'));
const RegisterMenu = lazy(() => import('./RegisterMenu'));
const CreateRegister = lazy(() => import('./CreateRegister'));

const { FROM_DATE, TO_DATE } = getDefaultRange();

export function RegistersWidget() {
  const filterRef = useRef<DateRange>({ from: FROM_DATE, to: TO_DATE });

  const { data, refetch, createOne, updateOne, deleteOne } = useRegisterCrud(filterRef.current);

  const { registers, targetOptions: rawTargetOptions, typeOptions: rawTypeOptions } = data ?? {};

  const targetOptions = useMemo(
    () => (rawTargetOptions ?? []).sort().map(opt => ({ key: opt, value: opt })),
    [data]
  );

  const typeOptions = useMemo(
    () =>
      (rawTypeOptions ?? [])
        .filter((opt): opt is string => !!opt)
        .sort()
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
              key={crypto.randomUUID()}
              onDelete={() => deleteOne(r.id)}
              onEdit={updateOne}
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
    <RegisterContext.Provider value={{ targetOptions, typeOptions }}>
      <WidgetWithFilter
        initialFilter={filterRef.current}
        updateWidgetFilter={filter => {
          filterRef.current = filter;
          refetch();
        }}>
        {parsedRegisters.length && (
          <Table<(typeof parsedRegisters)[number]>
            columns={columns}
            data={parsedRegisters}
            showHeaders={false}
          />
        )}
      </WidgetWithFilter>
      <CreateRegister onCreate={createOne} />
    </RegisterContext.Provider>
  );
}

export default RegistersWidget;
