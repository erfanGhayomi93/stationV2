import React from 'react';
import { abbreviateNumber, seprateNumber } from 'src/utils/helpers';

interface IResultItemsProps {
    symbolTitle?: string;
    volume?: number;
    lastTradedPrice?: number;
    lastTradedPercent?: number;
    offer?: number;
    demand?: number;
}

const ResultItems = ({ symbolTitle, volume, lastTradedPrice, lastTradedPercent, offer, demand }: IResultItemsProps) => {
    return (
        <div className="flex h-10 bg-L-basic dark: dark:bg-D-basic even:bg-L-gray-100 dark:even:bg-D-gray-100">
            <div className="w-1/5 flex items-center justify-center px-2 text-L-gray-500 dark:text-D-gray-700">
                <div className='truncate'>
                {symbolTitle || '-'}
                </div>
            </div>
            <div className="w-1/5 flex items-center justify-center text-L-gray-500 dark:text-D-gray-700">
                {abbreviateNumber(volume || 0)}
            </div>
            <div className="w-2/5 flex flex-col items-center justify-center text-L-gray-500 dark:text-D-gray-700">
                <div>{seprateNumber(lastTradedPrice || 0)}</div>
                <div>{lastTradedPercent || 0}</div>
            </div>
            <div className="w-1/5 flex flex-col items-center justify-center text-L-gray-500 dark:text-D-gray-700">
                <div className='text-L-error-200'>{seprateNumber(offer || 0)}</div>
                <div className='text-L-success-200'>{seprateNumber(demand || 0)}</div>
            </div>
        </div>
    );
};

export default ResultItems;
