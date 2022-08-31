import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import TranslatorProvider from 'src/i18n';

// Components
import App from 'src/App';

// Styles
import 'src/assets/scss/main.scss';

import { store } from 'src/redux/store';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

// React Query Client
const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false, retry: false } },
});

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <TranslatorProvider>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </TranslatorProvider>
        </BrowserRouter>
    </Provider>,
);
