import classNames from 'classnames';
import { ForwardedRef, HTMLAttributes, Key, ReactNode } from 'react';
import { DropdownOption } from '../../models';

export interface OptionsProps<T extends DropdownOption>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  isActive: boolean;
  maxWidth: string;
  onChange: (option: Key, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  options: T[];
  refAsProps?: ForwardedRef<HTMLDivElement>;
  selected: Key[];
  template?: (option: T) => ReactNode;
}

export function Options<T extends DropdownOption>({
  className,
  isActive,
  maxWidth,
  onChange,
  options,
  refAsProps,
  selected,
  template,
  ...props
}: OptionsProps<T>) {
  return (
    <div
      ref={refAsProps}
      className={classNames(
        'absolute z-10 overflow-y-auto rounded-xl bg-white pt-1 text-xs text-cerulean-800 shadow-lg shadow-cerulean-900 transition-all duration-300',
        { 'invisible opacity-0': !isActive },
        className
      )}
      {...props}>
      <div className={classNames('flex flex-col')}>
        {options.map(option => {
          const { key, value, disabled: optionDisabled } = option;
          const valueIsSelected = selected.some(s => s === key);
          return (
            <div
              key={key}
              onClick={event => !optionDisabled && onChange(option.key, event)}
              className={classNames('truncate rounded-3xl px-2 py-1', {
                'hover:bg-cerulean-100': !valueIsSelected && !optionDisabled,
                'bg-cerulean-800 text-cerulean-50': valueIsSelected,
                'opacity-40': optionDisabled,
              })}>
              {template?.(option) ?? (
                <span className={classNames('truncate', maxWidth)}>{value}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
