import classNames from 'classnames';
import { HTMLAttributes } from 'react';

export interface ControllerLabelProps extends HTMLAttributes<HTMLSpanElement> {
  isDirty: boolean;
  isValid: boolean;
  label: string;
}

export function ControllerLabel({
  isDirty,
  isValid,
  label,
  className,
  ...props
}: ControllerLabelProps) {
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
