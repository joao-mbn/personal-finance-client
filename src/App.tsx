import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Dashboard, GoogleSignIn, MenuBar } from './component';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <div className="min-h-screen w-screen p-2">
        <Outlet />
        <MenuBar />
      </div>
    ),
    children: [
      {
        path: 'home',
        element: (
          <>
            <h1>Welcome home 🏠</h1>
            <GoogleSignIn />
          </>
        ),
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'sync',
        element: <h1> Let's sync 🔄️</h1>,
      },
      {
        path: 'config',
        element: <h1> Let's config ⚙️</h1>,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
