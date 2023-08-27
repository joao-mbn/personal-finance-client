import { Context, createContext, useContext } from 'react';
import { UseFormReturn } from '.';
import { contextIsNotNull } from '../../utils';

let FormContext: unknown = null;

export function createFormContext<T extends Record<string, unknown>>() {
  FormContext ??= createContext<UseFormReturn<T> | null>(null);
  return FormContext as Context<UseFormReturn<T> | null>;
}

export function useFormContext<T extends Record<string, unknown>>() {
  const _Context = useContext(FormContext as Context<UseFormReturn<T> | null>);
  return contextIsNotNull(_Context);
}
