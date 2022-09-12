import clsx from 'clsx';
import { FC } from 'react';
export interface ICounterBalloonType {
    count: number;
}

export const CounterBalloon: FC<ICounterBalloonType> = ({ count }) => {
    return (
        <span
            className={clsx(
                'absolute text-[10px] bg-L-secondary-50  -top-3 -left-2 rounded-full flex justify-center text-white items-center leading-none pt-0.5 w-5 h-5 duration-200',
                !!count ? '' : 'scale-0',
            )}
        >
            {count > 99 ? '99+' : count}
        </span>
    );
};
