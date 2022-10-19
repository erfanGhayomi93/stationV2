import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

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
import 'react-toastify/dist/ReactToastify.css';
import 'src/assets/scss/main.scss';
import 'src/common/components/LinearRangeChart/build.css';
import { useApiPath } from './common/hooks/useApiRoutes/useApiRoutes';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const Wrapper = () => {
    const { apiRoutes } = useApiPath();

    return apiRoutes ? (
        <>
            <BrowserRouter>
                <TranslatorProvider>
                    <App />
                    <ToastContainer
                        position="bottom-left"
                        autoClose={5000}
                        hideProgressBar={true}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        draggable
                        pauseOnHover
                    />
                </TranslatorProvider>
            </BrowserRouter>
        </>
    ) : (
        <>loading apis</>
    );
};

root.render(
    <Provider store={store}>
        <QueryClientProvider>
            <Wrapper />
        </QueryClientProvider>
    </Provider>,
);
