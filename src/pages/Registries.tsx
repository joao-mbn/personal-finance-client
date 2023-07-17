import { Suspense, lazy } from 'react';
import { Loading, Page } from '../component';
import { ptBR } from '../languages';

const RegistriesWidget = lazy(() => import('../component/Widgets/RegistriesWidget'));

export default function RegistriesPage() {
  return (
    <Page>
      <Suspense fallback={<Loading message={ptBR.loadingRegistries} />}>
        <RegistriesWidget />
      </Suspense>
    </Page>
  );
}
