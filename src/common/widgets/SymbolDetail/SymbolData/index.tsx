import React, { useMemo, useState } from 'react';
import TabsList2 from 'src/common/components/TabsList2';
import SymbolHeader from './SymbolHeader';
import SymbolPriceBar from './SymbolPriceBar';
import SymbolPricePreview from './SymbolPricePreview';
import AdditionalData from './tabs/AdditionalData';
import Charts from './tabs/Charts';
import Details from './tabs/Details';
import Messages from './tabs/Messages';
import Orders from './tabs/Orders';

const SymbolData = () => {
    //
    const [activeTab, setActiveTab] = useState('Orders');

    const items = useMemo(
        () => [
            {
                key: 'Orders',
                title: 'صف',
                content: <Orders />,
            },
            {
                key: 'AdditionalData',
                title: 'اطلاعات تکمیلی',
                content: <AdditionalData />,
            },
            {
                key: 'Details',
                title: 'جزییات نماد',
                content: <Details />,
            },
            {
                key: 'Charts',
                title: 'نمودار نماد',
                content: <Charts />,
            },
            {
                key: 'Messages',
                title: 'پیام ها',
                content: <Messages />,
            },
        ],
        [],
    );

    return (
        <div className="h-full w-full flex flex-col bg-white p-3">
            <div className="mb-2">
                <SymbolHeader />
            </div>
            <div className="mb-2">
                <SymbolPricePreview />
            </div>
            <div className="mb-2">
                <SymbolPriceBar />
            </div>
            <div className="grow">
                <TabsList2 onChange={(idx) => setActiveTab(idx)} selectedIndex={activeTab} items={items} />
            </div>
        </div>
    );
};

export default SymbolData;
