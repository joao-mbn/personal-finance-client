import { Suspense, lazy } from 'react';
import { Loading, Page } from '../component';
import { ptBR } from '../languages';

const RegistersWidget = lazy(() => import('../component/RegistersWidget'));

export default function RegistersPage() {
  return (
    <Page>
      <Suspense fallback={<Loading message={ptBR.loadingRegisters} />}>
        <RegistersWidget />
      </Suspense>
    </Page>
  );
}
