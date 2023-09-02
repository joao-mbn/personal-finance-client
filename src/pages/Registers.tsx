import { lazy } from 'react';
import { DefaultSuspense, Page } from '../component';
import { ptBR } from '../languages';

const RegistersWidget = lazy(() => import('../component/Register/RegistersWidget'));

export default function RegistersPage() {
  return (
    <Page>
      <DefaultSuspense message={ptBR.loadingRegisters}>
        <RegistersWidget />
      </DefaultSuspense>
    </Page>
  );
}
