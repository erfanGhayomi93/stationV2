import clsx from 'clsx';
import { seprateNumber } from 'src/utils/helpers';

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
            <div
                className={clsx(
                    'text-xs text-L-gray-500 dark:text-D-gray-500 rounded m-1',
                    isOdd ? 'bg-L-gray-150 dark:bg-D-gray-150' : '',
                    isInRange ? '' : 'hidden',
                )}
            >
                <div className="h-full w-full relative">
                    <div
                        className="absolute bg-L-success-100 dark:bg-D-success-100 rounded h-full left-0"
                        style={{ width: `${percent * 100}%` }}
                    ></div>
                    <div className={clsx('relative flex px-2 py-1 h-full items-center')}>
                        <span className="text-right" style={{ width: '20%' }}>
                            {seprateNumber(count)}
                        </span>
                        <span className="cursor-pointer">{seprateNumber(volume)}</span>
                        <span className="mr-auto cursor-pointer">{seprateNumber(price)}</span>
                    </div>
                </div>
            </div>
        );
    }

    if (mode === 'Sell') {
        return (
            <div
                className={clsx(
                    'text-xs text-L-gray-500 dark:text-D-gray-500 rounded m-1',
                    isOdd ? 'bg-L-gray-150 dark:bg-D-gray-150' : '',
                    isInRange ? '' : 'hidden',
                )}
            >
                <div className="h-full w-full relative">
                    <div className="absolute bg-L-error-100 dark:bg-D-error-100 rounded h-full right-0" style={{ width: `${percent * 100}%` }}></div>
                    <div className={clsx('relative flex px-2 py-1 h-full items-center')}>
                        <span className="ml-auto  cursor-pointer ">{seprateNumber(price)}</span>
                        <span className="cursor-pointer ">{seprateNumber(volume)}</span>
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