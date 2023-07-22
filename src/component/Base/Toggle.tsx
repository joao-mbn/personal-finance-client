import classNames from 'classnames';
import { forwardRef } from 'react';
import { Button, ButtonProps } from '.';

export interface ToggleProps extends Omit<ButtonProps, 'label' | 'iconPosition' | 'importance'> {
  isActive: boolean;
}

export const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(function Toggle(
  { className, icon, disabled, isActive, ...props }: ToggleProps,
  ref
) {
  return (
    <Button
      disabled={disabled}
      importance={isActive ? 'primary' : 'secondary'}
      ref={ref}
      className={classNames(className, 'w-12 border-0 !px-0.5 !py-0.5', {
        'border-hoki-200 !bg-hoki-200': !isActive,
        'shadow-hoki-300 hover:border-hoki-300 hover:!bg-hoki-300 hover:shadow-hoki-600 active:shadow-hoki-600':
          !isActive && !disabled,
      })}
      icon={
        icon ?? (
          <div
            className={classNames(
              'm-0 h-5 w-5 rounded-full bg-white p-0 shadow-sm transition-transform',
              { 'translate-x-6 shadow-hoki-600': !isActive, 'shadow-cerulean-950': isActive }
            )}
          />
        )
      }
      {...props}
    />
  );
});
