import clsx from 'clsx';
import React from 'react';

interface Props {
    percent: number;
    height?: `${number}px`;
    topCenter?: string | number;
    bottomCenter?: string | number;
    bgColorClass?: 'bg-progressbar-success' | 'bg-progressbar-error';
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
        <div className="flex flex-col items-center w-full gap-y-0.5">

            <div className="w-full flex items-center text-xs">
                <span className='w-1/3 text-right text-content-paragraph'>{origin === 'end' && (`${Number(percent).toFixed(2)}%`)}</span>
                <span className="w-1/3 text-center text-content-title">{topCenter}</span>
                <span className='w-1/3 text-left text-content-paragraph'>{origin === 'start' && (`${Number(percent).toFixed(2)}%`)}</span>
            </div>

            <div
                className={clsx(
                    'w-full flex items-center rounded-md',
                    origin === 'end' ? 'flex-row-reverse' : '',
                    {
                        'bg-progressbar-success-line': bgColorClass === "bg-progressbar-success",
                        'bg-progressbar-error-line': bgColorClass === "bg-progressbar-error",
                    }
                )}
                style={{ height }}
            >
                <div className={clsx('h-full rounded-md', bgColorClass)} style={{ width: `${Number(percent).toFixed(2)}%` }}></div>
            </div>


            <div className="w-full flex items-center justify-center text-xs text-content-title">
                <span className="w-1/3 text-center">{bottomCenter}</span>
            </div>
        </div>
    );
};

export default ProgressBar;
