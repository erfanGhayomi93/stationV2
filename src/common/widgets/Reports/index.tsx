import React, { useMemo, useState } from 'react';
import TabsList from 'src/common/components/TabsList';
import Drafts from './tabs/Drafts';
import FailedOrders from './tabs/FailedOrders';
import GroupOrders from './tabs/GroupOrders';
import OpenOrders from './tabs/OpenOrders';
import Requests from './tabs/Requests';
import DoneOrders from './tabs/DoneOrders';

const Reports = () => {
    //
    const [activeTab, setActiveTab] = useState('Requests');

    const items = useMemo(
        () => [
            {
                key: 'Requests',
                title: 'درخواست‌ها',
                content: <Requests />,
            },
            {
                key: 'OpenOrders',
                title: 'سفارشات باز',
                content: <OpenOrders />,
            },
            {
                key: 'DoneOrders',
                title: 'سفارشات انجام شده',
                content: <DoneOrders />,
            },
            {
                key: 'FailedOrders',
                title: 'سفارشات خطا دار',
                content: <FailedOrders />,
            },
            {
                key: 'Drafts',
                title: 'پیش نویس ها',
                content: <Drafts />,
            },
            {
                key: 'GroupOrders',
                title: 'سفارشات گروهی',
                content: <GroupOrders />,
            },
        ],
        [],
    );

    return <TabsList onChange={(idx) => setActiveTab(idx)} selectedIndex={activeTab} items={items} />;
};

export default Reports;
