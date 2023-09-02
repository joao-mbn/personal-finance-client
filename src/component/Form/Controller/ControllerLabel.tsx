import classNames from 'classnames';
import { HTMLAttributes } from 'react';
import { useFormContext } from '..';

export interface ControllerLabelProps<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T
> extends HTMLAttributes<HTMLSpanElement> {
  field: K;
  label: string;
}

export function ControllerLabel<T extends Record<string, unknown>, K extends keyof T = keyof T>({
  field,
  label,
  className,
  ...props
}: ControllerLabelProps<T, K>) {
  const { metadata } = useFormContext<T>();
  const { isDirty, isValid } = metadata[field];

  return (
    <span
      {...props}
      className={classNames(className, {
        'text-hoki-800 opacity-70': isValid,
        'text-red-700': !isValid && isDirty,
      })}>
      {label}
    </span>
  );
}
