import { ptBR } from '../languages';

export default function LoadingPage() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="animate-spin h-5 w-5 mr-3 border-s-0 border-black border-2 border-solid rounded-full"></div>
      <span>{ptBR.loading}</span>
    </div>
  );
}
