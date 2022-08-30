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
        <div className="h-screen w-screen overflow-hidden bg-[#DAEBFB]">
            <div className="h-full w-full flex">
                <Sider />
                <div className="flex flex-col h-full grow ">
                    <Header />
                    <div className="h-full p-3">
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default AppLayout;
