import classNames from 'classnames';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Input, InputProps } from '..';
import { formatNumber, getCurrencySymbol, getThousandSeparator } from '../../utils';

export interface CurrencyInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  value: number;
  onChange?: (newValue: number, event: React.ChangeEvent<HTMLInputElement>) => void;
}

type Ref = HTMLInputElement | null;

export const CurrencyInput = forwardRef<Ref, CurrencyInputProps>(function CurrencyInput(
  { value, onChange, className, ...props }: CurrencyInputProps,
  ref
) {
  const [_ref, setRef] = useState<Ref>(null);
  useImperativeHandle<Ref, Ref>(ref, () => _ref, [_ref]);

  const formattedValue = formatNumber('pt-BR', value, {
    minimumFractionDigits: 2,
    signDisplay: 'never',
  });

  const selectionEndRef = useRef<number>(0);
  const previousValueRef = useRef<string>(formattedValue);

  useEffect(() => {
    // When the formatted value grows or shrinks so that a thousand separator
    // is added or removed, the cursor gets misplaced.
    const currentThousandSeparatorCount = countThousandSeparatorMatch(formattedValue);
    const previousThousandSeparatorCount = countThousandSeparatorMatch(previousValueRef.current);
    const thousandSeparatorDiff = currentThousandSeparatorCount - previousThousandSeparatorCount;

    const selection = selectionEndRef.current + thousandSeparatorDiff;
    _ref?.setSelectionRange(selection, selection);
  }, [_ref, formattedValue, value]);

  return (
    <div className="flex items-center overflow-hidden rounded-3xl border border-hoki-300">
      <span className="flex h-full items-center bg-cerulean-700 pl-3 pr-2 text-cerulean-50">
        {getCurrencySymbol('pt-BR', 'BRL')}
      </span>
      <span className="px-1">{value > 0 ? '+' : value < 0 ? '-' : ''}</span>
      <Input
        {...props}
        className={classNames(className, 'border-0 pl-0 shadow-none')}
        ref={setRef}
        value={formattedValue}
        onChange={event => {
          selectionEndRef.current = event.target.selectionEnd ?? 0;
          previousValueRef.current = formattedValue;

          const isNegative = event.target.value.startsWith('-');
          const valueStrippedOfNonDigits = event.target.value.replace(/[^\d]/g, '');
          const newValue = (Number(valueStrippedOfNonDigits) / 100) * (isNegative ? -1 : 1);

          onChange?.(newValue, event);
        }}
      />
    </div>
  );
});

function countThousandSeparatorMatch(value: string) {
  const thousandSeparator = getThousandSeparator('pt-BR');
  const regex = new RegExp(`[${thousandSeparator}]`, 'g');

  return (value.match(regex) ?? []).length;
}
