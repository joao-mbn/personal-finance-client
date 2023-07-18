import { useQuery } from '@tanstack/react-query';
import { lazy, useMemo, useRef } from 'react';
import { EllipsisIcon, MultiActionButton } from '..';
import { ptBR } from '../../languages';
import { Column, DateRange, Registry } from '../../models';
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
          menu: <RegisterMenu register={r} />,
        };
      }) ?? []
    );
  }, [data]);

  const columns: Column<(typeof parsedData)[number]>[] = [
    { value: 'typeAndTarget', width: '60%' },
    { value: 'priceWithDate', width: '30%' },
    { value: 'menu' },
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

interface RegisterMenuProps {
  register: Registry;
}

const options = [
  { icon: '', description: ptBR.comment },
  { icon: '', description: ptBR.delete },
  { icon: '', description: ptBR.edit },
];

function RegisterMenu({ register }: RegisterMenuProps) {
  return (
    <div className="flex w-full justify-end">
      <MultiActionButton
        buttonClassName="shadow-none hover:shadow-none active:shadow-none"
        containerClassName="flex items-center w-10"
        dialogClassName="justify-center overflow-visible"
        size="small"
        icon={
          <EllipsisIcon
            className="w-6 fill-hoki-800 stroke-0"
            viewBox="-8 0 24 24"
          />
        }>
        <div className="flex w-full flex-col">
          {options.map(({ icon, description }) => (
            <span
              className="flex flex-grow gap-1 rounded-md fill-hoki-800 stroke-hoki-800 px-3 py-1 text-xs text-hoki-800 hover:bg-cerulean-100 hover:fill-cerulean-800 hover:stroke-cerulean-800 hover:text-cerulean-800"
              key={description}>
              {icon}
              {description}
            </span>
          ))}
        </div>
      </MultiActionButton>
    </div>
  );
}
