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
    percent: number;
}

const HalfRow = ({ mode, price, count, volume, isOdd, isInRange, percent }: Props) => {
    //

    if (mode === 'Buy') {
        return (
            <div className={clsx('text-xs rounded m-1', isOdd ? 'bg-gray-200' : '', isInRange ? '' : 'hidden')}>
                <div className="h-full w-full relative">
                    <div className="absolute bg-green-200 rounded h-full left-0" style={{ width: `${percent * 100}%` }}></div>
                    <div className={clsx('relative flex px-2 py-1 h-full items-center')}>
                        <span className="text-right" style={{ width: '20%' }}>
                            {sepNumbers(count)}
                        </span>
                        <span className="cursor-pointer">{sepNumbers(volume)}</span>
                        <span className="mr-auto cursor-pointer">{sepNumbers(price)}</span>
                    </div>
                </div>
            </div>
        );
    }

    if (mode === 'Sell') {
        return (
            <div className={clsx('text-xs rounded m-1', isOdd ? 'bg-gray-200' : '', isInRange ? '' : 'hidden')}>
                <div className="h-full w-full relative">
                    <div className="absolute bg-red-200 rounded h-full right-0" style={{ width: `${percent * 100}%` }}></div>
                    <div className={clsx('relative flex px-2 py-1 h-full items-center')}>
                        <span className="ml-auto  cursor-pointer ">{sepNumbers(price)}</span>
                        <span className="cursor-pointer ">{sepNumbers(volume)}</span>
                        <span className="text-left" style={{ width: '20%' }}>
                            {count}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return <div></div>;
};

export default HalfRow;
