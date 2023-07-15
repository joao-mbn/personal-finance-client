import classNames from 'classnames';
import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  importance?: 'primary' | 'secondary' | 'tertiary';
  label?: ReactNode;
  size?: 'small' | 'medium' | 'large';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    icon,
    iconPosition = 'left',
    importance = 'tertiary',
    label,
    size = 'medium',
    disabled,
    ...props
  }: ButtonProps,
  ref
) {
  return (
    <button
      {...props}
      disabled={disabled}
      onClick={e => !disabled && props.onClick?.(e)}
      ref={ref}
      className={classNames(
        className,
        'flex items-center rounded-3xl border font-semibold disabled:opacity-40',
        {
          'shadow transition active:shadow-inner': !disabled,
          'flex-row-reverse': iconPosition === 'right',
          'gap-1 p-2 text-base': size === 'large',
          'gap-1 p-2 text-sm': size === 'medium',
          'text-xs': size === 'small',
          'border-cerulean-700 bg-cerulean-700 fill-cerulean-50 stroke-cerulean-50 text-cerulean-50 shadow-cerulean-700':
            importance === 'primary',
          'hover:border-cerulean-800 hover:bg-cerulean-800 hover:shadow-cerulean-800 active:shadow-cerulean-950':
            importance === 'primary' && !disabled,
          'border-cerulean-700 bg-white fill-cerulean-700 stroke-cerulean-700 text-cerulean-700 shadow-cerulean-300':
            importance === 'secondary',
          'hover:bg-cerulean-50 hover:shadow-cerulean-700 active:shadow-cerulean-700':
            importance === 'secondary' && !disabled,
          'border-transparent fill-cerulean-700 stroke-cerulean-700 text-cerulean-700 shadow-transparent':
            importance === 'tertiary',
          'hover:shadow-cerulean-700 active:shadow-cerulean-700':
            importance === 'tertiary' && !disabled,
        }
      )}>
      {icon}
      {label}
    </button>
  );
});
