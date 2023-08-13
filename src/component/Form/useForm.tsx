import { FormHTMLAttributes, Reducer, useMemo, useReducer } from 'react';
import { createFormContext } from './FormContext';
import { Action, FormField, FormState } from './form';

export function useForm<T extends Record<string, unknown>, V = T[keyof T]>(initialValues: T) {
  const initialState = useMemo(() => {
    const formState = {} as FormState<T, V>;

    for (const entry of Object.entries(initialValues)) {
      const [key, value] = entry as [keyof T, V];
      formState[key] = {
        currentValue: value,
        initialValue: value,
        isDirty: false,
        isValid: true,
      };
    }

    return formState;
  }, [initialValues]);

  const [formState, dispatch] = useReducer<Reducer<FormState<T, V>, Action<T, V>>>(
    reducer,
    initialState
  );

  const reset = () => dispatch({ type: 'reset', newValue: initialState });
  const setValue = (field: keyof T, newValue: V) => dispatch({ field, newValue });
  const register = (field: keyof T, fns: Pick<FormField<V>, 'isEqual' | 'validator'>) =>
    dispatch({ type: 'register', newValue: fns, field });

  function FormComponent({ ...props }: FormHTMLAttributes<HTMLFormElement>) {
    const FormContext = useMemo(() => createFormContext<T, V>(), []);

    return (
      <FormContext.Provider value={form}>
        <form {...props} />
      </FormContext.Provider>
    );
  }

  const form = {
    formState,
    setValue,
    reset,
    register,
  };

  return { ...form, Form: FormComponent };
}

function reducer<T, V>(state: FormState<T, V>, action: Action<T, V>) {
  const { type } = action;

  if (type === 'reset') return action.newValue;

  const { field } = action;
  let updatedFieldState = { ...state[field] };

  if (type === 'register') {
    const { newValue } = action;
    updatedFieldState = { ...updatedFieldState, ...newValue };
  }

  if (!type) {
    const { newValue } = action;
    updatedFieldState.currentValue = newValue;
  }

  const { isDirty, isValid } = runChecks(updatedFieldState);
  return { ...state, [field]: { ...updatedFieldState, isDirty, isValid } };
}

function runChecks<V>(field: FormField<V>) {
  const { isEqual, validator, currentValue, initialValue } = field;
  const isValid = validator?.(currentValue) ?? true;
  const isDirty = isEqual?.(currentValue, initialValue) ?? currentValue === initialValue;
  return { isDirty, isValid };
}
