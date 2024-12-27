import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { FC, ReactNode } from 'react';

interface QueryClientProviderComProps {
     children: ReactNode;
}

export const queryClient = new QueryClient({
     defaultOptions: {
          queries: {
               // refetchOnMount,
               refetchOnWindowFocus: false,
               retry: false,
               retryOnMount: false
          },
     },
});

const QueryClientProviderCom: FC<QueryClientProviderComProps> = ({ children }) => {
     return (
          <QueryClientProvider client={queryClient}>
               <>
                    {children}
                    <ReactQueryDevtools />
               </>
          </QueryClientProvider>
     );
};

export default QueryClientProviderCom;
