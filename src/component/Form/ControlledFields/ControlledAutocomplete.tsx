import { AutocompleteOption } from '../../../models';
import { Autocomplete, AutocompleteProps } from '../../Base';
import { ControlledFieldBase, ControlledFieldBaseProps } from './ControlledFieldBase';

export interface ControlledAutocompleteProps<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T,
  Z extends AutocompleteOption = AutocompleteOption
> extends Omit<ControlledFieldBaseProps<T, K>, 'render'> {
  value?: Z;
  autocompleteProps: Omit<AutocompleteProps<Z>, 'onChange' | 'value'>;
}

export function ControlledAutocomplete<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T,
  Z extends AutocompleteOption = AutocompleteOption
>({ value, autocompleteProps, ...props }: ControlledAutocompleteProps<T, K, Z>) {
  return (
    <ControlledFieldBase<T, K>
      {...props}
      render={({ isDirty, isValid }, onChange) => (
        <Autocomplete
          {...autocompleteProps}
          error={isDirty && !isValid}
          onChange={onChange as (value: AutocompleteOption) => void}
          value={value}
        />
      )}
    />
  );
}
