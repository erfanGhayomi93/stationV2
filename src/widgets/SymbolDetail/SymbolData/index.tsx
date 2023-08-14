import { useMemo, useState } from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import TabsList, { ITabItemType } from 'src/common/components/TabsList';
import { useAppValues } from 'src/redux/hooks';
import SymbolHeader from './SymbolHeader';
import SymbolPricePreview from './SymbolPricePreview';
import SymbolPriceSlider from './SymbolPriceSlider';
import { useTranslation } from 'react-i18next';
import AdditionalData from './tabs/AdditionalData';
import SymbolChart from './tabs/SymbolChart';
import Messages from './tabs/Messages';
import SameGroup from './tabs/SameGroup';
import OrderBook from './tabs/OrderBook';



const SymbolData = () => {
    //
    const [activeTab, setActiveTab] = useState('Orders');
    const { t } = useTranslation()

    const {
        option: { selectedSymbol },
    } = useAppValues();

    const { data: symbolData } = useSymbolGeneralInfo(selectedSymbol, {
        select: (data: SymbolGeneralInfoType) => ({
            yesterdayClosingPrice: data?.symbolData?.yesterdayClosingPrice,
            highThreshold: data?.symbolData?.highThreshold,
            lastTradedPrice: data?.symbolData?.lastTradedPrice,
            highestTradePriceOfTradingDay: data?.symbolData?.highestTradePriceOfTradingDay,
            lowThreshold: data?.symbolData?.lowThreshold,
            closingPrice: data?.symbolData?.closingPrice,
            lowestTradePriceOfTradingDay: data?.symbolData?.lowestTradePriceOfTradingDay,
        }),
    });


    const items = useMemo<ITabItemType[]>(
        () => [
            {
                key: 'OrderBook',
                title: t('SymbolDetails.orderBook'),
                content: <OrderBook />, 
                tabClass: 'pt-4 text-L-gray-500 dark:text-D-gray-700 outline-none',
                selectedButtonClass: 'border-b-2 font-semibold border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'AdditionalData',
                title: t('SymbolDetails.additionalData'),
                content: <AdditionalData />,
                tabClass: 'pt-4 text-L-gray-500 dark:text-D-gray-700 outline-none',
                selectedButtonClass: 'border-b-2 font-semibold border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'Charts',
                title: t('SymbolDetails.symbolChart'),
                content: <SymbolChart />,
                tabClass: 'pt-4 text-L-gray-500 dark:text-D-gray-700 outline-none',
                selectedButtonClass: 'border-b-2 font-semibold border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'Messages',
                title: t('SymbolDetails.messages'),
                content: <Messages />,
                tabClass: 'pt-4 text-L-gray-500 dark:text-D-gray-700 outline-none',
                selectedButtonClass: 'border-b-2 font-semibold border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'SameGroup',
                title: t('SymbolDetails.sameGroup'),
                content: <SameGroup />,
                tabClass: 'pt-4 text-L-gray-500 dark:text-D-gray-700 outline-none',
                selectedButtonClass: 'border-b-2 font-semibold border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
        ],
        [],
    );

    return (
        <div className=" grid grid-cols-1 grid-rows-min-one p-3 gap-2 overflow-hidden h-full border dark:border-D-gray-400  border-L-gray-400  bg-L-basic dark:bg-D-basic  ">
        {/* // <div className=" grid grid-cols-1 grid-rows-min-one  p-3 gap-2 h-full border dark:border-D-gray-350  border-L-gray-350  bg-L-basic dark:bg-D-basic  "> */}


            <div className=" sticky top-0 z-10 pb-4 bg-L-basic dark:bg-D-basic grid grid-rows-min-one gap-2 w-full ">
                <div className="grid grid-rows-2 gap-2 text-1.2">
                    <SymbolHeader />
                    <SymbolPricePreview />
                </div>
                <SymbolPriceSlider
                    yesterdayClosingPrice={symbolData?.yesterdayClosingPrice ?? 0}
                    thresholdData={[symbolData?.lowThreshold ?? 0, symbolData?.highThreshold ?? 0]}
                    exchangeData={[symbolData?.closingPrice ?? 0, symbolData?.lastTradedPrice ?? 0]}
                    boundaryData={[symbolData?.lowestTradePriceOfTradingDay ?? 0, symbolData?.highestTradePriceOfTradingDay ?? 0]}
                />
                {/* <SymbolPriceBar /> */}
            </div>
            <TabsList
                fill={true}
                onChange={(idx) => setActiveTab(idx)}
                selectedIndex={activeTab}
                items={items}
                buttonClass=" text-L-gray-500 dark:text-D-gray-500 "
                className="w-full grid rounded-md relative text-1.2 grid-rows-min-one  overflow-y-auto h-full   bg-L-basic dark:bg-D-basic"
                pannelClassName="overflow-y-auto h-full  bg-L-basic dark:bg-D-basic"
                tabListClassName="bg-L-basic dark:bg-D-basic  relative z-[0] text-1.2"
            />
        </div>
    );
};

export default SymbolData;
