import { tokenCookieName } from '@config/axios';
import useApiPath from '@hooks/useApiPath';
import { pushEngine } from '@LS/pushEngine';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Spinner = () => {
     return (
          <div className="fixed bottom-0 top-0 flex h-full w-full flex-col items-center justify-center gap-4 bg-back-2">
               <div className="spinner h-10 w-10"></div>
               <span className="text-content-title">...در حال بارگذاری</span>
          </div>
     );
};

const SplashScreen = ({ children }: { children: React.ReactElement }) => {
     const apiRoutes = useApiPath();

     const {
          ready,
          i18n: { resolvedLanguage },
     } = useTranslation();

     const languageIsReady = ready && resolvedLanguage === 'fa';

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

     return (
          <div>
               {
                    <>
                         {!languageIsReady && <Spinner />}
                         {languageIsReady && apiRoutes && children}
                    </>
               }
          </div>
     );
};

export default SplashScreen;
