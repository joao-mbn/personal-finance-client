import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Input, InputProps } from '..';
import { toBRL } from '../../utils';

export interface CurrencyInputProps extends Omit<InputProps, 'value' | 'onChange'> {
  value: number;
  onChange?: (newValue: number, event: React.ChangeEvent<HTMLInputElement>) => void;
}

type Ref = HTMLInputElement | null;

export const CurrencyInput = forwardRef<Ref, CurrencyInputProps>(function CurrencyInput(
  { value, onChange, ...props }: CurrencyInputProps,
  ref
) {
  const [_ref, setRef] = useState<Ref>(null);
  useImperativeHandle<Ref, Ref>(ref, () => _ref, [_ref]);

  const firstNumericDigitAtValueInput = 3;
  const selectionEndRef = useRef<number>(firstNumericDigitAtValueInput);

  useEffect(() => {
    const selection = selectionEndRef.current;
    _ref?.setSelectionRange(selection, selection);
  }, [value]);

  return (
    <Input
      ref={setRef}
      value={toBRL(value)}
      onChange={event => {
        selectionEndRef.current = Math.max(
          firstNumericDigitAtValueInput,
          event.target.selectionEnd ?? 0
        );

        const isNegative = event.target.value.startsWith('-');
        const valueStrippedOfNonDigits = event.target.value.replace(/[^\d]/g, '');
        const newValue = (Number(valueStrippedOfNonDigits) / 100) * (isNegative ? -1 : 1);

        onChange?.(newValue, event);
      }}
      {...props}
    />
  );
});
