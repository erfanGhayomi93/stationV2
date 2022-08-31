import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useGlobalDispatch, useGlobalValues } from 'src/app/contexts/global';

import { AUTHORIZED_ROUTES, UN_AUTHORIZED_ROUTES } from 'src/api/appRoutes';
import { transferFunctions } from 'src/api/axiosInstance';
import { fetchUser } from 'src/handlers/boot';

import RouteWrapper from 'src/common/components/RouteWrapper';
import AppLayout from 'src/app/Layout';
import CrashPage from 'src/pages/PageCrash';

const App = () => {
    //
    const { appState } = useGlobalValues();

    const navigate = useNavigate();
    const appDispatch = useGlobalDispatch();

    const { ready: isTranslationResourceReady } = useTranslation();

    useEffect(() => {
        transferFunctions(navigate, appDispatch);
    }, []);

    useEffect(() => {
        fetchUser(appDispatch);
    }, []);

    if (appState === 'Loading' || !isTranslationResourceReady) return <>AppIsLoading...</>;
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
