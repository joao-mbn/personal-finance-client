import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { lazy, useMemo, useRef } from 'react';
import { RegisterContext } from '../../contexts';
import { ptBR } from '../../languages';
import { Column, DateRange, RegisterWithOptions } from '../../models';
import { RegisterService } from '../../services';
import { formatDateBR, getDefaultRange, toBRL } from '../../utils';
import { WidgetWithFilter } from '../Widget/WidgetWithFilter';

const Table = lazy(() => import('../Table/Table'));
const RegisterMenu = lazy(() => import('./RegisterMenu'));

const { FROM_DATE, TO_DATE } = getDefaultRange();

export function RegistersWidget() {
  const filterRef = useRef<DateRange>({ from: FROM_DATE, to: TO_DATE });

  const getAllQueryKey = ['register', 'all', filterRef.current];
  const { data, refetch } = useQuery({
    queryKey: getAllQueryKey,
    queryFn: () => RegisterService.getAll(filterRef.current),
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: RegisterService.edit,
    onSuccess: register => {
      const { id, target, type } = register;
      queryClient.setQueryData<RegisterWithOptions>(getAllQueryKey, registerWithOptions => {
        if (!registerWithOptions) return registerWithOptions;

        const { registers, targetOptions, typeOptions } = registerWithOptions;
        const oldRegisterIndex = registerWithOptions?.registers.findIndex(r => r.id === id);

        if (oldRegisterIndex === -1) return registerWithOptions;

        const newRegisters = [
          ...registers.slice(0, oldRegisterIndex),
          register,
          ...registers.slice(oldRegisterIndex + 1),
        ];

        const newTargetOptions = [...targetOptions];
        !targetOptions.some(opt => opt === target) && newTargetOptions?.push(target);

        const newTypeOptions = [...typeOptions];
        !!type && !typeOptions.some(opt => opt === type) && newTypeOptions?.push(type);

        return {
          registers: newRegisters,
          targetOptions: newTargetOptions,
          typeOptions: newTypeOptions,
        };
      });
      console.info(ptBR.registerEdited);
      [...document.getElementsByTagName('dialog')].forEach(d => d.close());
    },
  });

  const { registers, targetOptions, typeOptions } = data ?? {};

  const parsedTargetOptions = useMemo(
    () => (targetOptions ?? []).sort().map(opt => ({ key: opt, value: opt })),
    [data]
  );

  const parsedTypeOptions = useMemo(
    () =>
      (typeOptions ?? [])
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
              onDelete={() => undefined}
              onEdit={mutate}
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
