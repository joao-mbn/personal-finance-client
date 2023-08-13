import { Context, createContext, useContext } from 'react';
import { ptBR } from '../../languages';
import { Form } from './form';

let FormContext: unknown = null;

export function createFormContext<T extends Record<string, unknown>, V = T[keyof T]>() {
  FormContext ??= createContext<Form<T, V> | null>(null);
  return FormContext as Context<Form<T, V> | null>;
}

export function useFormContext<T extends Record<string, unknown>, V = T[keyof T]>() {
  const _Context = useContext(FormContext as Context<Form<T, V> | null>);

  if (!_Context) throw new Error(ptBR.contextIsNull);

  return _Context;
}
