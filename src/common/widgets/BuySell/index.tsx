import React, { useMemo, useState } from 'react';
import TabsList, { ITabItemType } from 'src/common/components/TabsList';
import Buy from './tabs/Buy';
import Sell from './tabs/Sell';

const BuySell = () => {
    //
    const [activeTab, setActiveTab] = useState('Buy');

    const items: ITabItemType[] = useMemo<ITabItemType[]>(
        () => [
            {
                key: 'Buy',
                title: <>خرید</>,
                content: <Buy />,
                backgroundColor: '#F3FFF9',
                borderColor: '#15B761',
            },
            {
                key: 'Sell',
                title: <>فروش</>,
                content: <Sell />,
                backgroundColor: '#ffefef',
                borderColor: '#e04040',
            },
        ],
        [],
    );

    return <TabsList onChange={(idx) => setActiveTab(idx)} selectedIndex={activeTab} items={items} fill />;
};

export default BuySell;
