import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import App from './App';
import i18next from './assets/i18n/config';
import useApiPath from './common/hooks/useApiPath.ts';
import QueryClientProviderCom from './config/reactQuery';
import Cookies from 'js-cookie';


import './assets/scss/app.scss';
import './assets/scss/libs.scss';
import { tokenCookieName } from '@config/axios/index.ts';
import { pushEngine } from '@LS/pushEngine.ts';
import ToastContainerCom from '@config/toastify/index.tsx';

const root = createRoot(document.getElementById('root') as HTMLElement);


const Wrapper = () => {
     const apiRoutes = useApiPath();

     useEffect(() => {
          if (apiRoutes) {

               const clientId = Cookies.get(tokenCookieName);

               pushEngine.connect({
                    DomainName: 'https://pushengine.ramandtech.com',
                    DomainPort: +'443',
                    AdapterSet: 'Ramand_Remoter_Adapter',
                    User: 'default user',
                    Password: clientId ?? 'default password', // get from app context
               });
          }
     }, [apiRoutes]);

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

          <ToastContainerCom />
     </I18nextProvider>
);