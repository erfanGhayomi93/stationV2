import { ICellRendererParams } from 'ag-grid-community';
import clsx from 'clsx';
import { seprateNumber } from 'src/utils/helpers';

export const LastTradedPrice = ({ data }: ICellRendererParams<ISymbolType>) => {
    const colorClass = (change: number) => {
        if (+change > 0) return 'text-L-success-200 dark:text-D-success-200';

        if (+change < 0) return 'text-L-error-200 dark:text-D-error-200';

        return 'text-L-gray-500 dark:text-D-gray-500';
    };

    return (
        <div className="flex items-center justify-center w-full flex-row-reverse">
            <div>{seprateNumber(data?.lastTradedPrice)}</div>
            <div>
                <span className={`ml-1 ltr ${colorClass(data?.lastTradedPriceVarPercent as number)}`}>
                    {`\u200E${data?.lastTradedPriceVarPercent}`}%
                </span>
            </div>
        </div>
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
