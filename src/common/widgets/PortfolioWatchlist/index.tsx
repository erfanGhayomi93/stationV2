import React, { useEffect, useMemo, useState } from 'react';
import TabsList from 'src/common/components/TabsList';
import { GearIcon } from 'src/common/icons';
import Portfolio from './tabs/Portfolio';
import Watchlist from './tabs/Watchlist';

const PortfolioWatchlist = () => {
    //
    const [activeTab, setActiveTab] = useState('Watchlist');

    const items = useMemo(
        () => [
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
        ],
        [],
    );

    return <TabsList onChange={(idx) => setActiveTab(idx)} selectedIndex={activeTab} items={items} />;
};

export default PortfolioWatchlist;
