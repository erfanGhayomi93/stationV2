import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AppProvider } from 'src/contexts/app';
import { ThemeProvider } from 'src/contexts/theme';
import TranslatorProvider from './contexts/translator';

// Temp
import 'src/assets/scss/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// React Query Client
const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

root.render(
    <BrowserRouter>
        <AppProvider>
            <TranslatorProvider>
                <ThemeProvider>
                    <QueryClientProvider client={queryClient}>
                        <App />
                        <ReactQueryDevtools initialIsOpen={false} />
                    </QueryClientProvider>
                </ThemeProvider>
            </TranslatorProvider>
        </AppProvider>
    </BrowserRouter>,
);
