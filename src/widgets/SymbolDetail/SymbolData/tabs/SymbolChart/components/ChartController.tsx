import Tippy from '@tippyjs/react';
import clsx from 'clsx';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Radiobox from 'src/common/components/Radiobox';
import { useSymbolTabsDispatch, useSymbolTabsState } from '../../../context';

const ChartController = () => {
    //
    const { symbolChartDate, symbolChartType } = useSymbolTabsState();
    const dispatch = useSymbolTabsDispatch();
    const { t } = useTranslation();

    const toggleChartDate = (date: SymbolChartDate) => dispatch({ type: 'TOGGLE_CHART_DATE', payload: date });
    const toggleChartType = (type: SymbolChartType) => dispatch({ type: 'TOGGLE_CHART_TYPE', payload: type });

    const DATE_OPTIONS: { label: string; value: SymbolChartDate }[] = [
        {
            label: t('dates.daily'),
            value: 'Today',
        },
        {
            label: t('dates.weekly'),
            value: 'Weekly',
        },
        {
            label: t('dates.monthly'),
            value: 'Monthly',
        },
        {
            label: t('dates.yearly'),
            value: 'Yearly',
        },
    ];

    return (
        <div className="flex items-center justify-between">
            <div className="flex gap-4">
                {DATE_OPTIONS.map((date) => (
                    <Radiobox
                        key={date.value}
                        checked={symbolChartDate === date.value}
                        label={date.label}
                        onChange={() => toggleChartDate(date.value)}
                        classes={{ label: 'text-xs' }}
                    />
                ))}
            </div>
            <div className="flex gap-2">
                <Tippy content={t('SymbolDetails.linearChart')} className="text-xs">
                    <button
                        onClick={() => toggleChartType('Linear')}
                        className={clsx(
                            'p-[2px] rounded',
                            symbolChartType === 'Linear'
                                ? ' bg-L-primary-50 text-L-basic dark:bg-D-primary-50 dark:text-D-basic'
                                : ' bg-L-gray-300 text-L-gray-500 dark:bg-D-gray-300 dark:text-D-gray-500',
                        )}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.9999 21H3V3H4.38464V18.021L7.73879 12.9899L10.4642 15.7155L13.3063 10.7416L15.5028 13.6704L19.7863 8.77466L20.8289 9.68674L15.4204 15.8677L13.4633 13.2581L10.7668 17.9763L7.95356 15.1636L4.9859 19.6154L21 19.6151L20.9999 21Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                </Tippy>
                <Tippy content={t('SymbolDetails.candleChart')} className="text-xs">
                    <button
                        onClick={() => toggleChartType('Candle')}
                        className={clsx(
                            'p-[2px] rounded',
                            symbolChartType === 'Candle'
                                ? 'bg-L-primary-50 text-L-basic dark:bg-D-primary-50 dark:text-D-basic'
                                : 'bg-L-gray-300 text-L-gray-500 dark:bg-D-gray-300 dark:text-D-gray-500',
                        )}
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.98524 4.75572H10.0145C10.6713 4.75651 11.2034 5.28691 11.2042 5.94164V12.9021C11.2034 13.5568 10.6709 14.0868 10.0145 14.0876H9.98524V15.9858C9.97277 16.4629 9.58139 16.8433 9.1023 16.8433C8.62361 16.8433 8.23184 16.4629 8.21975 15.9858V14.0876H8.19013C7.53327 14.0868 7.00117 13.5568 7 12.9021V5.94164C7.0008 5.28689 7.5329 4.7565 8.19013 4.75572H8.21975V2.85757C8.23184 2.38041 8.62361 2 9.1023 2C9.58139 2 9.97277 2.38041 9.98524 2.85757V4.75572Z"
                                fill="currentColor"
                            />
                            <path
                                d="M15.7799 9.89063H15.8103C16.4655 9.89143 16.9977 10.4203 17 11.0735V18.0366C16.9988 18.6913 16.4671 19.2217 15.8103 19.2221H15.7799V21.1203C15.7799 21.606 15.3846 22 14.8973 22C14.4096 22 14.0148 21.606 14.0148 21.1203V19.2252H13.9843C13.3279 19.2244 12.7958 18.694 12.795 18.0397V11.0766C12.7958 10.4218 13.3279 9.89141 13.9843 9.89063H14.0148V7.99248C14.0148 7.50676 14.4096 7.11276 14.8973 7.11276C15.3846 7.11276 15.7799 7.50677 15.7799 7.99248V9.89063Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                </Tippy>
            </div>
        </div>
    );
};

export default ChartController;
