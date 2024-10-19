import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import i18next from './assets/i18n/config';
import useApiPath from './common/hooks/useApiPath.ts';
import QueryClientProviderCom from './config/reactQuery';

import './assets/scss/app.scss';
import './assets/scss/libs.scss';

const root = createRoot(document.getElementById('root') as HTMLElement);

const Wrapper = () => {
     const apiRoutes = useApiPath();

     return apiRoutes ? (
          <StrictMode>
               <App />
          </StrictMode>
     ) : (
          <>loading apis</>
     );
};

root.render(
     <I18nextProvider i18n={i18next}>
          <QueryClientProviderCom>
               <Wrapper />
          </QueryClientProviderCom>
          {/* <ToastContainerCom /> */}
     </I18nextProvider>
);