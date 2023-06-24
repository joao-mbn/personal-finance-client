import { Suspense, lazy } from 'react';
import { Loading, Page } from '../component';
import { ptBR } from '../languages';

const WidgetsContainer = lazy(() => import('../component/WidgetsContainer'));

export default function DashboardPage() {
  return (
    <Page title={ptBR.dashboard}>
      <Suspense fallback={<Loading message={ptBR.loadingWidgets} />}>
        <WidgetsContainer />
      </Suspense>
    </Page>
  );
}
