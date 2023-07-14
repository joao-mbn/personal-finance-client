import classNames from 'classnames';
import { ForwardedRef, HTMLAttributes, Key, ReactNode, forwardRef } from 'react';
import { Button, ButtonProps, ChevronIcon } from '..';
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
        'absolute z-10 overflow-y-auto rounded-xl bg-white text-xs text-hoki-800 shadow-lg shadow-hoki-900 transition-all duration-300',
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
              className={classNames('truncate rounded-3xl px-3 py-1', {
                'hover:bg-cerulean-100 hover:text-cerulean-800':
                  !valueIsSelected && !optionDisabled,
                'bg-cerulean-800 text-white': valueIsSelected,
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

interface OptionsTriggerProps extends ButtonProps {
  isActive: boolean;
  disabled: boolean;
}

export const OptionsTrigger = forwardRef<HTMLButtonElement, OptionsTriggerProps>(
  function OptionsTrigger({ disabled, isActive, ...props }: OptionsTriggerProps, ref) {
    return (
      <Button
        {...props}
        disabled={disabled}
        ref={ref}
        size="small"
        className={classNames(
          props.className,
          '!bg-white !fill-cerulean-900 !stroke-cerulean-900 !text-hoki-800 disabled:!bg-hoki-50 disabled:!fill-hoki-800/40 disabled:!stroke-hoki-800/40 disabled:!text-hoki-800/40 disabled:!opacity-100'
        )}
        icon={
          <ChevronIcon
            viewBox="-12 -16 48 48"
            className={classNames('w-6 stroke-1 transition-transform', {
              'rotate-180': !isActive,
            })}
          />
        }
      />
    );
  }
);
