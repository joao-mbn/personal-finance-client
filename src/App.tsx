import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Dashboard, MenuBar } from './component';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        suspense: true,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen p-2">
        <Dashboard />
      </div>
      <MenuBar />
    </QueryClientProvider>
  );
}

export default App;
