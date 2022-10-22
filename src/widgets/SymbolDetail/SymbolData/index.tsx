import { useMemo, useState } from 'react';
import TabsList from 'src/common/components/TabsList';
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
                selectedButtonClass: 'border-b-2 border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'AdditionalData',
                title: 'حقیقی حقوقی',
                content: <AdditionalData />,
                selectedButtonClass: 'border-b-2 border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'Details',
                title: 'جزییات نماد',
                content: <Details />,
                selectedButtonClass: 'border-b-2 border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'Charts',
                title: 'نمودار نماد',
                content: <Charts />,
                selectedButtonClass: 'border-b-2 border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'Messages',
                title: 'پیام ها',
                content: <Messages />,
                selectedButtonClass: 'border-b-2 border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
        ],
        [],
    );

    return (
        <div className="h-full w-full flex flex-col bg-L-basic dark:bg-D-basic p-3">
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
                <TabsList
                    onChange={(idx) => setActiveTab(idx)}
                    selectedIndex={activeTab}
                    items={items}
                    buttonClass=" text-L-gray-500 dark:text-D-gray-500"
                />
            </div>
        </div>
    );
};

export default SymbolData;
