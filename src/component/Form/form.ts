export type FormField<V> = {
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

export type Form<T, V> = {
  formState: FormState<T, V>;
  setValue: (field: keyof T, newValue: V) => void;
  reset: () => void;
  register: (field: keyof T, fns: Pick<FormField<V>, 'isEqual' | 'validator'>) => void;
};
