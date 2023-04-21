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
      <div className="h-screen p-2">
        <MenuBar />
        <Dashboard />
      </div>
    </QueryClientProvider>
  );
}

export default App;

