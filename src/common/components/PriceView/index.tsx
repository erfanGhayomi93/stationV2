import clsx from 'clsx';
import React, { useMemo } from 'react';
import { seprateNumber } from 'src/utils/helpers';

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
    positiveClassName = 'text-green-500',
    negativeClassName = 'text-red-500',
    neutralClassName = 'text-gray-500',
    onClickPrice
}: IProps) => {
    //
    const textColorClassName = useMemo(
        () => (percentage === 0 ? neutralClassName : percentage > 0 ? positiveClassName : negativeClassName),
        [percentage],
    );

    return (
        <div className="flex flex-nowrap whitespace-nowrap snap-center gap-1">
            {label ? <span className="ml-1">{label}:</span> : null}
            <div
                className={clsx(textColorClassName, {
                    "cursor-pointer": !!onClickPrice
                })}
                style={{ direction: 'ltr' }}
                onClick={() => onClickPrice ? onClickPrice() : null}
            >
                {`${seprateNumber(price?.toFixed ? +price.toFixed() : price)} (${percentage ? percentage : 0}%)`}
            </div>
        </div>
    );
};

export default React.memo(PriceView);
