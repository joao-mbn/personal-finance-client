import classNames from 'classnames';
import { InputHTMLAttributes, forwardRef } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize: 'small' | 'medium' | 'large';
  error?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, inputSize, disabled, error = false, ...props }: InputProps,
  ref
) {
  return (
    <input
      {...props}
      disabled={disabled}
      onChange={e => !disabled && props.onChange?.(e)}
      ref={ref}
      className={classNames(
        className,
        'flex items-center rounded-3xl border border-hoki-300 bg-white text-hoki-800 disabled:bg-hoki-50 disabled:text-hoki-800/40',
        {
          'shadow transition-shadow ': !disabled,
          'hover:border-cerulean-600 focus:border-cerulean-800 focus:shadow-inner active:border-cerulean-800 active:shadow-inner':
            !disabled && !error,
          'border-red-700': !disabled && error,
          'px-3 py-1 text-xs': inputSize === 'small',
          'px-3 py-1.5 text-sm': inputSize === 'medium',
          'px-3 py-2 text-base': inputSize === 'large',
        }
      )}
    />
  );
});
