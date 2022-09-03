import React from 'react';
import LinearRangeChart from 'src/common/components/LinearRangeChart';
import { TriangleIcon } from 'src/common/components/LinearRangeChart/Icons';
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
        className: 'lc-border-solid lc-border-slate-300 dark:border-dark-gray-700 lc-border-t-8 ',
        rulerClassName: 'lc-text-gray-400 lc-h-6 ',
        threshold: true,
    },
    thresholdSetting: {
        thresholdStartClassName: 'lc-hidden',
        thresholdEndClassName: 'lc-hidden',
    },
    originSetting: {
        className: 'lc-text-sm lc-bg-slate-200 lc-text-slate-400 lc-px-2 lc-py-1 lc-mb-2 lc-rounded dark:bg-dark-gray-700 dark:text-white',
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
        className: 'lc-text-slate-600',
    },
    exchangeIcons: {
        start: <TriangleIcon className="lc-rotate-180 lc-text-gray-700 dark:lc-text-white dark:text-dark-primary-100" />,
        end: <TriangleIcon className="lc-text-gray-700 dark:lc-text-white dark:text-dark-primary-100" />,
    },
};
const SymbolPriceBar = () => {
    //
    return (
        <div className="font-sans">
            <LinearRangeChart
                {...traderOptions}
                originData={2000}
                thresholdData={[1000, 3000]}
                exchangeData={[1200, 2400]}
                boundaryData={[1600, 2800]}
            />
        </div>
    );
};

export default React.memo(SymbolPriceBar);
