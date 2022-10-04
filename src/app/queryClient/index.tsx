import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

const Provider = ({ children }: any) => <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;

export default Provider;
