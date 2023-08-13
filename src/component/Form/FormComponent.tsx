import { FormHTMLAttributes, useMemo } from 'react';
import { createFormContext } from './FormContext';
import { UseFormReturn } from './form';

interface FormComponentProps<T extends Record<string, unknown>>
  extends FormHTMLAttributes<HTMLFormElement> {
  formProps: UseFormReturn<T>;
}

export function FormComponent<T extends Record<string, unknown>>({
  formProps,
  ...props
}: FormComponentProps<T>) {
  const FormContext = useMemo(() => createFormContext<T>(), []);

  return (
    <FormContext.Provider value={formProps}>
      <form {...props} />
    </FormContext.Provider>
  );
}
