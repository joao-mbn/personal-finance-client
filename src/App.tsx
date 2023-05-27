import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, lazy, useState } from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import AppContext from './context';
import LoadingPage from './page/Loading';
import RootPage, { rootLoader } from './page/Root';

const ErrorPage = lazy(() => import('./page/Error'));
const HomePage = lazy(() => import('./page/Home'));
const DashboardPage = lazy(() => import('./page/Dashboard'));
const SyncPage = lazy(() => import('./page/Sync'));
const ConfigPage = lazy(() => import('./page/Config'));

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
      { path: 'config', element: <ConfigPage /> },
    ],
  },
]);

function App() {
  const [hasSession, setHasSession] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <AppContext.Provider value={{ hasSession, setHasSession }}>
        <Suspense fallback={<LoadingPage />}>
          <RouterProvider router={router} />
        </Suspense>
      </AppContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
