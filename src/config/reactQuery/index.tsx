import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, ReactNode } from 'react';

interface QueryClientProviderComProps {
     children: ReactNode;
}

export const queryClient = new QueryClient({
     defaultOptions: {
          queries: {
               refetchOnMount: false,
               refetchOnWindowFocus: false,
               retry: false,
          },
     },
});

const QueryClientProviderCom: FC<QueryClientProviderComProps> = ({ children }) => {
     return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryClientProviderCom;
