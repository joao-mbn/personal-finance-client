import {
  Controller,
  ControllerLabel,
  ControllerLabelProps,
  ControllerProps,
  useFormContext,
} from '..';

export interface ControlledFieldBaseProps<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T
> extends ControllerProps<T, K>,
    Pick<ControllerLabelProps, 'label'> {
  labelProps?: Omit<ControllerLabelProps, 'label' | 'isDirty' | 'isValid'>;
}

export function ControlledFieldBase<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T
>({ field, label, labelProps, ...props }: ControlledFieldBaseProps<T, K>) {
  const { metadata } = useFormContext<T>();

  const { isDirty, isValid } = metadata[field];

  return (
    <div>
      <ControllerLabel
        {...labelProps}
        isDirty={isDirty}
        isValid={isValid}
        label={label}
      />
      <Controller<T, K>
        {...props}
        field={field}
      />
    </div>
  );
}
