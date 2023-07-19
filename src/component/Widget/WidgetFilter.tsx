import { lazy, useEffect, useState } from 'react';
import { MultiActionButton } from '..';
import { DateRange } from '../../models';
import { FilterIcon } from '../Icons';

const DateRangePicker = lazy(() => import('../Base/DateRangePicker'));

export interface WidgetFilterProps {
  updateWidgetFilter: (filter: DateRange) => void;
  initialFilter: DateRange;
}

export function WidgetFilter({ initialFilter, updateWidgetFilter }: WidgetFilterProps) {
  const [tempFilter, setTempFilter] = useState(initialFilter);
  const [shouldSend, setShouldSend] = useState(false);
  useEffect(() => {
    if (shouldSend) {
      updateWidgetFilter(tempFilter);
      setShouldSend(false);
    }
  }, [shouldSend, tempFilter]);

  return (
    <>
      <MultiActionButton
        buttonClassName="ml-auto"
        containerClassName="flex items-center w-min"
        dialogClassName="justify-center overflow-visible"
        onClose={() => setShouldSend(true)}
        size="small"
        icon={
          <FilterIcon
            className="w-6 fill-none stroke-2"
            viewBox="-8.5 -9 40 40"
          />
        }
        flat>
        <DateRangePicker
          onChange={filter => setTempFilter(filter)}
          range={tempFilter}
        />
      </MultiActionButton>
    </>
  );
}
