import classNames from 'classnames';
import { HTMLAttributes, Key, ReactNode, useEffect, useState } from 'react';
import { ChevronIcon } from '..';
import { useClickPath } from '../../hooks';
import { Button } from './Button';

export type DropdownOption = {
  key: Key;
  value: ReactNode;
  disabled?: boolean;
};

interface DropdownProps<T extends DropdownOption>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  options: T[];
  onChange: (option: Key, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  maxWidth?: string;
  multiSelect?: boolean;
  placeholder?: string;
  selected?: Key | Key[];
  template?: (option: T) => ReactNode;
}

export function Dropdown<T extends DropdownOption>({
  className,
  onChange,
  options,
  maxWidth = 'max-w-[5rem]',
  multiSelect = false,
  placeholder = ' ',
  selected = [],
  template,
  ...props
}: DropdownProps<T>) {
  const [isActive, setIsActive] = useState(false);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const isInPath = useClickPath(containerRef);
  const _selected = Array.isArray(selected) ? selected : [selected];

  useEffect(() => setIsActive(isInPath), [isInPath]);

  return (
    <div
      className={classNames('flex flex-col px-1', className)}
      ref={setContainerRef}
      {...props}>
      <Button
        className="w-full"
        iconPosition="right"
        importance="secondary"
        onClick={() => setIsActive(prev => !prev)}
        size="small"
        icon={
          <ChevronIcon
            viewBox="-12 -16 48 48"
            className={classNames('w-6 fill-none stroke-slate-500 stroke-2', {
              'rotate-180': !isActive,
            })}
          />
        }
        label={
          <span className={classNames('mr-auto truncate pl-2 text-left', maxWidth)}>
            {_selected.length && options.length
              ? options
                  .filter(o => _selected.some(s => s === o.key))
                  .map(o => o.value)
                  .join(', ')
              : placeholder}
          </span>
        }
      />
      <div
        className={classNames(
          'z-10 max-h-[10rem] overflow-y-auto rounded-xl bg-slate-50 pt-1 text-xs text-slate-700 shadow-lg shadow-slate-500',
          { hidden: !isActive }
        )}>
        <div className={classNames('flex flex-col')}>
          {options.map(option => {
            const { key, value, disabled } = option;
            const valueIsSelected = _selected.some(s => s === key);
            return (
              <div
                key={key}
                className={classNames('truncate rounded-3xl px-2 py-1', {
                  'bg-slate-900 text-slate-50': valueIsSelected,
                  'text-slate-400': disabled,
                })}
                onClick={event => {
                  !disabled && onChange(option.key, event);
                  !disabled && !multiSelect && setIsActive(false);
                }}>
                {template?.(option) ?? (
                  <span className={classNames('truncate', maxWidth)}>{value}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
