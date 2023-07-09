import { lazy, useContext, useEffect, useState } from 'react';
import { Button, DateRangePicker, DialogForwardedRef } from '..';
import { AppContext } from '../../contexts';
import { DateRange } from '../../models';
import { REM_PX_RATIO } from '../../utils';
import { FilterIcon } from '../Icons';

const Dialog = lazy(() => import('../Base/Dialog'));

export interface WidgetFilterProps {
  updateWidgetFilter: (filter: DateRange) => void;
  initialFilter: DateRange;
}

export function WidgetFilter({ initialFilter, updateWidgetFilter }: WidgetFilterProps) {
  const [dialogRef, setDialogRef] = useState<DialogForwardedRef>(null);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
  const {
    viewportDimensions: { height: vh, width: vw },
  } = useContext(AppContext);

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
      <Button
        className="ml-auto"
        importance="tertiary"
        ref={setButtonRef}
        size="small"
        icon={
          <FilterIcon
            className="w-6 fill-none stroke-2"
            viewBox="-8.5 -9 40 40"
          />
        }
        onClick={() => {
          if (!dialogRef || !buttonRef) return;

          const {
            left: buttonLeft,
            bottom: buttonBottom,
            top: buttonTop,
          } = buttonRef.getBoundingClientRect();
          const maxButtonDistanceToBottom = 6 * REM_PX_RATIO;

          let top: string;
          if (vh - buttonTop > maxButtonDistanceToBottom) {
            top = `${buttonBottom}px`;
          } else {
            top = `${buttonTop - maxButtonDistanceToBottom - 12}px`;
          }
          const marginRight = `${vw - buttonLeft}px`;

          dialogRef.setStyle({ top, marginRight });
          dialogRef.showModal();
        }}
      />
      <Dialog
        className="justify-center overflow-visible"
        containerClassName="flex !h-20 !w-48 items-center"
        onClose={() => setShouldSend(true)}
        ref={setDialogRef}>
        <DateRangePicker
          onChange={filter => setTempFilter(filter)}
          range={tempFilter}
        />
      </Dialog>
    </>
  );
}
