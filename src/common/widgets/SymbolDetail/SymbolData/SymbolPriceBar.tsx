import React from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries';
import LinearRangeChart from 'src/common/components/LinearRangeChart';
import { TriangleIcon } from 'src/common/components/LinearRangeChart/Icons';
import { useAppValues } from 'src/redux/hooks';

const traderOptions = {
    footer: false,
    ruler: true,
    rtl: true,
    badge: true,
    gradient: true,
    positiveColor: '#24AE64',
    negativeColor: '#E04040',
    rulerSetting: {
        step: 1,
        degree: 4,
        className: 'lc-border-solid lc-border-slate-300  dark:border-D-gray-350 lc-border-t-8  dark:text-D-primary-50',
        rulerClassName: 'lc-text-gray-400 lc-h-6 dark:text-D-primary-50',
        threshold: true,
    },
    thresholdSetting: {
        thresholdStartClassName: 'lc-hidden',
        thresholdEndClassName: 'lc-hidden',
    },
    originSetting: {
        className: 'lc-text-sm lc-bg-slate-200 lc-text-slate-400 lc-px-2 lc-py-1 lc-mb-2 lc-rounded dark:bg-D-gray-350 dark:text-white',
    },
    boundarySetting: {
        boundaryStartLabel: 'کمترین قیمت',
        boundaryEndLabel: 'بیشترین قیمت',
        className: 'h-2',
        boundaryStartClassName: 'lc-h-2',
        boundaryEndClassName: 'lc-h-2',
        badge: true,
    },
    exchangeSetting: {
        exchangeStartLabel: 'اولین قیمت',
        exchangeEndLabel: 'آخرین قیمت ',
        exchangeEndClassName: 'lc-top-6',
        exchangeStartClassName: 'lc-top-1',
    },
    footerSetting: {
        className: 'lc-text-slate-600 dark:text-D-primary-50',
    },
    exchangeIcons: {
        start: <TriangleIcon className="lc-rotate-180 lc-text-gray-700 dark:lc-text-white  dark:text-D-gray-450 scale-y-75 scale-x-90 " />,
        end: <TriangleIcon className="lc-text-gray-700 dark:lc-text-white  dark:text-D-gray-450 scale-y-75 scale-x-90" />,
    },
};
const SymbolPriceBar = () => {
    //
    const {
        option: { selectedSymbol },
    } = useAppValues();

    const { data } = useSymbolGeneralInfo(selectedSymbol, {
        select: (data) => ({
            //
            yesterdayClosingPrice: data?.symbolData?.yesterdayClosingPrice,
            //
            lowThreshold: data?.symbolData?.lowThreshold,
            highThreshold: data?.symbolData?.highThreshold,
            //
            highestTradePriceOfTradingDay: data?.symbolData?.highestTradePriceOfTradingDay,
            lowestTradePriceOfTradingDay: data?.symbolData?.lowestTradePriceOfTradingDay,
            //
            lastTradedPrice: data?.symbolData?.lastTradedPrice,
            firstTradedPrice: data?.symbolData?.firstTradedPrice,
        }),
    });

    return (
        <div className="font-sans">
            <LinearRangeChart
                {...traderOptions}
                originData={data?.yesterdayClosingPrice || 0}
                thresholdData={data?.lowThreshold && data?.highThreshold ? [data?.lowThreshold, data?.highThreshold] : [0, 0]}
                exchangeData={data?.lastTradedPrice && data?.firstTradedPrice ? [data?.firstTradedPrice, data?.lastTradedPrice] : [0, 0]}
                boundaryData={
                    data?.lowestTradePriceOfTradingDay && data?.highestTradePriceOfTradingDay
                        ? [data?.lowestTradePriceOfTradingDay, data?.highestTradePriceOfTradingDay]
                        : [0, 0]
                }
            />
        </div>
    );
};

export default React.memo(SymbolPriceBar);
