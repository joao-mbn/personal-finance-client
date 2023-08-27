import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, lazy, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Loading } from './component';
import { AppContext } from './contexts';
import { useToaster, useViewport } from './hooks';
import RootPage, { rootLoader } from './pages/Root';

const ErrorPage = lazy(() => import('./pages/Error'));
const HomePage = lazy(() => import('./pages/Home'));
const DashboardPage = lazy(() => import('./pages/Dashboard'));
const SyncPage = lazy(() => import('./pages/Sync'));
const RegistersPage = lazy(() => import('./pages/Registers'));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootPage />,
    errorElement: <ErrorPage />,
    loader: () => rootLoader(queryClient),
    children: [
      { path: 'home', element: <HomePage /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'sync', element: <SyncPage /> },
      { path: 'registers', element: <RegistersPage /> },
    ],
  },
]);

function App() {
  const [hasSession, setHasSession] = useState(false);
  const viewport = useViewport();
  const { Toaster, invokeToaster } = useToaster();

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ hasSession, setHasSession, viewport, invokeToaster }}>
        <Suspense fallback={<Loading />}>
          <RouterProvider router={router} />
        </Suspense>
        {Toaster}
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
