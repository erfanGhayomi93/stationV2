import React, { useEffect, useMemo, useState } from 'react';
import TabsList from 'src/common/components/TabsList';
import { GearIcon } from 'src/common/icons';
import SearchInput from '../CustomerSearch/components/SearchInput';
import CustomerSearchWidget, { CustomerSearchProvider } from '../CustomerSearch/context/CustomerSearchContext';
import WatchlistWidget from '../Watchlist/context/WatchlistContext';
import Portfolio from './tabs/Portfolio';

const PortfolioWatchlist = () => {
    //
    const [activeTab, setActiveTab] = useState('CustomerSearch');

    const items = useMemo(
        () => [
            {
                key: 'CustomerSearch',
                title: <>مشتریان</>,
                content: <CustomerSearchWidget />,
            },
            {
                key: 'Watchlist',
                title: <>دیده‌بان</>,
                content: <WatchlistWidget />,
            },
            {
                key: 'Portfolio',
                title: <>پرتفوی مشتری</>,
                content: <Portfolio />,
            },
        ],
        [],
    );

    return (
        <CustomerSearchProvider>
            <div className="grid grid-rows-min-one h-full gap-2">
                <SearchInput />
                <TabsList onChange={(idx) => setActiveTab(idx)} selectedIndex={activeTab} items={items} />
            </div>
        </CustomerSearchProvider>
    );
};

export default PortfolioWatchlist;
