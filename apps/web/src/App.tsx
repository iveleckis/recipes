import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./providers/auth/AuthProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
});

function App() {
  return;
  <QueryClientProvider client={queryClient}>
    <AuthProvider>app</AuthProvider>;
  </QueryClientProvider>;
}

export default App;
