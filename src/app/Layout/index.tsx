import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { pushEngine } from 'src/ls/pushEngine';
import WorkflowWidget from 'src/common/components/WorkFlow/context/WorkflowContext';
import Footer from './Footer';
import Header from './Header';
import Sider from './Sider';
import { ProviderSlider } from './Sider/context';
import ipcMain from 'src/common/classes/IpcMain';
import { useTranslation } from 'react-i18next';
import { findTitlePage } from 'src/utils/helpers';

const AppLayout = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const { pathname } = useLocation();

    useEffect(() => {
        findTitlePage(pathname)
    }, [pathname])




    useEffect(() => {
        ipcMain.handle("unAuthorized", () => {
            navigate("/login")
        })
    }, [])


    useEffect(() => {
        // must get from config (api or file)
        pushEngine.connect({
            DomainName: 'https://pushengine.ramandtech.com',
            DomainPort: 443,
            AdapterSet: 'Ramand_Remoter_Adapter',
            User: 'Soheilkh', // get from app context
            Password: 'This is My Password', // get from app context
        });

        return () => {
            pushEngine.disConnect();
        };
    }, []);

    return (
        <WorkflowWidget>
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
        </WorkflowWidget>
    );
};

export default AppLayout;
