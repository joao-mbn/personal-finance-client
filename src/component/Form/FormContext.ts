import { Context, createContext, useContext } from 'react';
import { ptBR } from '../../languages';
import { FormProps } from './form';

let FormContext: unknown = null;

export function createFormContext<T extends Record<string, unknown>>() {
  FormContext ??= createContext<FormProps<T> | null>(null);
  return FormContext as Context<FormProps<T> | null>;
}

export function useFormContext<T extends Record<string, unknown>>() {
  const _Context = useContext(FormContext as Context<FormProps<T> | null>);

  if (!_Context) throw new Error(ptBR.contextIsNull);

  return _Context;
}
