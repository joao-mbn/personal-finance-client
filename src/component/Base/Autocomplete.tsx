import classNames from 'classnames';
import { HTMLAttributes, Key, ReactNode, useContext, useEffect, useState } from 'react';
import { ChevronIcon, Options } from '..';
import { AppContext } from '../../contexts';
import { useClickPath } from '../../hooks';
import { DropdownOption } from '../../models';
import { REM_PX_RATIO } from '../../utils';
import { Button } from './Button';

export interface AutocompleteProps<T extends DropdownOption>
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

export function Autocomplete<T extends DropdownOption>({
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
}: AutocompleteProps<T>) {
  const [isActive, setIsActive] = useState(false);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const [optionsContainerRef, setOptionsContainerRef] = useState<HTMLDivElement | null>(null);
  const [buttonRef, setButtonRef] = useState<HTMLButtonElement | null>(null);
  const isInPath = useClickPath(containerRef);
  const {
    viewportDimensions: { height: vh },
  } = useContext(AppContext);

  useEffect(() => {
    !disabled && setIsActive(isInPath);
  }, [isInPath]);

  const _selected = Array.isArray(selected) ? selected : [selected];

  const optionsContainerMaxHeight = 10 * REM_PX_RATIO;
  const showPlaceholder = !_selected.length && options.length && !disabled;

  return (
    <div
      className={classNames('flex flex-col px-1', className)}
      ref={setContainerRef}
      {...props}>
      <Button
        className="w-full !bg-white !text-cerulean-950 !shadow-md hover:!bg-cerulean-50"
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
              'text-cerulean-950/60': showPlaceholder,
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
      <Options<T>
        isActive={isActive}
        maxWidth={maxWidth}
        options={options}
        refAsProps={setOptionsContainerRef}
        selected={_selected}
        template={template}
        onChange={(key, event) => {
          onChange(key, event);
          !multiSelect && setIsActive(false);
        }}
        style={{
          maxHeight: optionsContainerMaxHeight,
          width: buttonRef?.getBoundingClientRect().width,
        }}
      />
    </div>
  );
}
