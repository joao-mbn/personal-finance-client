import { ptBR } from '../languages';

export function Loading({ message }: { message?: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-s-0 border-solid border-black"></div>
      <span>{message ?? ptBR.loading}</span>
    </div>
  );
}
