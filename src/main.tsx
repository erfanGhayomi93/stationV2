import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import i18next from './assets/i18n/config';
import QueryClientProviderCom from './config/reactQuery';

import ToastContainerCom from '@config/toastify/index.tsx';
import App from 'App';
import SplashScreen from 'layouts/components/SplashScreen';
import { StrictMode } from 'react';
import './assets/scss/app.scss';
import './assets/scss/libs.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
     <I18nextProvider i18n={i18next}>
          <QueryClientProviderCom>
               <SplashScreen>
                    <StrictMode>
                         <App />
                    </StrictMode>
               </SplashScreen>
          </QueryClientProviderCom>

          <ToastContainerCom />
     </I18nextProvider>
);
