import { Context, createContext, useContext } from 'react';
import { UseFormReturn } from '.';
import { ptBR } from '../../languages';

let FormContext: unknown = null;

export function createFormContext<T extends Record<string, unknown>>() {
  FormContext ??= createContext<UseFormReturn<T> | null>(null);
  return FormContext as Context<UseFormReturn<T> | null>;
}

export function useFormContext<T extends Record<string, unknown>>() {
  const _Context = useContext(FormContext as Context<UseFormReturn<T> | null>);

  if (!_Context) throw new Error(ptBR.contextIsNull);

  return _Context;
}
