import classNames from 'classnames';
import { HTMLAttributes, ReactNode, useEffect, useMemo, useState } from 'react';
import { Input, InputProps, Options, OptionsTrigger } from '..';
import { useAppContext } from '../../contexts';
import { useClickPath } from '../../hooks';
import { AutocompleteOption, PartialBy } from '../../models';
import { REM_PX_RATIO } from '../../utils';

export interface AutocompleteProps<T extends AutocompleteOption>
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  disabled?: boolean;
  maxWidth?: string;
  onChange: (
    value: AutocompleteOption,
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.ChangeEvent<HTMLInputElement>
  ) => void;
  options: T[];
  placeholder?: string;
  value?: PartialBy<AutocompleteOption, 'key'>;
  template?: (option: T) => ReactNode;
  inputProps?: Omit<
    InputProps,
    'value' | 'placeholder' | 'disabled' | 'onClick' | 'onChange' | 'inputSize'
  >;
}

export function Autocomplete<T extends AutocompleteOption>({
  className,
  disabled = false,
  inputProps,
  onChange,
  options,
  maxWidth = 'max-w-[5rem]',
  placeholder = '',
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
    viewport: { vh },
  } = useAppContext();
  const optionsContainerMaxHeight = 10 * REM_PX_RATIO;

  useEffect(() => {
    !disabled && setIsActive(isInPath);
  }, [isInPath]);

  const suggestions = useMemo(
    () => options.filter(opt => findMatch(opt, value.value, 'includes')),
    [options, value]
  );

  function _onChange(
    { key, value, ...rest }: Partial<AutocompleteOption>,
    event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.ChangeEvent<HTMLInputElement>
  ) {
    if (key != null) {
      const newValue = options.find(opt => opt.key === key);
      newValue && onChange(newValue, event);
    } else if (value != null) {
      const newValue = { ...rest, value, key: crypto.randomUUID() };
      onChange(newValue, event);
    }
  }

  function findMatch(option: AutocompleteOption, value: string, operator: 'equals' | 'includes') {
    return operator === 'includes'
      ? option.value.toLocaleLowerCase().includes(value.toLocaleLowerCase().trim())
      : option.value.toLocaleLowerCase() === value.toLocaleLowerCase().trim();
  }

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
        className={classNames('flex w-full rounded-3xl border border-hoki-300', {
          'bg-white text-hoki-800 shadow transition-shadow focus-within:border-cerulean-800 focus-within:shadow-inner hover:border-cerulean-600':
            !disabled,
          'bg-hoki-50': disabled,
        })}>
        <Input
          className={classNames('flex-grow border-none !shadow-none', inputProps?.className)}
          disabled={disabled}
          inputSize="small"
          placeholder={placeholder}
          value={value.value ?? ''}
          onChange={e => {
            const {
              target: { value },
            } = e;
            const opt = options.find(opt => findMatch(opt, value, 'equals')) ?? {};
            _onChange({ value, ...opt }, e);
          }}
          onClick={() => {
            if (!isActive) {
              setIsActive(true);
              setOptionsTranslate();
            }
          }}
          {...inputProps}
        />
        <OptionsTrigger
          className="w-6 !shadow-none"
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
        options={suggestions}
        refAsProps={setOptionsContainerRef}
        selected={value.key ? [value.key] : []}
        template={template}
        onChange={(key, event) => {
          _onChange({ key }, event);
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
