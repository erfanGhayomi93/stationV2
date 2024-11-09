import { numFormatter, sepNumbers } from '@methods/helper';
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
          <div className="flex w-full flex-col items-center gap-y-0.5">
               <div className="flex w-full items-center justify-between text-xs">
                    {origin === 'end' && (
                         <span className="text-right text-content-paragraph">{`${Number(percent).toFixed(2)}%`}</span>
                    )}
                    {origin === 'start' && <span className="text-content-paragraph">{`${Number(percent).toFixed(2)}%`}</span>}
                    <span className="text-nowrap text-center text-content-title">{numFormatter(Number(topCenter))}</span>
                    <div className="flex items-center justify-center text-xs text-content-title">
                         <span className="text-center">{sepNumbers(bottomCenter)}</span>
                    </div>
               </div>

               <div
                    className={clsx('flex w-full items-center rounded-md', origin === 'end' ? 'flex-row-reverse' : '', {
                         'bg-progressbar-success-line': bgColorClass === 'bg-progressbar-success',
                         'bg-progressbar-error-line': bgColorClass === 'bg-progressbar-error',
                    })}
                    style={{ height }}
               >
                    <div
                         className={clsx('h-full rounded-md', bgColorClass)}
                         style={{ width: `${Number(percent).toFixed(2)}%` }}
                    ></div>
               </div>
          </div>
     );
};

export default ProgressBar;
