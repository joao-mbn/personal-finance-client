import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Dashboard } from './component';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Dashboard />
    </QueryClientProvider>
  );
}

export default App;

