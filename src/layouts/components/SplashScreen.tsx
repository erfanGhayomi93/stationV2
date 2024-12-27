import { tokenCookieName } from '@config/axios';
import { pushEngine } from '@LS/pushEngine';
import Cookies from 'js-cookie';
import { Fragment, useEffect } from 'react';
// import { useTranslation } from 'react-i18next';
import Loading from './Loading';
import { Outlet, Navigate } from 'react-router';
import { routerPagePath } from '@router/routerPage';
import { useQueryGeneralUser } from '@api/trader';
import { useAppState } from '@store/appState';
import useUpdateEffect from '@hooks/useUpdateEffect';


const SplashScreenWrapper = () => {

     const { appState, setAppState } = useAppState()

     const { data, isLoading: isLoadingUser, refetch: refetchGeneralUser } = useQueryGeneralUser();

     // const {
     //      ready,
     //      i18n: { resolvedLanguage },
     // } = useTranslation();

     // const languageIsReady = ready && resolvedLanguage === 'fa';


     useEffect(() => {
          if (data?.userName && appState === 'LoggedIn') {

               const clientId = Cookies.get(tokenCookieName);

               pushEngine.connect({
                    DomainName: 'https://pushengine.ramandtech.com',
                    DomainPort: +'443',
                    AdapterSet: 'Ramand_Remoter_Adapter',
                    User: 'default user',
                    Password: clientId ?? 'default password', // get from app context
               });
          }
     }, [data?.userName, appState]);

     useUpdateEffect(() => {
          if (appState === 'LoggedIn') {
               refetchGeneralUser()
          }
     }, [appState])

     useEffect(() => {
          if (isLoadingUser) {
               setAppState('Loading')
          } else if (data) {
               setAppState('LoggedIn')
          }
          else if (!data) {
               setAppState('LoggedOut')
          }
     }, [isLoadingUser, data])




     if (appState === 'LoggedOut') {
          <Navigate to={routerPagePath.login} />
          return <Outlet />
     }

     return (
          <Fragment>
               {appState === 'Loading' && <Loading />}

               {appState === 'LoggedIn' && <Outlet />}
          </Fragment>
     )


};

export default SplashScreenWrapper;
