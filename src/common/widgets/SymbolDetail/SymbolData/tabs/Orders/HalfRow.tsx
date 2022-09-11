import clsx from 'clsx';
import React from 'react';
import { sepNumbers } from 'src/utils/helpers';

interface Props {
    mode: 'Buy' | 'Sell';
    price: number;
    volume: number;
    count: number;
    isOdd: boolean;
    isInRange: boolean;
}

const HalfRow = ({ mode, price, count, volume, isOdd, isInRange }: Props) => {
    //

    if (mode === 'Buy') {
        return (
            <div className={clsx('flex px-2 py-1 text-xs rounded mx-1 h-full items-center', isOdd ? 'bg-gray-200' : '')}>
                <span className="text-right" style={{ width: '20%' }}>
                    {sepNumbers(count)}
                </span>
                <span className="cursor-pointer hover:font-bold">{sepNumbers(volume)}</span>
                <span className="mr-auto cursor-pointer hover:font-bold">{sepNumbers(price)}</span>
            </div>
        );
    }

    if (mode === 'Sell') {
        return (
            <div className={clsx('flex px-2 py-1 text-xs rounded mx-1 h-full items-center', isOdd ? 'bg-gray-200' : '')}>
                <span className="ml-auto  cursor-pointer hover:font-bold">{sepNumbers(price)}</span>
                <span className="cursor-pointer hover:font-bold">{sepNumbers(volume)}</span>
                <span className="text-left" style={{ width: '20%' }}>
                    {count}
                </span>
            </div>
        );
    }

    return <div></div>;
};

export default HalfRow;
