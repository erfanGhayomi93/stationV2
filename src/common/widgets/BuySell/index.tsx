import React, { useMemo, useState } from 'react';
import TabsList from 'src/common/components/TabsList';
import Buy from './tabs/Buy';
import Sell from './tabs/Sell';

const BuySell = () => {
    //
    const [activeTab, setActiveTab] = useState('Buy');

    const items = useMemo(
        () => [
            {
                key: 'Buy',
                title: <>خرید</>,
                content: <Buy />,
            },
            {
                key: 'Sell',
                title: <>فروش</>,
                content: <Sell />,
            },
        ],
        [],
    );

    return <TabsList onChange={(idx) => setActiveTab(idx)} selectedIndex={activeTab} items={items} />;
};

export default BuySell;
