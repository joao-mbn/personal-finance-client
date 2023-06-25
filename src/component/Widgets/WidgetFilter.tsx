import { useRef } from 'react';
import { Button, DatePicker } from '..';
import { DATE_PICKER_WIDTH, REM_PX_RATIO } from '../../utils';
import { FilterIcon } from '../Icons';

interface WidgetFilterProps {}

export function WidgetFilter({ ...props }: WidgetFilterProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <Button
        className="ml-auto"
        importance="tertiary"
        size="small"
        icon={
          <FilterIcon
            className="w-6 fill-none stroke-slate-500 stroke-2"
            viewBox="-8 -8 40 40"
          />
        }
        onClick={({ clientX, clientY }) => {
          if (!dialogRef.current) return;

          const dialog = dialogRef.current;
          const style = dialog.style;

          style.left = `${clientX - (DATE_PICKER_WIDTH - 1) * REM_PX_RATIO}px`;
          style.top = `${clientY}px`;
          dialog.showModal();
        }}
      />
      <DatePicker dialogRef={dialogRef} />
    </>
  );
}
