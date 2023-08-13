import { Reducer, useMemo, useReducer } from 'react';
import { Action, FormField, FormState } from './form';

export function useForm<T extends Record<string, unknown>>(initialValues: T) {
  type V = T[keyof T];

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
  const register = (field: keyof T, fns: Pick<FormField<V>, 'isEqual' | 'validator'>) =>
    dispatch({ type: 'register', newValue: fns, field });

  const setValue = (field: keyof T, newValue: V) => dispatch({ field, newValue });
  const getValues = () => {
    const values = {} as T;
    for (const entry of Object.entries(formState)) {
      const [key, value] = entry as [keyof T, FormField<V>];
      values[key] = value.currentValue;
    }
    return values;
  };

  const form = {
    formState,
    getValues,
    register,
    reset,
    setValue,
  };

  return { ...form };
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

  const { isDirty, isValid } = runChecks<V>(updatedFieldState);
  return { ...state, [field]: { ...updatedFieldState, isDirty, isValid } };
}

function runChecks<V>(field: FormField<V>) {
  const { isEqual, validator, currentValue, initialValue } = field;
  const isValid = validator?.(currentValue) ?? true;
  const isDirty = isEqual?.(currentValue, initialValue) ?? currentValue === initialValue;
  return { isDirty, isValid };
}
