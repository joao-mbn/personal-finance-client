import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Dashboard } from './component';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen p-0 m-0">
        <Dashboard />
      </div>
    </QueryClientProvider>
  );
}

export default App;

