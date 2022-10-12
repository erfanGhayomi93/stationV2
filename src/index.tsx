import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// Redux
import { Provider } from 'react-redux';
import { store } from 'src/redux/store';

// Providers
import TranslatorProvider from 'src/app/i18n';
import QueryClientProvider from 'src/app/queryClient';
import { ToastContainer } from 'react-toastify';

// Components
import App from 'src/app/App';

// Styles
import 'src/common/components/LinearRangeChart/build.css';
import 'src/assets/scss/main.scss';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <TranslatorProvider>
                <QueryClientProvider>
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
                </QueryClientProvider>
            </TranslatorProvider>
        </BrowserRouter>
    </Provider>,
);
