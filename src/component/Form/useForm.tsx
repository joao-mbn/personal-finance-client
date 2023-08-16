import { Reducer, useCallback, useMemo, useReducer } from 'react';
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

  const reset = useCallback(() => {
    stateDispatch({ type: 'reset', newValue: initialValues });
    // TODO: reset metadata
    // TODO: reset checkers
  }, [initialValues]);

  const setValue = useCallback(
    <K extends keyof T = keyof T>(field: K, newValue: T[K]) => {
      stateDispatch({ field, newValue });
      metadataDispatch({
        field,
        fieldCheckers: checkers[field] as Partial<FieldCheckers<T>>,
        currentMetadata: metadata[field],
        currentValue: newValue,
      });
    },
    [metadata, checkers]
  );

  const registerCheckers = useCallback(
    <K extends keyof T>(field: K, fieldCheckers: Partial<FieldCheckers<T, K>>) => {
      checkersDispatch({ field, fieldCheckers: fieldCheckers as Partial<FieldCheckers<T>> });
      metadataDispatch({
        field,
        fieldCheckers: fieldCheckers as Partial<FieldCheckers<T>>,
        currentMetadata: metadata[field],
        currentValue: state[field],
      });
    },
    [metadata, state]
  );

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
  const { field, currentValue, fieldCheckers: checkers, currentMetadata } = action;
  const { initialValue } = state[field];
  const { equalityComparer, validator } = checkers;
  const { isDirty: currentIsDirty, isValid: currentIsValid } = currentMetadata;

  const isValid = validator?.(currentValue) ?? true;
  const isDirty = equalityComparer?.(currentValue, initialValue) ?? currentValue === initialValue;

  if (currentIsDirty === isDirty && currentIsValid === isValid) return state;

  return { ...state, [field]: { ...state[field], isDirty, isValid } };
}

function checkersReducer<T>(state: Checkers<T>, action: CheckersAction<T>) {
  const { fieldCheckers, field } = action;
  return { ...state, [field]: { ...state[field], ...fieldCheckers } };
}
