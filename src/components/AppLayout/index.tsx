import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sider from './Sider';

const AppLayout = () => {
    //
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
