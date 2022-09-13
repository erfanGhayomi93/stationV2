import clsx from 'clsx';
import React from 'react';

interface Props {
    percent: number;
    height?: `${number}px`;
    topCenter?: string | number;
    bottomCenter?: string | number;
    bgColorClass?: 'bg-L-success-150 dark:bg-D-success-150' | 'bg-L-error-150 dark:bg-D-error-150' | 'bg-sky-500';
    origin?: 'start' | 'end';
}

const ProgressBar: React.FC<Props> = ({
    percent,
    height = '6px',
    topCenter = '',
    bottomCenter = '',
    bgColorClass = 'bg-sky-500',
    origin = 'start',
}) => {
    return (
        <div className="flex flex-col items-center w-full">
            {/* Top */}
            <div className="w-full flex items-center justify-between text-xs dark:text-L-basic text-D-basic">
                <span className="w-1/3 text-right text-L-gray-400 dark:text-L-gray-400">{`${Number(percent).toFixed(2)}%`}</span>
                <span className="w-1/3 text-center">{topCenter}</span>
                <span className="w-1/3 text-left text-L-gray-400 dark:text-L-gray-400"></span> {/* Add To Props IF Needed*/}
            </div>

            <div
                className={clsx(
                    'w-full flex items-center border rounded-md border-L-gray-350 dark:border-D-gray-350 ',
                    origin === 'end' ? 'flex-row-reverse' : '',
                )}
                style={{ height }}
            >
                <div className={clsx('h-full rounded-md', bgColorClass)} style={{ width: `${Number(percent).toFixed(2)}%` }}></div>
            </div>

            {/* Bottom */}
            <div className="w-full flex items-center justify-center text-xs dark:text-L-basic text-D-basic">
                <span className="w-1/3 text-right text-L-gray-400 dark:text-L-gray-400"></span> {/* Add To Props IF Needed*/}
                <span className="w-1/3 text-center">{bottomCenter}</span>
                <span className="w-1/3 text-left text-L-gray-400 dark:text-L-gray-400"></span> {/* Add To Props IF Needed*/}
            </div>
        </div>
    );
};

export default ProgressBar;
