import React, { useEffect, useState } from 'react';
import Tab from 'src/common/components/Tab';
import { GearIcon } from 'src/common/icons';
import Portfolio from './tabs/Portfolio';
import Watchlist from './tabs/Watchlist';

const PortfolioWatchlist = () => {
    //
    const [activeTab, setActiveTab] = useState('Portfolio');

    const items = [
        {
            key: 'Watchlist',
            title: <>دیده‌بان</>,
            content: <Watchlist />,
        },
        {
            key: 'Portfolio',
            title: <>پرتفوی مشتری</>,
            content: <Portfolio />,
        },
    ];

    return (
        <div className="w-full h-full bg-red-200">
            <Tab onChange={(idx) => setActiveTab(idx)} selectedIndex={activeTab} items={items} />
        </div>
    );
};

export default PortfolioWatchlist;
