import classNames from 'classnames';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { Button } from './Button';
import { ChevronIcon } from './Icons';

interface DropdownProps<T> {
  options: T[];
  onChange: (option: T, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  multiSelect?: boolean;
  placeholder?: string;
  selected?: T[];
  template?: (option: T) => ReactNode;
}

export function Dropdown<T extends { key: number | string; value: ReactNode; disabled?: boolean }>({
  onChange,
  options,
  multiSelect = false,
  placeholder = ' ',
  selected = [],
  template,
}: DropdownProps<T>) {
  const [isActive, setIsActive] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getPath = (event: MouseEvent) => {
      const div = containerRef.current;
      if (!div) return setIsActive(false);

      const path = event.composedPath();
      const shouldClose = !path.includes(containerRef.current);
      shouldClose && setIsActive(false);
    };
    window.addEventListener('click', getPath);

    return () => window.removeEventListener('click', getPath);
  }, []);

  return (
    <div
      className="w-32 p-1"
      ref={containerRef}>
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
          <span className="mr-auto w-2/3 truncate pl-2 text-left">
            {selected.length ? selected.map(s => s.value).join(', ') : placeholder}
          </span>
        }
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
                  !multiSelect && setIsActive(false);
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
