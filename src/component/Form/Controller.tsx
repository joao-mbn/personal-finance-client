import { useEffect } from 'react';
import { useFormContext } from './FormContext';
import { FieldCheckers, FieldMetadata } from './form';

export interface ControllerProps<T extends Record<string, unknown>, K extends keyof T = keyof T> {
  field: K;
  validator?: FieldCheckers<T>['validator'];
  equalityComparer?: FieldCheckers<T>['equalityComparer'];
  render: (
    metadata: Pick<FieldMetadata<T>, 'isDirty' | 'isValid'>,
    onChange: (newValue: T[K]) => void
  ) => JSX.Element;
}

export function Controller<T extends Record<string, unknown>, K extends keyof T = keyof T>({
  field,
  validator,
  equalityComparer,
  render,
}: ControllerProps<T, K>) {
  const { metadata, setValue, registerCheckers } = useFormContext<T>();

  useEffect(() => {
    registerCheckers(field, { validator, equalityComparer });
  }, [field, validator, equalityComparer]);

  const { isDirty, isValid } = metadata[field];
  const onChange = (newValue: T[K]) => setValue(field, newValue);

  return render({ isDirty, isValid }, onChange);
}
