import React, { useEffect, useMemo, useState } from 'react';
import TabsList from 'src/common/components/TabsList';
import SearchInput from '../CustomerSearch/components/SearchInput';
import CustomerSearchWidget, { CustomerSearchProvider, useCustomerSearchState } from '../CustomerSearch/context/CustomerSearchContext';
import WatchlistWidget from '../Watchlist/context/WatchlistContext';
import Portfolio from './tabs/Portfolio';

const CustomerSection = () => {
    //
    const [activeTab, setActiveTab] = useState('CustomerSearch');
    const {
        state: {
            params: { term },
        },
    } = useCustomerSearchState();
    useEffect(() => {
        setActiveTab('CustomerSearch');
    }, [term]);

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
        <div className="grid grid-rows-min-one h-full gap-2">
            <SearchInput />
            <TabsList onChange={(idx) => setActiveTab(idx)} selectedIndex={activeTab} items={items} />
        </div>
    );
};

const PortfolioWatchlist = () => {
    return (
        <CustomerSearchProvider>
            <CustomerSection />
        </CustomerSearchProvider>
    );
};

export default PortfolioWatchlist;
