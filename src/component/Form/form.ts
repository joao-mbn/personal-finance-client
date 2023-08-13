import { useForm } from './useForm';

export type FormField<V = unknown> = {
  initialValue: V;
  currentValue: V;
  isEqual?: (newValue: V, initialValue: V) => boolean;
  isDirty: boolean;
  validator?: (newValue: V) => boolean;
  isValid: boolean;
};

export type FormState<T, V> = Record<keyof T, FormField<V>>;

export type Action<T, V> =
  | { type?: undefined; field: keyof T; newValue: V }
  | { type: 'reset'; newValue: FormState<T, V> }
  | { type: 'register'; field: keyof T; newValue: Partial<FormField<V>> };

export type UseFormReturn<T extends Record<string, unknown>> = ReturnType<typeof useForm<T>>;

export type FormProps<T extends Record<string, unknown>> = Omit<UseFormReturn<T>, 'Form'>;
