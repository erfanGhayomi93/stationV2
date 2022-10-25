import { useMemo, useState } from 'react';
import TabsList, { ITabItemType } from 'src/common/components/TabsList';
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

    const items = useMemo<ITabItemType[]>(
        () => [
            {
                key: 'Orders',
                title: 'صف',
                content: <Orders />,
                tabClass: 'text-L-gray-500 dark:text-D-gray-500 outline-none',
                selectedButtonClass: 'border-b-2 border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'AdditionalData',
                title: 'حقیقی حقوقی',
                content: <AdditionalData />,
                tabClass: 'text-L-gray-500 dark:text-D-gray-500 outline-none',
                selectedButtonClass: 'border-b-2 border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'Details',
                title: 'جزییات نماد',
                content: <Details />,
                tabClass: 'text-L-gray-500 dark:text-D-gray-500 outline-none',
                selectedButtonClass: 'border-b-2 border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'Charts',
                title: 'نمودار نماد',
                content: <Charts />,
                tabClass: 'text-L-gray-500 dark:text-D-gray-500 outline-none',
                selectedButtonClass: 'border-b-2 border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'Messages',
                title: 'پیام ها',
                content: <Messages />,
                tabClass: 'text-L-gray-500 dark:text-D-gray-500 outline-none',
                selectedButtonClass: 'border-b-2 border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
        ],
        [],
    );

    return (
        <div className=" grid grid-cols-1 grid-rows-min-one  p-3 gap-2  overflow-y-auto h-full  bg-L-basic dark:bg-D-basic  ">
            <div className=" sticky top-0 z-10  bg-L-basic dark:bg-D-basic ">
                <SymbolHeader />
                <SymbolPricePreview />
                <SymbolPriceBar />
            </div>
            <TabsList
                fill={true}
                onChange={(idx) => setActiveTab(idx)}
                selectedIndex={activeTab}
                items={items}
                buttonClass=" text-L-gray-500 dark:text-D-gray-500 "
                className="w-full grid rounded-md relative text-1.2 grid-rows-min-one  overflow-y-auto h-full   bg-L-basic dark:bg-D-basic"
                pannelClassName="overflow-y-auto h-full  bg-L-basic dark:bg-D-basic"
                tabListClassName="bg-L-basic dark:bg-D-basic  relative z-[0]"
            />
        </div>
    );
};

export default SymbolData;
