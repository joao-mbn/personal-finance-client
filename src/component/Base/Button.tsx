import classNames from 'classnames';
import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  flat?: boolean;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  importance?: 'primary' | 'secondary' | 'tertiary';
  label?: ReactNode;
  size?: 'small' | 'medium' | 'large';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    flat = false,
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
          transition: !disabled,
          'shadow active:shadow-inner': !disabled && !flat,
          'hover:shadow-cerulean-800 active:shadow-cerulean-950': !disabled && !flat,
          'flex-row-reverse': iconPosition === 'right',
          'gap-1 px-3 py-2 text-base': size === 'large',
          'gap-1 px-3 py-2 text-sm': size === 'medium',
          'gap-1 px-3 py-1 text-xs': size === 'small',
          'border-cerulean-700 bg-cerulean-700 fill-cerulean-50 stroke-cerulean-50 text-cerulean-50':
            importance === 'primary',
          'shadow-cerulean-700': importance !== 'tertiary' && !flat,
          'hover:border-cerulean-800 hover:bg-cerulean-800': importance === 'primary' && !disabled,
          'border-cerulean-700 bg-white fill-cerulean-700 stroke-cerulean-700 text-cerulean-700':
            importance === 'secondary',
          'hover:bg-cerulean-50': importance === 'secondary' && !disabled,
          'border-transparent fill-cerulean-700 stroke-cerulean-700 text-cerulean-700 shadow-transparent':
            importance === 'tertiary',
        }
      )}>
      {icon}
      {label}
    </button>
  );
});
