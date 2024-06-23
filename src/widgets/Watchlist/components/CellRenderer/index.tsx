import { ICellRendererParams } from 'ag-grid-community';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { seprateNumber } from 'src/utils/helpers';

export const LastTradedPrice = ({ data, value, valueFormatted }: ICellRendererParams<ISymbolType>) => {

    const cellValue = Number(value || 0);

    const timer = useRef<NodeJS.Timeout | undefined>(undefined);
    const [changedValue, setChangedValue] = useState<number>(cellValue);


    useEffect(() => {
        if (changedValue === cellValue) return;

        timer.current = setTimeout(() => setChangedValue(cellValue || 0), 2000);

        return () => {
            clearTimeout(timer.current);
        }
    }, [cellValue, changedValue]);

    const iconRenderer = () => {
        if (cellValue > changedValue)
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="48"
                        d="M112 244l144-144 144 144M256 120v292"
                    />
                </svg>
            );
        if (cellValue < changedValue)
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="48"
                        d="M112 268l144 144 144-144M256 392V100"
                    />
                </svg>
            );

        return null;
    };


    const colorClass = (change: number) => {
        if (+change > 0) return 'text-L-success-200 dark:text-D-success-200';

        if (+change < 0) return 'text-L-error-200 dark:text-D-error-200';

        return 'text-L-gray-500 dark:text-D-gray-500';
    };


    return (
        <div
            className={clsx('flex justify-center items-center dir-ltr w-full gap-2', {
                'text-L-success-200 dark:text-D-success-200': cellValue > changedValue,
                'text-L-error-200 dark:text-D-error-200': cellValue < changedValue,
            })}
        >
            <span
                className={clsx('text-center whitespace-nowrap  max-w-full', {
                    'font-extrabold': cellValue !== changedValue,
                })}
                style={{ width: 'calc(100% - 28px)' }}
            >
                <span>{valueFormatted}</span>

                <span
                    className={`ml-1 ${colorClass(data?.lastTradedPriceVarPercent as number)}`}
                >
                    {`\u200E${data?.lastTradedPriceVarPercent}`}%</span>

            </span>

            <span style={{ width: '12px' }} className="absolute right-2">
                {iconRenderer()}
            </span>
        </div>
        //         <div className="flex items-center justify-center w-full flex-row ltr">
        //             <span>{seprateNumber(data?.lastTradedPrice)}</span>
        // 
        //             <span className={` ${colorClass(data?.lastTradedPriceVarPercent as number)}`}>
        //                 {`\u200E${data?.lastTradedPriceVarPercent}`}%
        //             </span>
        //         </div>
    );
};

export const ClosingPrice = ({ data }: ICellRendererParams<ISymbolType>) => {
    const colorClass = (change: number) => {
        if (+change > 0) return 'text-L-success-200 dark:text-D-success-200';

        if (+change < 0) return 'text-L-error-200 dark:text-D-error-200 ltr';

        return 'text-L-gray-500 dark:text-D-gray-500';
    };

    return (
        <div className="flex items-center justify-center w-full flex-row-reverse">
            <div>{seprateNumber(data?.closingPrice)}</div>
            <div>
                <span className={`ml-1 ${colorClass(data?.closingPriceVarPercent as number)}`}>{`\u200E${data?.closingPriceVarPercent}`}%</span>
            </div>
        </div>
    );
};

export const SymbolTradeState = ({ data }: ICellRendererParams<ISymbolType>) => {
    return (
        <div className="flex items-center gap-2">
            <span
                className={clsx(
                    'w-1.5 h-1.5 rounded-full',
                    { 'bg-L-success-200': data?.symbolTradeState === 'Open' },
                    { 'bg-L-warning': data?.symbolTradeState === 'Reserved' },
                    { 'bg-L-error-200': ['Frozen', 'Suspended'].includes(data?.symbolTradeState || '') },
                )}
            ></span>
            <span>{data?.symbolTitle || '-'}</span>
        </div>
    );
};
