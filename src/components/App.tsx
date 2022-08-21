import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AUTHORIZED_ROUTES, UN_AUTHORIZED_ROUTES } from 'src/api/appRoutes';
import { transferFunctions } from 'src/api/axiosInstance';
import RouteWrapper from 'src/components/common/RouteWrapper';
import AppLayout from 'src/components/AppLayout';
import { useAppDispatch, useAppValues } from 'src/contexts/app';
import { fetchUser } from 'src/handlers/boot';

import CrashPage from 'src/pages/PageCrash';

const App = () => {
    //
    const { appState } = useAppValues();

    const navigate = useNavigate();
    const appDispatch = useAppDispatch();

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
