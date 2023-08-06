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
const CreateRegister = lazy(() => import('./CreateRegister'));

const { FROM_DATE, TO_DATE } = getDefaultRange();

export function RegistersWidget() {
  const filterRef = useRef<DateRange>({ from: FROM_DATE, to: TO_DATE });

  const getAllQueryKey = ['register', 'all', filterRef.current];
  const { data, refetch } = useQuery({
    queryKey: getAllQueryKey,
    queryFn: () => RegisterService.getMany(filterRef.current),
  });

  function closeAllDialogs() {
    [...document.getElementsByTagName('dialog')].forEach(d => d.close());
  }

  const queryClient = useQueryClient();
  const { mutate: createOne } = useMutation({
    mutationFn: RegisterService.createOne,
    onSuccess: register => {
      console.info(ptBR.registerCreated);
      closeAllDialogs();
    },
  });

  const { mutate: updateOne } = useMutation({
    mutationFn: RegisterService.updateOne,
    onSuccess: register => {
      const { id, target, type } = register;
      queryClient.setQueryData<RegisterWithOptions>(getAllQueryKey, registerWithOptions => {
        if (!registerWithOptions) return registerWithOptions;

        const { registers, targetOptions, typeOptions } = registerWithOptions;
        const oldRegisterIndex = registerWithOptions?.registers.findIndex(r => r.id === id);

        if (oldRegisterIndex === -1) return registerWithOptions;

        const newRegisters = [
          ...registers.slice(0, oldRegisterIndex),
          { ...register },
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
      console.info(ptBR.registerUpdated);
      closeAllDialogs();
    },
  });

  const { mutate: deleteOne } = useMutation({
    mutationFn: RegisterService.deleteOne,
    onSuccess: registerId => {
      queryClient.setQueryData<RegisterWithOptions>(getAllQueryKey, registerWithOptions => {
        if (!registerWithOptions) return registerWithOptions;

        const { registers, targetOptions, typeOptions } = registerWithOptions;
        const oldRegisterIndex = registerWithOptions?.registers.findIndex(r => r.id === registerId);

        if (oldRegisterIndex === -1) return registerWithOptions;

        const newRegisters = [
          ...registers.slice(0, oldRegisterIndex),
          ...registers.slice(oldRegisterIndex + 1),
        ];

        return { registers: newRegisters, targetOptions, typeOptions };
      });
      console.info(ptBR.registerDeleted);
      closeAllDialogs();
    },
  });

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
