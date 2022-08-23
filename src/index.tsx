import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Providers
import { AppProvider } from 'src/contexts/app';
import { ThemeProvider } from 'src/contexts/theme';
import TranslatorProvider from './contexts/translator';

// Components
import App from './components/App';

// Styles
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
                    </QueryClientProvider>
                </ThemeProvider>
            </TranslatorProvider>
        </AppProvider>
    </BrowserRouter>,
);
