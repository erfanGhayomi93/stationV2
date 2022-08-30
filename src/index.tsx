import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Providers
import { GlobalProvider } from 'src/app/contexts/global';
import { ThemeProvider } from 'src/app/contexts/theme';
import TranslatorProvider from 'src/app/contexts/translator';

// Components
import App from 'src/App';

// Styles
import 'src/assets/scss/main.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// React Query Client
const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

root.render(
    <BrowserRouter>
        <GlobalProvider>
            <TranslatorProvider>
                <ThemeProvider>
                    <QueryClientProvider client={queryClient}>
                        <App />
                    </QueryClientProvider>
                </ThemeProvider>
            </TranslatorProvider>
        </GlobalProvider>
    </BrowserRouter>,
);
