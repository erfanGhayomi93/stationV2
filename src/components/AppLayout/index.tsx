import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { pushEngine } from 'src/api/pushEngine';
import Header from './Header';
import Sider from './Sider';

const AppLayout = () => {
    //

    useEffect(() => {
        //
        pushEngine.connect({
            DomainName: 'https://pushengine.ramandtech.com',
            DomainPort: 443,
            AdapterSet: 'Ramand_Remoter_Adapter',
            User: 'Soheilkh',
            Password: 'This is My Password',
        });

        return () => {
            pushEngine.disConnect();
        };
    }, []);

    return (
        <div className="h-screen ">
            <div className="flex flex-col h-full ">
                <div>
                    <Header />
                </div>
                <div className="h-full flex">
                    <div className="w-1/5 bg-slate-300">
                        <Sider />
                    </div>
                    <div className="h-full" style={{ padding: '5px' }}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AppLayout;
