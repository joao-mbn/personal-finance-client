import { Suspense, lazy } from 'react';
import { ptBR } from '../languages';

const WidgetsContainer = lazy(() => import('./WidgetsContainer'));

export function Dashboard() {
  return (
    <div>
      <h1 className="font-normal pb-2 text-lg">Dashboard 🚀</h1>
      <Suspense fallback={<span className="bg-green-500">{ptBR.loadingWidgets}</span>}>
        <WidgetsContainer />
      </Suspense>
    </div>
  );
}
