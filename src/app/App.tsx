import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { AUTHORIZED_ROUTES, UN_AUTHORIZED_ROUTES } from 'src/app/routes/appRoutes';
import { transferFunctions } from 'src/api/axiosInstance';
import { fetchUser } from 'src/handlers/boot';

import RouteWrapper from 'src/common/components/RouteWrapper';
import AppLayout from 'src/app/Layout';
import CrashPage from 'src/pages/PageCrash';
import { useAppDispatch, useAppValues } from 'src/redux/hooks';
import { useGlobalSettings } from './queries/settings';
import { getApiPath, useApiPath } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import apiRoutes from 'src/api/apiRoutes';

const App = () => {
    const {
        global: { appState },
    } = useAppValues();

    const navigate = useNavigate();
    const appDispatch = useAppDispatch();

    const { ready: isTranslationResourceReady } = useTranslation();

    useEffect(() => {
        transferFunctions(navigate, appDispatch);
    }, []);

    useEffect(() => {
        appState === 'Loading' && fetchUser(appDispatch);
    }, [appState]);

    if (appState === 'Booting' || appState === 'Loading' || !isTranslationResourceReady) return <>AppIsLoading...</>;
    if (appState === 'Crashed') return <CrashPage />;

    return (
        <Routes>
            {appState === 'LoggedIn' ? (
                <Route path="/" element={<AppLayout />}>
                    {AUTHORIZED_ROUTES.map(({ path, component: Component }) => (
                        <Route
                            key={path}
                            path={path}
                            element={
                                <RouteWrapper>
                                    <Component />
                                </RouteWrapper>
                            }
                        />
                    ))}
                </Route>
            ) : null}
            {appState === 'LoggedOut'
                ? UN_AUTHORIZED_ROUTES.map(({ path, component: Component }) => (
                      <Route
                          key={path}
                          path={path}
                          element={
                              <RouteWrapper>
                                  <Component />
                              </RouteWrapper>
                          }
                      />
                  ))
                : null}
        </Routes>
    );
};

export default App;
