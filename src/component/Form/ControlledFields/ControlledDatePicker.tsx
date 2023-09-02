import { DatePicker } from '../..';
import { ControlledFieldBase, ControlledFieldBaseProps } from './ControlledFieldBase';

export interface ControlledDatePickerProps<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T
> extends Omit<ControlledFieldBaseProps<T, K>, 'render'> {
  value: Date;
}

export function ControlledDatePicker<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T
>({ value, ...props }: ControlledDatePickerProps<T, K>) {
  return (
    <ControlledFieldBase<T, K>
      {...props}
      render={(_, onChange) => (
        <DatePicker
          className="gap-4"
          monthDropdownProps={{ className: 'w-full' }}
          onChange={onChange as (newValue: Date) => void}
          value={value}
          yearDropdownProps={{ className: 'w-full' }}
        />
      )}
    />
  );
}
