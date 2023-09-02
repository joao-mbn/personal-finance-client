import { Reducer, useCallback, useMemo, useReducer } from 'react';
import { Checkers, CheckersAction, FieldCheckers, Metadata, MetadataAction, StateAction } from '.';

export function useForm<T extends Record<string, unknown>>(initialValues: T) {
  const [state, stateDispatch] = useReducer<Reducer<T, StateAction<T>>>(
    stateReducer,
    initialValues
  );

  const [metadata, metadataDispatch] = useReducer<Reducer<Metadata<T>, MetadataAction<T>>, T>(
    metadataReducer,
    initialValues,
    generateMetadataInitialValues
  );

  const [checkers, checkersDispatch] = useReducer<Reducer<Checkers<T>, CheckersAction<T>>>(
    checkersReducer,
    {} as Checkers<T>
  );

  const reset = useCallback(() => {
    stateDispatch({ type: 'reset', newValue: initialValues });
    metadataDispatch({ type: 'reset', initialValue: generateMetadataInitialValues(initialValues) });
    checkersDispatch({ type: 'reset', checkers: {} as Checkers<T> });
  }, [initialValues]);

  const setValue = useCallback(
    <K extends keyof T = keyof T>(field: K, newValue: T[K]) => {
      stateDispatch({ field, newValue });
      metadataDispatch({
        field,
        fieldCheckers: checkers[field] as Partial<FieldCheckers<T>> | undefined,
        currentValue: newValue,
      });
    },
    [checkers]
  );

  const registerCheckers = useCallback(
    <K extends keyof T>(field: K, fieldCheckers: Partial<FieldCheckers<T, K>>) => {
      checkersDispatch({ field, fieldCheckers: fieldCheckers as Partial<FieldCheckers<T>> });
      metadataDispatch({
        field,
        fieldCheckers: fieldCheckers as Partial<FieldCheckers<T>> | undefined,
        currentValue: state[field],
      });
    },
    [state]
  );

  const isDirty = useMemo(() => Object.values(metadata).some(m => m.isDirty), [metadata]);
  const isValid = useMemo(() => Object.values(metadata).every(m => m.isValid), [metadata]);

  return {
    initialValues,
    isDirty,
    isValid,
    metadata,
    registerCheckers,
    reset,
    setValue,
    state,
  };
}

function stateReducer<T>(state: T, action: StateAction<T>) {
  const { type } = action;

  if (type === 'reset') return action.newValue;

  const { field, newValue } = action;

  return { ...state, [field]: newValue };
}

function generateMetadataInitialValues<T extends Record<string, unknown>>(initialValues: T) {
  return Object.entries(initialValues).reduce(
    (acc, [currKey, currValue]) => ({
      ...acc,
      [currKey as keyof T]: { initialValue: currValue, isDirty: false, isValid: true },
    }),
    {} as Metadata<T>
  );
}

function metadataReducer<T>(state: Metadata<T>, action: MetadataAction<T>) {
  const { type } = action;
  if (type === 'reset') return action.initialValue;

  const { field, currentValue, fieldCheckers } = action;
  const { initialValue, isDirty: prevIsDirty, isValid: prevIsValid } = state[field];

  const validationResult = fieldCheckers?.validator?.(currentValue) ?? true;
  const isValid = validationResult === true;
  const errorMessage = isValid ? '' : validationResult;

  const isDirty = fieldCheckers?.equalityComparer
    ? !fieldCheckers.equalityComparer(currentValue, initialValue)
    : currentValue !== initialValue;

  if (prevIsDirty === isDirty && prevIsValid === isValid) return state;

  return { ...state, [field]: { ...state[field], isDirty, isValid, errorMessage } };
}

function checkersReducer<T>(state: Checkers<T>, action: CheckersAction<T>) {
  const { type } = action;
  if (type === 'reset') return action.checkers;

  const { fieldCheckers, field } = action;
  return { ...state, [field]: { ...state[field], ...fieldCheckers } };
}
