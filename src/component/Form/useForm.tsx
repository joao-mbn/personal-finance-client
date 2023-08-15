import { Reducer, useMemo, useReducer } from 'react';
import {
  Checkers,
  CheckersAction,
  FieldCheckers,
  Metadata,
  MetadataAction,
  StateAction,
} from './form';

export function useForm<T extends Record<string, unknown>>(initialValues: T) {
  const [state, stateDispatch] = useReducer<Reducer<T, StateAction<T>>>(
    stateReducer,
    initialValues
  );

  const [metadata, metadataDispatch] = useReducer<Reducer<Metadata<T>, MetadataAction<T>>, T>(
    metadataReducer,
    initialValues,
    initialValues =>
      Object.entries(initialValues).reduce(
        (acc, [currKey, currValue]) => ({
          ...acc,
          [currKey as keyof T]: { initialValue: currValue, isDirty: false, isValid: true },
        }),
        {} as Metadata<T>
      )
  );

  const [checkers, checkersDispatch] = useReducer<Reducer<Checkers<T>, CheckersAction<T>>>(
    checkersReducer,
    {} as Checkers<T>
  );

  const reset = () => stateDispatch({ type: 'reset', newValue: initialValues });

  const setValue = <K extends keyof T = keyof T>(field: K, newValue: T[K]) => {
    stateDispatch({ field, newValue });
    metadataDispatch({
      field,
      fieldCheckers: checkers[field] as Partial<FieldCheckers<T>>,
      currentValue: newValue,
    });
  };

  const registerCheckers = <K extends keyof T>(
    field: K,
    fieldCheckers: Partial<FieldCheckers<T>>
  ) => {
    checkersDispatch({ field, fieldCheckers });
    metadataDispatch({
      field,
      fieldCheckers,
      currentValue: state[field],
    });
  };

  const isDirty = useMemo(() => Object.values(metadata).some(m => m.isDirty), [metadata]);
  const isValid = useMemo(() => Object.values(metadata).every(m => m.isValid), [metadata]);

  const form = {
    initialValues,
    isDirty,
    isValid,
    metadata,
    registerCheckers,
    reset,
    setValue,
    state,
  };

  return { ...form };
}

function stateReducer<T>(state: T, action: StateAction<T>) {
  const { type } = action;

  if (type === 'reset') return action.newValue;

  const { field, newValue } = action;

  return { ...state, [field]: newValue };
}

function metadataReducer<T>(state: Metadata<T>, action: MetadataAction<T>) {
  const { field, currentValue, fieldCheckers: checkers } = action;
  const { initialValue } = state[field];
  const { equalityComparer, validator } = checkers;

  const isValid = validator?.(currentValue) ?? true;
  const isDirty = equalityComparer?.(currentValue, initialValue) ?? currentValue === initialValue;

  return { ...state, [field]: { ...state[field], isDirty, isValid } };
}

function checkersReducer<T>(state: Checkers<T>, action: CheckersAction<T>) {
  const { fieldCheckers: checkers, field } = action;
  return { ...state, [field]: { ...state[field], ...checkers } };
}
