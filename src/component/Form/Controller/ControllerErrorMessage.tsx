import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import { useFormContext } from '../FormContext';

export interface ControllerErrorMessageProps<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T
> extends HTMLAttributes<HTMLSpanElement> {
  field: K;
}

export function ControllerErrorMessage<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T
>({ field, className, ...props }: ControllerErrorMessageProps<T, K>) {
  const { metadata } = useFormContext<T>();
  const { errorMessage, isDirty, isValid } = metadata[field];

  return (
    <span
      {...props}
      className={classNames(className, {
        'text-hoki-800 opacity-70': isValid,
        'text-red-700': !isValid && isDirty,
      })}>
      {errorMessage}
    </span>
  );
}
