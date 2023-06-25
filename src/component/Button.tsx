import classNames from 'classnames';
import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  importance: 'primary' | 'secondary' | 'tertiary';
  label?: string;
  size: 'small' | 'medium' | 'large';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { className, icon, iconPosition = 'left', importance, label, size, ...props }: ButtonProps,
  ref
) {
  return (
    <button
      {...props}
      ref={ref}
      className={classNames(className, 'flex items-center rounded-3xl font-semibold', {
        'flex-row-reverse': iconPosition === 'right',
        'gap-1 p-2 text-base': size === 'large',
        'gap-1 p-2 text-sm': size === 'medium',
        'text-xs': size === 'small',
        'bg-slate-900 text-slate-50': importance === 'primary',
        'border border-slate-900 bg-slate-50 text-slate-900': importance === 'secondary',
        'bg-slate-50 text-slate-800 hover:underline active:bg-slate-900 active:underline':
          importance === 'tertiary',
      })}>
      {icon}
      {label}
    </button>
  );
});
