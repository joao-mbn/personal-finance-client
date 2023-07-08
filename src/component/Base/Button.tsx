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
      ref={ref}
      className={classNames(className, 'flex items-center rounded-3xl font-semibold', {
        'flex-row-reverse': iconPosition === 'right',
        'gap-1 p-2 text-base': size === 'large',
        'gap-1 p-2 text-sm': size === 'medium',
        'text-xs': size === 'small',
        'opacity-40': disabled,
        'bg-slate-900 fill-slate-50 stroke-slate-50 text-slate-50': importance === 'primary',
        'border border-slate-900 bg-slate-300 fill-slate-900 stroke-slate-900 text-slate-900':
          importance === 'secondary',
        'border border-slate-900 fill-slate-800 stroke-slate-800 text-slate-800':
          importance === 'tertiary',
      })}>
      {icon}
      {label}
    </button>
  );
});
