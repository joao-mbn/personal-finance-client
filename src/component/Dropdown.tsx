import classNames from 'classnames';
import { HTMLAttributes, ReactNode, useState } from 'react';
import { Button } from './Button';
import { ChevronIcon } from './Icons';

interface DropdownProps extends HTMLAttributes<HTMLElement> {
  options: { key: string | number; value: ReactNode }[];
}

export function Dropdown({ options }: DropdownProps) {
  const [selected, setSelected] = useState<(string | number)[]>([]);
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      <Button
        iconPosition="right"
        importance="tertiary"
        size="small"
        icon={
          <ChevronIcon
            className="w-6 fill-none stroke-slate-500 stroke-2"
            viewBox="-8 -8 40 40"
          />
        }
        onBlur={() => setIsActive(false)}
        onClick={() => setIsActive(prev => !prev)}>
        <span className="truncate">{selected.length ? selected.join(', ') : '-'}</span>
      </Button>
      <div className={classNames({ hidden: !isActive })}>
        {options.map(({ key, value }) => {
          const valueIsSelected = selected.some(opt => opt === key);
          return (
            <div
              className={classNames({ 'bg-cerulean-900 text-white': valueIsSelected })}
              key={key}
              onClick={() => {
                setSelected(prev =>
                  valueIsSelected ? prev.filter(opt => opt === key) : [...prev, key]
                );
              }}>
              {value}
            </div>
          );
        })}
      </div>
    </>
  );
}
