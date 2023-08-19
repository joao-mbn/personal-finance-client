import { CurrencyInput, CurrencyInputProps } from '../../Base';
import { ControlledFieldBase, ControlledFieldBaseProps } from './ControlledFieldBase';

export interface ControlledCurrencyInputProps<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T
> extends Omit<ControlledFieldBaseProps<T, K>, 'render'> {
  value: number;
  currencyInputProps: Omit<CurrencyInputProps, 'onChange' | 'value'>;
}

export function ControlledCurrencyInput<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T
>({ value, currencyInputProps, ...props }: ControlledCurrencyInputProps<T, K>) {
  return (
    <ControlledFieldBase<T, K>
      {...props}
      render={({ isDirty, isValid }, onChange) => {
        console.log(isDirty);
        return (
          <CurrencyInput
            onChange={onChange as (value: number) => void}
            value={value}
            {...currencyInputProps}
          />
        );
      }}
    />
  );
}
