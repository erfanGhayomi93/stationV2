import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AppRoutes from 'src/app/routes/appRoutes';
import { fetchUser, setPrimaryLoadingState } from 'src/handlers/boot';
import RouteWrapper from 'src/common/components/RouteWrapper';
import useLocalStorage from 'src/common/hooks/useLocalStorage';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setSelectedSymbol } from 'src/redux/slices/option';
import { getAppState, getUserData, setAppState } from 'src/redux/slices/global';
import Loading from 'src/common/components/Loading/Loading';
import Cookies from 'js-cookie';
import { tokenCookieName, unAuthorized } from 'src/api/axiosInstance';
import useRamandOMSGateway from 'src/ls/useRamandOMSGateway';

const App = () => {
    const appState = useAppSelector(getAppState);
    const appDispatch = useAppDispatch();
    const [localSymbolISIN] = useLocalStorage<string>('symbolISIN', 'IRO1ATIR0001');
    const client_id = Cookies.get(tokenCookieName);

    const { brokerCode, userName } = useAppSelector(getUserData);
    const { isSubscribed, subscribeCustomers, unSubscribeCustomers } = useRamandOMSGateway();

    const {
        i18n: { resolvedLanguage },
    } = useTranslation();


    useEffect(() => {
        if (appState === "LoggedIn" && !!userName) {
            subscribeCustomers(userName, brokerCode)
        }

        return () => {
            isSubscribed() && unSubscribeCustomers()
        }
    }, [appState, userName])





    useEffect(() => {
        if (!client_id) {
            unAuthorized()
            setPrimaryLoadingState(false)
        }
        else if (appState === "Loading") {
            appDispatch(setAppState("LoggedIn"))
        }
        else if (appState === "LoggedIn") {
            appDispatch(setSelectedSymbol(localSymbolISIN))
            fetchUser(appDispatch);
        }
    }, [appState]);


    if (appState === 'Booting' || appState === 'Loading' || !resolvedLanguage) return <Loading />;

    return (
        <RouteWrapper>
            <AppRoutes />
        </RouteWrapper>
    );
};

export default App;