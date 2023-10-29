import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Routes, createBrowserRouter, useNavigate } from 'react-router-dom';

// import { transferFunctions } from 'src/api/axiosInstance';
// import { AUTHORIZED_ROUTES, UN_AUTHORIZED_ROUTES } from 'src/app/routes/appRoutes';
import AppRoutes from 'src/app/routes/appRoutes';
import { fetchUser } from 'src/handlers/boot';

import AppLayout from 'src/app/Layout';
import RouteWrapper from 'src/common/components/RouteWrapper';
import useLocalStorage from 'src/common/hooks/useLocalStorage';
import CrashPage from 'src/pages/PageCrash';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setSelectedSymbol } from 'src/redux/slices/option';
import { getAppState } from 'src/redux/slices/global';
// import ipcMain from 'src/common/classes/IpcMain';

const App = () => {
    const appState = useAppSelector(getAppState);
    const appDispatch = useAppDispatch();
    const [localSymbolISIN] = useLocalStorage<string>('symbolISIN', 'IRO1ATIR0001');

    const {
        ready: isTranslationResourceReady,
        i18n: { resolvedLanguage },
    } = useTranslation();

    //     useEffect(() => {
    //         // transferFunctions(navigate, appDispatch);
    //     }, []);
    //
    useEffect(() => {
        appState === 'Loading' && fetchUser(appDispatch);
        appState === 'LoggedIn' && localSymbolISIN && appDispatch(setSelectedSymbol(localSymbolISIN));
    }, [appState]);
    //
   // if (appState === 'Booting' || appState === 'Loading' || !isTranslationResourceReady) return <>AppIsLoading...</>;
    if (appState === 'Crashed' || resolvedLanguage !== 'fa') return <CrashPage />;

    return (
        <RouteWrapper>
            <AppRoutes />
        </RouteWrapper>
    );
};

export default App;

//  (
// <Routes>
//     {appState === 'LoggedIn' ? (
//         <Route path="/" element={<AppLayout />}>
//             {createBrowserRouter(AUTHORIZED_ROUTES).map(({ path, component: Component }) => (
//                 <Route
//                     key={path}
//                     path={path}
//                     element={
//                         <RouteWrapper>
//                             <Component />
//                         </RouteWrapper>
//                     }
//                 />
//             ))}
//         </Route>
//     ) : null}
//     {appState === 'LoggedOut'
//               <Route
//                   key={path}
//                   path={path}
//                   element={
//                       <RouteWrapper>
//                           <Component />
//                       </RouteWrapper>
//                   }
//               />
//           ))
//         : null}
// </Routes>

// );
