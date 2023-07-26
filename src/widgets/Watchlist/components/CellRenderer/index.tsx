import { seprateNumber } from 'src/utils/helpers';

export const LastTradedPrice = ({ data }: any) => {
    const colorClass = (change: number) => {
        if (+change > 0) return 'text-L-success-200 dark:text-D-success-200';

        if (+change < 0) return 'text-L-error-200 dark:text-D-error-200';

        return 'text-L-gray-500 dark:text-D-gray-500';
    };

    return (
        <div className="flex items-center justify-center w-full flex-row-reverse">
            <div>{seprateNumber(data.lastTradedPrice)}</div>
            <div>
                <span className={`ml-1 ${colorClass(data.lastTradedPriceVarPercent)}`}>{data.lastTradedPriceVarPercent}%</span>
            </div>
        </div>
    );
};

export const ClosingPrice = ({ data }: any) => {
    const colorClass = (change: number) => {
        if (+change > 0) return 'text-L-success-200 dark:text-D-success-200';

        if (+change < 0) return 'text-L-error-200 dark:text-D-error-200 ltr';

        return 'text-L-gray-500 dark:text-D-gray-500';
    };

    return (
        <div className="flex items-center justify-center w-full flex-row-reverse">
            <div>{seprateNumber(data.closingPrice)}</div>
            <div>
                <span className={`ml-1 ${colorClass(data.closingPriceVarPercent)}`}>{data.closingPriceVarPercent}%</span>
            </div>
        </div>
    );
};
