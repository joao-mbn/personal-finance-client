import { FormHTMLAttributes, useMemo } from 'react';
import { UseFormReturn, createFormContext } from '.';

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
