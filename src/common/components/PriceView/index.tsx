import { sepNumbers } from '@methods/helper';
import clsx from 'clsx';
import React, { useMemo } from 'react';

interface IProps {
    price: number;
    percentage: number;
    label?: string;
    positiveClassName?: string;
    negativeClassName?: string;
    neutralClassName?: string;
    onClickPrice?: () => void
}

const PriceView = ({
    price,
    percentage,
    label,
    positiveClassName = 'text-content-success-buy',
    negativeClassName = 'text-content-error-sell',
    neutralClassName = 'text-content-title',
    onClickPrice
}: IProps) => {
    //
    const textColorClassName = useMemo(() => (percentage === 0 ? neutralClassName : percentage > 0 ? positiveClassName : negativeClassName),
        [percentage],
    );

    return (
        <div className="flex flex-nowrap whitespace-nowrap snap-center gap-1 text-xs p-2">
            {label ?
                <span className="ml-1">
                    {label}:</span>
                : null}
            <div
                className={clsx(textColorClassName, {
                    "cursor-pointer": !!onClickPrice
                })}
                style={{ direction: 'ltr' }}
                onClick={() => onClickPrice ? onClickPrice() : null}
            >
                {`${sepNumbers(price?.toFixed ? +price.toFixed() : price)} (${percentage ? percentage : 0}%)`}
            </div>
        </div>
    );
};

export default React.memo(PriceView);
