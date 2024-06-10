import { useMemo, useState } from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import TabsList, { ITabItemType } from 'src/common/components/TabsList';
import { useAppSelector } from 'src/redux/hooks';
import SymbolHeader from './SymbolHeader';
import SymbolPricePreview from './SymbolPricePreview';
import SymbolPriceSlider from './SymbolPriceSlider';
import { useTranslation } from 'react-i18next';
import AdditionalData from './tabs/AdditionalData';
import SymbolChart from './tabs/SymbolChart';
import Messages from './tabs/Messages';
import SameGroup from './tabs/SameGroup';
import OrderBookWidget from './tabs/OrderBook/context';
import { getSelectedSymbol } from 'src/redux/slices/option';
import SymbolTabsContext from './context';
import AuthorityDetails from './tabs/AuthorityDetails';
import { OptionContract } from './tabs/OptionContract';
import ErrorBoundary from 'src/common/components/ErrorBoundary';

const SymbolData = () => {
    //
    const [activeTab, setActiveTab] = useState('OrderBook');
    const { t } = useTranslation();

    const selectedSymbol = useAppSelector(getSelectedSymbol);

    const { data: symbolData } = useSymbolGeneralInfo(selectedSymbol, {
        select: (data: SymbolGeneralInfoType) => ({
            yesterdayClosingPrice: data?.symbolData?.yesterdayClosingPrice,
            highThreshold: data?.symbolData?.highThreshold,
            lastTradedPrice: data?.symbolData?.lastTradedPrice,
            highestTradePriceOfTradingDay: data?.symbolData?.highestTradePriceOfTradingDay,
            lowThreshold: data?.symbolData?.lowThreshold,
            closingPrice: data?.symbolData?.closingPrice,
            lowestTradePriceOfTradingDay: data?.symbolData?.lowestTradePriceOfTradingDay,
            isOption: data?.symbolData?.isOption,
        }),
    });

    const items = useMemo<ITabItemType[]>(
        () => [
            {
                key: 'OrderBook',
                title: t('SymbolDetails.orderBook'),
                content: <OrderBookWidget
                    isOption={symbolData?.isOption || false}
                />,
                tabClass: 'pt-4 outline-none',
                selectedButtonClass: 'border-b-2 font-semibold border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            // {
            //     key: symbolData?.isOption ? 'AuthorityDetails' : 'AdditionalData',
            //     title: symbolData?.isOption ? t('SymbolDetails.AuthorityDetails') : t('SymbolDetails.additionalData'),
            //     content: symbolData?.isOption ? <AuthorityDetails /> : <AdditionalData />,
            //     tabClass: 'pt-4 outline-none',
            //     selectedButtonClass: 'border-b-2 font-semibold border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            // },
            // {
            //     key: 'AdditionalData',
            //     title: t('SymbolDetails.additionalData'),
            //     content: <AdditionalData />,
            //     tabClass: 'pt-4 outline-none',
            //     selectedButtonClass: 'border-b-2 font-semibold border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            // },
            {
                key: 'Charts',
                title: t('SymbolDetails.symbolChart'),
                content: <SymbolChart />,
                tabClass: 'pt-4 outline-none',
                selectedButtonClass: 'border-b-2 font-semibold border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'Messages',
                title: t('SymbolDetails.messages'),
                content: <Messages />,
                tabClass: 'pt-4 outline-none',
                selectedButtonClass: 'border-b-2 font-semibold border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'SameGroup',
                title: t('SymbolDetails.sameGroup'),
                content: <SameGroup />,
                tabClass: 'pt-4 outline-none',
                selectedButtonClass: 'border-b-2 font-semibold border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
            {
                key: 'OptionContract',
                title: t('SymbolDetails.optionContract'),
                content: <OptionContract />,
                tabClass: 'pt-4 outline-none',
                selectedButtonClass: 'border-b-2 font-semibold border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50',
            },
        ],
        [symbolData?.isOption],
    );

    return (
        <div className="rounded-md overflow-hidden h-full w-full flex flex-col gap-x-5 gap-y-3 border border-L-gray-400 bg-L-basic dark:border-D-gray-400 dark:bg-D-basic p-3">
            <ErrorBoundary>
                <div className="text-1.2 flex flex-col gap-2">
                    <SymbolHeader />
                    <SymbolPricePreview />
                    <span className="px-2">
                        <SymbolPriceSlider
                            yesterdayClosingPrice={symbolData?.yesterdayClosingPrice ?? 0}
                            thresholdData={[symbolData?.lowThreshold ?? 0, symbolData?.highThreshold ?? 0]}
                            exchangeData={[symbolData?.closingPrice ?? 0, symbolData?.lastTradedPrice ?? 0]}
                            boundaryData={[symbolData?.lowestTradePriceOfTradingDay ?? 0, symbolData?.highestTradePriceOfTradingDay ?? 0]}
                        />
                    </span>
                </div>
                <div className="flex flex-col h-full overflow-hidden">
                    <SymbolTabsContext>
                        <TabsList
                            fill={true}
                            onChange={(idx) => setActiveTab(idx)}
                            selectedIndex={activeTab}
                            items={items}
                            buttonClass="text-L-gray-600 dark:text-D-gray-600"
                            className="w-full grid text-1.2 grid-rows-min-one  overflow-y-auto h-full   bg-L-basic dark:bg-D-basic"
                            pannelClassName="overflow-y-auto h-full  bg-L-basic dark:bg-D-basic"
                            tabListClassName="bg-L-basic dark:bg-D-basic overflow-x-auto relative z-[0] text-1.1"
                        />
                    </SymbolTabsContext>
                </div>
            </ErrorBoundary>
        </div >
    );
};

export default SymbolData;
