import { tokenCookieName } from '@config/axios';
import { pushEngine } from '@LS/pushEngine';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import Loading from './Loading';
import { Outlet, Navigate } from 'react-router-dom';
import { routerPagePath } from '@router/routerPage';
import { useQueryGeneralUser } from '@api/trader';


const SplashScreenWrapper = () => {

     const { data, isSuccess, isLoading: isLoadingUser } = useQueryGeneralUser();

     // const {
     //      ready,
     //      i18n: { resolvedLanguage },
     // } = useTranslation();

     // const languageIsReady = ready && resolvedLanguage === 'fa';


     useEffect(() => {
          if (data) {
               const clientId = Cookies.get(tokenCookieName);

               pushEngine.connect({
                    DomainName: 'https://pushengine.ramandtech.com',
                    DomainPort: +'443',
                    AdapterSet: 'Ramand_Remoter_Adapter',
                    User: 'default user',
                    Password: clientId ?? 'default password', // get from app context
               });
          }
     }, [data]);

     if (isLoadingUser) {
          return <Loading />
     }

     if (!isSuccess) {
          <Navigate to={routerPagePath.login} />
          return <Outlet />
     }


     return <Outlet />

};

export default SplashScreenWrapper;
