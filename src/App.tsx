import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MenuBar } from './component';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen p-2">
        <MenuBar />
      </div>
    </QueryClientProvider>
  );
}

export default App;

