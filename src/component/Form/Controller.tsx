import { ReactNode, useEffect } from 'react';
import { useFormContext } from './FormContext';
import { Form, FormField } from './form';

interface ControllerProps<T extends Record<string, unknown>, V = T[keyof T]> {
  register: Form<T, V>['register'];
  field: keyof T;
  validator?: FormField<V>['validator'];
  isEqual?: FormField<V>['isEqual'];
  render: (formField: FormField<V>, onChange: (newValue: V) => void) => ReactNode;
}

export function Controller<T extends Record<string, unknown>>({
  register,
  field,
  validator,
  isEqual,
  render,
}: ControllerProps<T>) {
  type V = T[keyof T];

  const { formState, setValue } = useFormContext<T, V>();

  useEffect(() => {
    register(field, { validator, isEqual });
  }, [validator, isEqual]);

  const formField = formState[field] as FormField<V>;
  const onChange = (newValue: V) => setValue(field, newValue);

  return render(formField, onChange);
}
