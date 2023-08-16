import { useForm } from './useForm';

export type StateAction<T, K extends keyof T = keyof T> =
  | { type?: undefined; field: K; newValue: T[K] }
  | { type: 'reset'; newValue: T };

export type FieldMetadata<T, K extends keyof T = keyof T> = {
  initialValue: T[K];
  isDirty: boolean;
  isValid: boolean;
};

export type Metadata<T, K extends keyof T = keyof T> = Record<K, FieldMetadata<T, K>>;

export type MetadataAction<T, K extends keyof T = keyof T> = {
  field: K;
  currentValue: T[K];
  currentMetadata: Partial<FieldMetadata<T, K>>;
  fieldCheckers: Partial<FieldCheckers<T, K>>;
};

export type FieldCheckers<T, K extends keyof T = keyof T> = {
  equalityComparer?: (newValue: T[K], initialValue: T[K]) => boolean;
  validator?: (newValue: T[K]) => boolean;
};

export type Checkers<T, K extends keyof T = keyof T> = Record<K, FieldCheckers<T[K]>>;

export type CheckersAction<T, K extends keyof T = keyof T> = {
  field: K;
  fieldCheckers: Partial<FieldCheckers<T, K>>;
};

export type UseFormReturn<T extends Record<string, unknown>> = ReturnType<typeof useForm<T>>;
