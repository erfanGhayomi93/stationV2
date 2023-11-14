import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { pushEngine } from 'src/ls/pushEngine';
import Footer from './Footer';
import Header from './Header';
import Sider from './Sider';
import { ProviderSlider } from './Sider/context';
import ipcMain from 'src/common/classes/IpcMain';
import { useTranslation } from 'react-i18next';
import { findTitlePage } from 'src/utils/helpers';
import { useGetPlatformSetting } from '../queries/settings/PlatformSetting';
import { useApiPath } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { useAppDispatch } from 'src/redux/hooks';
import { setAppState } from 'src/redux/slices/global';
import { updatePlatformSetting } from 'src/redux/slices/platformSetting';

const AppLayout = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const appDispatch = useAppDispatch();

    const { pathname } = useLocation();

    useEffect(() => {
        findTitlePage(pathname);
    }, [pathname]);

    useGetPlatformSetting({
        onSuccess: ({ succeeded, result }) => {
            if (succeeded) {
                result && appDispatch(updatePlatformSetting(result));
            }
        },
        onError: () => {
            appDispatch(setAppState('Crashed'));
        },
    });

    useEffect(() => {
        ipcMain.handle('unAuthorized', () => {
            navigate('/login');
        });
    }, []);

    useEffect(() => {
        // must get from config (api or file)
        pushEngine.connect({
            DomainName: window.REACT_APP_PUSHENGINE_PATH,
            DomainPort: +window.REACT_APP_PUSHENGINE_PORT,
            AdapterSet: 'Ramand_Remoter_Adapter',
            User: 'Soheilkh', // get from app context
            Password: 'This is My Password', // get from app context
        });

        return () => {
            pushEngine.disConnect();
        };
    }, []);

    return (
        <div className="h-screen w-screen  bg-L-gray-50 dark:bg-D-gray-50 min-w-[1330px] overflow-x-auto">
            <div className="h-full w-full grid grid-cols-one-min">
                <ProviderSlider>
                    <Sider />
                </ProviderSlider>
                <div className="grid grid-rows-min-one-min h-full overflow-y-auto  ">
                    <Header />
                    <div className="px-4 py-2 grid overflow-y-auto grid-rows-1 ">
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default AppLayout;
