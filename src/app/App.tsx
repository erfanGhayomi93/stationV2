import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AppRoutes from 'src/app/routes/appRoutes';
import { fetchUser } from 'src/handlers/boot';
import RouteWrapper from 'src/common/components/RouteWrapper';
import useLocalStorage from 'src/common/hooks/useLocalStorage';
import CrashPage from 'src/pages/PageCrash';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { setSelectedSymbol } from 'src/redux/slices/option';
import { getAppState } from 'src/redux/slices/global';
import Loading from 'src/common/components/Loading/Loading';
import Cookies from 'js-cookie';
import { tokenCookieName, unAuthorized } from 'src/api/axiosInstance';

const App = () => {
    const appState = useAppSelector(getAppState);
    const appDispatch = useAppDispatch();
    const [localSymbolISIN] = useLocalStorage<string>('symbolISIN', 'IRO1ATIR0001');
    const hasCookie = Cookies.get(tokenCookieName)
    const {
        ready: isTranslationResourceReady,
        i18n: { resolvedLanguage },
    } = useTranslation();



    useEffect(() => {
        // appState === 'Loading' && fetchUser(appDispatch);
        // appState === 'LoggedIn' && localSymbolISIN && appDispatch(setSelectedSymbol(localSymbolISIN));
        if (appState === "LoggedIn" || appState === "Loading") {
            appDispatch(setSelectedSymbol(localSymbolISIN))
            fetchUser(appDispatch);
        }
    }, [appState]);

    // if (!hasCookie) unAuthorized()
    if (appState === 'Booting' || appState === 'Loading' || !isTranslationResourceReady) return <Loading />;
    // if (appState === 'Crashed' || resolvedLanguage !== 'fa') return <CrashPage />;

    return (
        <RouteWrapper>
            <AppRoutes />
        </RouteWrapper>
    );
};

export default App;
