import { tokenCookieName } from '@config/axios';
import useApiPath from '@hooks/useApiPath';
import { pushEngine } from '@LS/pushEngine';
import Cookies from 'js-cookie';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Loading from './Loading';

const SplashScreen = ({ children }: { children: React.ReactElement }) => {
     const { apiRoutes, isLoading } = useApiPath();

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
                         {(isLoading || !languageIsReady || !apiRoutes) && <Loading />}
                         {languageIsReady && apiRoutes && !isLoading && children}
                    </>
               }
          </div>
     );
};

export default SplashScreen;
