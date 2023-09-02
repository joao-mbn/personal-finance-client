import { TextArea, TextAreaProps } from '../../Base';
import { ControlledFieldBase, ControlledFieldBaseProps } from './ControlledFieldBase';

export interface ControlledTextAreaProps<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T
> extends Omit<ControlledFieldBaseProps<T, K>, 'render'> {
  value?: string;
  textAreaProps: Omit<TextAreaProps, 'onChange' | 'value'>;
}

export function ControlledTextArea<T extends Record<string, unknown>, K extends keyof T = keyof T>({
  value,
  textAreaProps,
  ...props
}: ControlledTextAreaProps<T, K>) {
  return (
    <ControlledFieldBase<T, K>
      {...props}
      render={({ isDirty, isValid }, onChange) => (
        <TextArea
          error={isDirty && !isValid}
          onChange={event => (onChange as (value: string) => void)(event.target.value)}
          value={value}
          {...textAreaProps}
        />
      )}
    />
  );
}
