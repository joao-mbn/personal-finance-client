import classNames from 'classnames';
import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize: 'small' | 'medium' | 'large';
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, inputSize, disabled, ...props }: InputProps,
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
        'flex items-center rounded-3xl border border-cerulean-200 bg-white font-semibold placeholder:text-cerulean-950/60 disabled:bg-cerulean-50 disabled:text-cerulean-950/40 disabled:placeholder:text-transparent',
        {
          'text-cerulean-950 shadow transition-shadow hover:border-cerulean-600 focus:border-cerulean-950 focus:shadow-inner active:border-cerulean-950 active:shadow-inner':
            !disabled,
          'px-3 py-1 text-xs': inputSize === 'small',
          'px-3 py-1.5 text-sm': inputSize === 'medium',
          'px-3 py-2 text-base': inputSize === 'large',
        }
      )}
    />
  );
});
