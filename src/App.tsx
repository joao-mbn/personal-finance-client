import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLoaderData,
  useLocation,
  useNavigate,
  useRouteError,
} from 'react-router-dom';
import { Dashboard, GoogleSignIn, MenuBar } from './component';
import { Message } from './model';
import { AuthService } from './service';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function Root() {
  const hasSession = useLoaderData() as boolean;
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    !hasSession && navigate('/home');
    hasSession && pathname === '/' && navigate('/dashboard');
  }, [hasSession]);

  return (
    <div className="min-h-screen w-screen p-2">
      <Outlet />
      <MenuBar />
    </div>
  );
}

function RootError() {
  const error = useRouteError() as AxiosError;

  return <h1>{error.message}</h1>;
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <RootError />,
    loader: async () => {
      try {
        await queryClient.fetchQuery({ queryKey: ['ping'], queryFn: AuthService.ping });
        return true;
      } catch (error) {
        const sessionMessages: string[] = [
          Message.InvalidSessionId,
          Message.NoSessionId,
          Message.SessionExpired,
        ];
        const message = (error as AxiosError).response?.data as string | undefined;

        if (message && sessionMessages.includes(message)) {
          return false;
        } else {
          throw error;
        }
      }
    },
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
