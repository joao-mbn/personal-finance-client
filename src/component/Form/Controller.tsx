import { useEffect } from 'react';
import { ValueOf } from '../../models';
import { useFormContext } from './FormContext';
import { FormState } from './form';

interface ControllerProps<
  T extends Record<string, unknown>,
  K extends keyof T = keyof T,
  V extends ValueOf<T> = ValueOf<T>
> {
  field: K;
  validator?: FormState<T, V>[K]['validator'];
  isEqual?: FormState<T, V>[K]['isEqual'];
  render: (
    formField: Pick<FormState<T, V>[K], 'currentValue' | 'isDirty' | 'isValid'>,
    onChange: (newValue: V) => void
  ) => JSX.Element;
}

export function Controller<T extends Record<string, unknown>, K extends keyof T = keyof T>({
  field,
  validator,
  isEqual,
  render,
}: ControllerProps<T, K>) {
  type V = ValueOf<T>;

  const { formState, setValue, register } = useFormContext<T>();

  //console.log(field, validator, isEqual, render);

  useEffect(() => {
    register(field, { validator, isEqual });
  }, [validator, isEqual]);

  const formField = formState[field];
  const onChange = (newValue: V) => setValue(field, newValue);

  return render(formField, onChange);
}
