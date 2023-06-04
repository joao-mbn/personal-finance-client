import { lazy } from 'react';

const WidgetsContainer = lazy(() => import('../component/WidgetsContainer'));

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-lg font-normal">Dashboard 🚀</h1>
      {/* <Suspense fallback={<span className="bg-green-500">{ptBR.loadingWidgets}</span>}>
        <WidgetsContainer />
      </Suspense> */}
    </div>
  );
}
