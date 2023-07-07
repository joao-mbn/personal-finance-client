import classNames from 'classnames';
import { HTMLAttributes, Key, ReactNode, useContext, useEffect, useState } from 'react';
import { ChevronIcon } from '..';
import { AppContext } from '../../contexts';
import { useClickPath } from '../../hooks';
import { DropdownOption } from '../../models';
import { REM_PX_RATIO } from '../../utils';
import { Button } from './Button';

interface DropdownProps<T extends DropdownOption>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  disabled?: boolean;
  maxWidth?: string;
  multiSelect?: boolean;
  onChange: (option: Key, event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  options: T[];
  placeholder?: string;
  selected?: Key | Key[];
  template?: (option: T) => ReactNode;
}

export function Dropdown<T extends DropdownOption>({
  className,
  disabled = false,
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
  const [optionsContainerRef, setOptionsContainerRef] = useState<HTMLDivElement | null>(null);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
  const isInPath = useClickPath(containerRef);
  const {
    viewportDimensions: { height: vh },
  } = useContext(AppContext);

  useEffect(() => setIsActive(isInPath), [isInPath]);

  const _selected = Array.isArray(selected) ? selected : [selected];

  const optionsContainerMaxHeight = 10 * REM_PX_RATIO;
  const showPlaceholder = !(_selected.length && options.length);

  return (
    <div
      className={classNames('flex flex-col px-1', className)}
      ref={setContainerRef}
      {...props}>
      <Button
        className="w-full"
        disabled={disabled}
        iconPosition="right"
        importance="secondary"
        ref={setButtonRef}
        size="small"
        icon={
          <ChevronIcon
            className={classNames('w-6 stroke-1 transition-transform', { 'rotate-180': !isActive })}
            viewBox="-12 -16 48 48"
          />
        }
        label={
          <span
            className={classNames('mr-auto truncate pl-2 text-left font-normal', maxWidth, {
              'text-slate-400': showPlaceholder,
            })}>
            {showPlaceholder
              ? placeholder
              : options
                  .filter(o => _selected.some(s => s === o.key))
                  .map(o => o.value)
                  .join(', ')}
          </span>
        }
        onClick={() => {
          setIsActive(prev => !prev);

          if (!optionsContainerRef || !buttonRef) return;

          const { bottom: buttonBottom, height: buttonHeight } = buttonRef.getBoundingClientRect();

          const style = optionsContainerRef.style;
          if (vh - buttonBottom < optionsContainerMaxHeight) {
            const translateY = -(optionsContainerMaxHeight + 0.25 * REM_PX_RATIO);
            style.translate = `0 ${translateY}px`;
          } else {
            style.translate = `0 ${buttonHeight}px`;
          }
        }}
      />
      <div
        ref={setOptionsContainerRef}
        className={classNames(
          'absolute z-10 overflow-y-auto rounded-xl bg-slate-50 pt-1 text-xs text-slate-700 shadow-lg shadow-slate-500 transition-all',
          { 'invisible opacity-0': !isActive }
        )}
        style={{
          maxHeight: optionsContainerMaxHeight,
          width: buttonRef?.getBoundingClientRect().width,
        }}>
        <div className={classNames('flex flex-col')}>
          {options.map(option => {
            const { key, value, disabled: optionDisabled } = option;
            const valueIsSelected = _selected.some(s => s === key);
            return (
              <div
                key={key}
                className={classNames('truncate rounded-3xl px-2 py-1', {
                  'hover:bg-slate-300': !valueIsSelected && !optionDisabled,
                  'bg-slate-900 text-slate-50': valueIsSelected,
                  'text-slate-400': optionDisabled,
                })}
                onClick={event => {
                  !optionDisabled && onChange(option.key, event);
                  !optionDisabled && !multiSelect && setIsActive(false);
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
