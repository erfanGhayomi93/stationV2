import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sider from './Sider';

const AppLayout = () => {
    //
    return (
        <div style={{ display: 'flex', flexDirection: 'column', padding: '5px' }}>
            <div>
                <Header />
            </div>
            <div style={{ display: 'flex', padding: '5px' }}>
                <div style={{ padding: '5px' }}>
                    <Sider />
                </div>
                <div style={{ padding: '5px' }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default AppLayout;
