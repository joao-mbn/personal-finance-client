import { useEffect } from 'react';
import { useFormContext } from './FormContext';
import { FieldCheckers, FieldMetadata } from './form';

export interface ControllerProps<T extends Record<string, unknown>, K extends keyof T = keyof T> {
  field: K;
  checkers?: FieldCheckers<T, K>;
  render: (
    metadata: Pick<FieldMetadata<T, K>, 'isDirty' | 'isValid'>,
    onChange: (newValue: T[K]) => void
  ) => JSX.Element;
}

export function Controller<T extends Record<string, unknown>, K extends keyof T = keyof T>({
  field,
  checkers,
  render,
}: ControllerProps<T, K>) {
  const { metadata, setValue, registerCheckers } = useFormContext<T>();

  useEffect(
    () => checkers && registerCheckers(field, checkers),
    [checkers, field, registerCheckers]
  );

  const { isDirty, isValid } = metadata[field];
  const onChange = (newValue: T[K]) => setValue(field, newValue);

  return render({ isDirty, isValid }, onChange);
}
