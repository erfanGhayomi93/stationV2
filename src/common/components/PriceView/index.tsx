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
    positiveClassName = 'text-L-success-200',
    negativeClassName = 'text-L-error-200',
    neutralClassName = 'text-L-gray-600 dark:text-D-gray-600',
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
