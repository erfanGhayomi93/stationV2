import { FC } from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { setSelectedSymbol } from 'src/redux/slices/option';
import { abbreviateNumber, seprateNumber } from 'src/utils/helpers';

interface IResultItemsProps {
    data: GetSameSectorResultType
}

const ResultItems: FC<IResultItemsProps> = ({ data }) => {
    const { symbolTitle, lastTradedPrice, totalNumberOfSharesTraded, lastTradedPriceVarPercent, bestSellPrice, bestBuyPrice } = data

    const dispatch = useAppDispatch()

    const handleSelectSymbol = () => {
        dispatch(setSelectedSymbol(data.symbolISIN))
    }

    const colorClass = (change: number) => {
        if (+change > 0) return 'text-L-success-200 dark:text-D-success-200';

        if (+change < 0) return 'text-L-error-200 dark:text-D-error-200';

        return 'text-L-gray-500 dark:text-D-gray-500';
    };

    return (
        <div
            className="flex h-10 bg-L-basic dark: dark:bg-D-basic even:bg-L-gray-100 dark:even:bg-D-gray-100 cursor-pointer"
            onClick={handleSelectSymbol}

        >
            <div className="w-1/5 flex items-center justify-center px-2 text-L-gray-700 dark:text-D-gray-700">
                <div className='truncate'>
                    {symbolTitle || '-'}
                </div>
            </div>
            <div className="w-1/5 flex items-center justify-center text-L-gray-700 dark:text-D-gray-700">
                {abbreviateNumber(totalNumberOfSharesTraded || 0)}
            </div>
            <div className="w-2/5 flex flex-col items-center justify-center text-L-gray-700 dark:text-D-gray-700">
                <div>{seprateNumber(lastTradedPrice || 0)}</div>
                <div className={colorClass(lastTradedPriceVarPercent as number)}>
                    {`\u200E${lastTradedPriceVarPercent}`}%
                </div>
            </div>
            <div className="w-1/5 flex flex-col items-center justify-center">
                <div className='text-L-error-200'>{seprateNumber(bestSellPrice || 0)}</div>
                <div className='text-L-success-200'>{seprateNumber(bestBuyPrice || 0)}</div>
            </div>
        </div>
    );
};

export default ResultItems;
