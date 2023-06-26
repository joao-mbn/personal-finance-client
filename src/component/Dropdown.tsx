import classNames from 'classnames';
import { ReactNode, useState } from 'react';
import { Button } from './Button';
import { ChevronIcon } from './Icons';

interface DropdownProps<T> {
  options: T[];
  onChange: (option: T, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  placeholder?: string;
  selected?: T[];
  template?: (option: T) => ReactNode;
}

export function Dropdown<T extends { key: number | string; value: ReactNode; disabled?: boolean }>({
  onChange,
  options,
  placeholder = ' ',
  selected = [],
  template,
}: DropdownProps<T>) {
  const [isActive, setIsActive] = useState(false);
  console.log(selected);

  return (
    <div className="w-32 p-1">
      <Button
        className="w-full"
        iconPosition="right"
        importance="secondary"
        size="small"
        icon={
          <ChevronIcon
            viewBox="-12 -16 48 48"
            className={classNames('w-6 fill-none stroke-slate-500 stroke-2', {
              'rotate-180': isActive,
            })}
          />
        }
        label={
          <span className="w-24 truncate pl-2 text-left">
            {selected.length ? selected.map(s => s.value).join(', ') : placeholder}
          </span>
        }
        onClick={() => setIsActive(prev => !prev)}
      />
      <div className="max-h-[10rem] overflow-y-auto  rounded-xl pt-1 text-xs text-slate-600 shadow-lg shadow-slate-400">
        <div className={classNames('z-10 flex flex-col', { hidden: !isActive })}>
          {options.map(option => {
            const { key, value, disabled } = option;
            const valueIsSelected = selected.some(opt => opt.key === key);
            return (
              <div
                key={key}
                className={classNames('truncate rounded-3xl px-2 py-1', {
                  'bg-cerulean-900 text-white': valueIsSelected,
                })}
                onClick={event => {
                  !disabled && onChange(option, event);
                }}>
                {template?.(option) ?? value}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
