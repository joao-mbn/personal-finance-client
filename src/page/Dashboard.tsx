import { Suspense, lazy } from 'react';
import { ptBR } from '../languages';

const WidgetsContainer = lazy(() => import('../component/WidgetsContainer'));

export default function DashboardPage() {
  return (
    <div>
      <h1 className="font-normal pb-2 text-lg">Dashboard 🚀</h1>
      <Suspense fallback={<span className="bg-green-500">{ptBR.loadingWidgets}</span>}>
        <WidgetsContainer />
      </Suspense>
    </div>
  );
}
