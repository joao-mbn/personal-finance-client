import classNames from 'classnames';
import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  importance: 'primary' | 'secondary' | 'tertiary';
  label?: ReactNode;
  size: 'small' | 'medium' | 'large';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    className,
    icon,
    iconPosition = 'left',
    importance,
    label,
    size,
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
      className={classNames(className, 'flex items-center rounded-3xl font-semibold', {
        'border shadow transition-shadow active:shadow-inner': !disabled,
        'opacity-40': disabled,
        'flex-row-reverse': iconPosition === 'right',
        'gap-1 p-2 text-base': size === 'large',
        'gap-1 p-2 text-sm': size === 'medium',
        'text-xs': size === 'small',
        'border-slate-700 bg-slate-700 fill-slate-50 stroke-slate-50 text-slate-50 shadow-slate-400 hover:border-slate-900 hover:bg-slate-900 hover:shadow-slate-800 active:shadow-slate-600':
          importance === 'primary',
        'border border-slate-900 fill-slate-900 stroke-slate-900 text-slate-900 shadow-slate-300 hover:shadow-slate-500 active:shadow-slate-400':
          importance === 'secondary',
        'border-transparent fill-slate-800 stroke-slate-800 text-slate-800 shadow-transparent hover:shadow-slate-400 active:shadow-slate-400':
          importance === 'tertiary',
      })}>
      {icon}
      {label}
    </button>
  );
});
