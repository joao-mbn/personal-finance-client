import { lazy, useContext, useState } from 'react';
import { Button, DateRangePicker } from '..';
import { AppContext } from '../../contexts';
import { REM_PX_RATIO } from '../../utils';
import { FilterIcon } from '../Icons';

const Dialog = lazy(() => import('../Base/Dialog'));

interface WidgetFilterProps {}

export function WidgetFilter({ ...props }: WidgetFilterProps) {
  const [dialogRef, setDialogRef] = useState<HTMLDialogElement | null>(null);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
  const {
    viewportDimensions: { height: vh, width: vw },
  } = useContext(AppContext);

  return (
    <>
      <Button
        className="ml-auto"
        importance="tertiary"
        ref={setButtonRef}
        size="small"
        icon={
          <FilterIcon
            className="w-6 fill-none stroke-slate-500 stroke-2"
            viewBox="-8 -8 40 40"
          />
        }
        onClick={() => {
          if (!dialogRef || !buttonRef) return;

          const {
            left: buttonLeft,
            bottom: buttonBottom,
            top: buttonTop,
          } = buttonRef.getBoundingClientRect();

          const style = dialogRef.style;
          const maxButtonDistanceToBottom = 6 * REM_PX_RATIO;

          if (vh - buttonTop > maxButtonDistanceToBottom) {
            style.top = `${buttonBottom}px`;
          } else {
            style.top = `${buttonTop - maxButtonDistanceToBottom - 12}px`;
          }
          style.marginRight = `${vw - buttonLeft}px`;

          dialogRef.showModal();
        }}
      />
      <Dialog
        className="h- overflow-visible"
        containerClassName="flex !h-20 !w-48 items-center"
        ref={setDialogRef}>
        <DateRangePicker />
      </Dialog>
    </>
  );
}
