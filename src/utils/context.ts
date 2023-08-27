import { ptBR } from '../languages';

export function contextIsNotNull<T>(context: T | null): T {
  if (!context) throw new Error(ptBR.contextIsNull);

  return context;
}
