import { ptBR } from '../languages';

export default function LoadingPage() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="mr-3 h-5 w-5 animate-spin rounded-full border-2 border-s-0 border-solid border-black"></div>
      <span>{ptBR.loading}</span>
    </div>
  );
}
