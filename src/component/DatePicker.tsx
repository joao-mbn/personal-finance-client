import { Ref } from 'react';
import { Dropdown, Overlay } from '.';

interface DatePickerProps {
  dialogRef?: Ref<HTMLDialogElement>;
}

export function DatePicker({ dialogRef: ref }: DatePickerProps) {
  return (
    <Overlay
      ref={ref}
      className="w-40">
      <div className="flex gap-1">
        <Dropdown
          options={Array(11)
            .fill('')
            .map((_, i) => ({
              key: i,
              value: new Date(0, i).toLocaleDateString('pt-BR', { month: 'long' }),
            }))}
        />
        <Dropdown
          options={Array(11)
            .fill('')
            .map((_, i) => ({
              key: i,
              value: new Date(0, i).toLocaleDateString('pt-BR', { month: 'long' }),
            }))}
        />
      </div>
    </Overlay>
  );
}
