import {
  Controller,
  ControllerErrorMessage,
  ControllerErrorMessageProps,
  ControllerLabel,
  ControllerLabelProps,
  ControllerProps,
} from '..';

export interface ControlledFieldBaseProps<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T
> extends ControllerProps<T, K>,
    Pick<ControllerLabelProps<T, K>, 'label'> {
  labelProps?: Omit<ControllerLabelProps<T, K>, 'label'>;
  errorMessageProps?: Omit<ControllerErrorMessageProps<T, K>, 'field'>;
}

export function ControlledFieldBase<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T
>({ field, label, labelProps, errorMessageProps, ...props }: ControlledFieldBaseProps<T, K>) {
  return (
    <div className="flex flex-col gap-1">
      <ControllerLabel<T, K>
        {...labelProps}
        field={field}
        label={label}
      />
      <Controller<T, K>
        {...props}
        field={field}
      />
      <ControllerErrorMessage<T, K>
        {...errorMessageProps}
        field={field}
      />
    </div>
  );
}
