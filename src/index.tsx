import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';
// Redux
import { Provider } from 'react-redux';
import { store } from 'src/redux/store';

// Providers
import { ToastContainer } from 'react-toastify';
import TranslatorProvider from 'src/app/i18n';
import QueryClientProvider from 'src/app/queryClient';

// Components
import App from 'src/app/App';

// Styles
//prettier-ignore
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';
import 'src/assets/scss/main.scss';
import { GlobalSetterProvider } from './common/context/globalSetterContext';
import { useApiPath } from './common/hooks/useApiRoutes/useApiRoutes';
import { useAppSelector } from './redux/hooks';
import { getTheme } from './redux/slices/ui';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const Wrapper = () => {
    const { apiRoutes } = useApiPath();
    const theme = useAppSelector(getTheme);

    return apiRoutes ? (
        <>
                <TranslatorProvider>
                    <GlobalSetterProvider>
                        <App />
                        <ToastContainer
                            position="bottom-left"
                            autoClose={5000}
                            hideProgressBar={true}
                            newestOnTop={false}
                            closeOnClick
                            rtl={true}
                            draggable
                            pauseOnHover
                            theme={theme}
                            limit={3}
                        />
                    </GlobalSetterProvider>
                </TranslatorProvider>
        </>
    ) : (
        <>loading apis</>
    );
};

root.render(
    <Provider store={store}>
        <QueryClientProvider>
            <Wrapper />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    </Provider>,
);
