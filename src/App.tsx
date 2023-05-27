import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Outlet, RootRoute, Route, Router, RouterProvider } from '@tanstack/router';
import { Dashboard, GoogleSignIn, MenuBar } from './component';

const rootRoute = new RootRoute({
  component: () => (
    <div className="min-h-screen w-screen p-2">
      <Outlet />
      <MenuBar />
    </div>
  ),
});

const homeRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <>
      <h1>Welcome home 🏠</h1>
      <GoogleSignIn />
    </>
  ),
});

const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
});

const syncRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/sync',
  component: () => <h1> Let's sync 🔄️</h1>,
});

const configRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/config',
  component: () => <h1> Let's config ⚙️</h1>,
});

const routeTree = rootRoute.addChildren([homeRoute, dashboardRoute, syncRoute, configRoute]);
const router = new Router({ routeTree });
declare module '@tanstack/router' {
  interface Register {
    router: typeof router;
  }
}

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
