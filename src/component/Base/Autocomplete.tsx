import classNames from 'classnames';
import { HTMLAttributes, ReactNode, useContext, useEffect, useMemo, useState } from 'react';
import { Input, Options, OptionsTrigger } from '..';
import { AppContext } from '../../contexts';
import { useClickPath } from '../../hooks';
import { AutocompleteOption, PartialBy } from '../../models';
import { REM_PX_RATIO } from '../../utils';

export interface AutocompleteProps<T extends AutocompleteOption>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  disabled?: boolean;
  maxWidth?: string;
  onChange: (
    value: Partial<AutocompleteOption>,
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.ChangeEvent<HTMLInputElement>
  ) => void;
  options: T[];
  placeholder?: string;
  value?: PartialBy<AutocompleteOption, 'key'>;
  template?: (option: T) => ReactNode;
}

export function Autocomplete<T extends AutocompleteOption>({
  className,
  disabled = false,
  onChange,
  options,
  maxWidth = 'max-w-[5rem]',
  placeholder = ' ',
  value = { value: '' },
  template,
  ...props
}: AutocompleteProps<T>) {
  const [isActive, setIsActive] = useState(false);

  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const [optionsContainerRef, setOptionsContainerRef] = useState<HTMLDivElement | null>(null);
  const [headerRef, setHeaderRef] = useState<HTMLDivElement | null>(null);

  const isInPath = useClickPath(containerRef);
  const {
    viewportDimensions: { height: vh },
  } = useContext(AppContext);

  const _options = useMemo(
    () => options.filter(opt => findMatch(opt, value.value, 'includes')),
    [options, value]
  );

  useEffect(() => {
    !disabled && setIsActive(isInPath);
  }, [isInPath]);

  function findMatch(option: AutocompleteOption, value: string, operator: 'equals' | 'includes') {
    return operator === 'includes'
      ? option.value.toLocaleLowerCase().includes(value.toLocaleLowerCase().trim())
      : option.value.toLocaleLowerCase() === value.toLocaleLowerCase().trim();
  }

  const optionsContainerMaxHeight = 10 * REM_PX_RATIO;

  function setOptionsTranslate() {
    if (!optionsContainerRef || !headerRef) return;

    const { bottom, height } = headerRef.getBoundingClientRect();

    const style = optionsContainerRef.style;
    if (vh - bottom < optionsContainerMaxHeight) {
      const translateY = -(optionsContainerMaxHeight + 0.25 * REM_PX_RATIO);
      style.translate = `0 ${translateY}px`;
    } else {
      style.translate = `0 ${height}px`;
    }
  }

  return (
    <div
      className={classNames('flex flex-col', className)}
      ref={setContainerRef}
      {...props}>
      <div
        ref={setHeaderRef}
        className={classNames('flex w-full rounded-3xl border border-cerulean-200 bg-white', {
          'text-cerulean-950 shadow transition-shadow focus-within:border-cerulean-950 focus-within:shadow-inner hover:border-cerulean-600 active:border-cerulean-950 active:shadow-inner':
            !disabled,
        })}>
        <Input
          className="flex-grow border-none !shadow-none"
          disabled={disabled}
          inputSize="small"
          placeholder={placeholder}
          value={value?.value ?? ''}
          onChange={e => {
            const {
              target: { value },
            } = e;
            const opt = options.find(opt => findMatch(opt, value, 'equals')) ?? {};
            onChange({ value, ...opt }, e);
          }}
          onClick={() => {
            if (!isActive) {
              setIsActive(true);
              setOptionsTranslate();
            }
          }}
        />
        <OptionsTrigger
          className="w-6 !bg-white !text-cerulean-950 !shadow-none"
          disabled={disabled}
          isActive={isActive}
          onClick={() => {
            setIsActive(prev => !prev);
            setOptionsTranslate();
          }}
        />
      </div>
      <Options<T>
        isActive={isActive}
        maxWidth={maxWidth}
        options={_options}
        refAsProps={setOptionsContainerRef}
        selected={value.key ? [value.key] : []}
        template={template}
        onChange={(key, event) => {
          onChange({ key }, event);
          setIsActive(false);
        }}
        style={{
          maxHeight: optionsContainerMaxHeight,
          width: headerRef?.getBoundingClientRect().width,
        }}
      />
    </div>
  );
}
