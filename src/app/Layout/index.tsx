import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { pushEngine } from 'src/api/pushEngine';
import Footer from './Footer';
import Header from './Header';
import Sider from './Sider';

const AppLayout = () => {
    //

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
        <div className="h-screen w-screen  bg-L-gray-50 dark:bg-D-gray-50">
            <div className="h-full w-full grid grid-cols-one-min">
                <Sider />
                <div className="grid grid-rows-min-one-min overflow-y-auto ">
                    <Header />
                    <div className="h-full px-4 py-2 grid overflow-y-auto overflow-x-auto min-w-[1230px]">
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default AppLayout;
