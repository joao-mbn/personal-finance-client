import { useForm } from '.';

export type StateAction<T, K extends keyof T = keyof T> =
  | { type?: undefined; field: K; newValue: T[K] }
  | { type: 'reset'; newValue: T };

export type FieldMetadata<T, K extends keyof T = keyof T> = {
  initialValue: T[K];
  isDirty: boolean;
  isValid: boolean;
  errorMessage: string;
};

export type Metadata<T, K extends keyof T = keyof T> = Record<K, FieldMetadata<T, K>>;

export type MetadataAction<T, K extends keyof T = keyof T> =
  | {
      type?: undefined;
      field: K;
      currentValue: T[K];
      fieldCheckers?: Partial<FieldCheckers<T, K>>;
    }
  | { type: 'reset'; initialValue: Metadata<T, K> };

export type FieldCheckers<T, K extends keyof T = keyof T> = {
  equalityComparer?: (newValue: T[K], initialValue: T[K]) => boolean;
  validator?: (newValue: T[K]) => true | string;
};

export type Checkers<T, K extends keyof T = keyof T> = Record<K, FieldCheckers<T[K]>>;

export type CheckersAction<T, K extends keyof T = keyof T> =
  | {
      type?: undefined;
      field: K;
      fieldCheckers: Partial<FieldCheckers<T, K>>;
    }
  | { type: 'reset'; checkers: Checkers<T, K> };

export type UseFormReturn<T extends Record<string, unknown>> = ReturnType<typeof useForm<T>>;
