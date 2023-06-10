import classNames from 'classnames';
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  importance: 'primary' | 'secondary' | 'tertiary';
  label: string;
  size: 'small' | 'medium' | 'large';
}

export function Button({
  className,
  icon,
  iconPosition = 'left',
  importance,
  label,
  size,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={classNames(className, 'flex items-center rounded-3xl font-semibold', {
        'flex-row-reverse': iconPosition === 'right',
        'gap-1 p-2 text-base': size === 'large',
        'gap-1 p-2 text-sm': size === 'medium',
        'text-xs': size === 'small',
        'bg-cerulean-900 text-white': importance === 'primary',
        'border border-cerulean-900 bg-white text-cerulean-900': importance === 'secondary',
        'bg-white text-cerulean-800 hover:underline active:bg-cerulean-900 active:underline':
          importance === 'tertiary',
      })}>
      {icon}
      {label}
    </button>
  );
}
