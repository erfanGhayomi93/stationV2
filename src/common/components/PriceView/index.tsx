import React, { useMemo } from 'react';
import { seprateNumber } from 'src/utils/helpers';

interface IProps {
    price: number;
    percentage: number;
    label?: string;
    positiveClassName?: string;
    negativeClassName?: string;
    neutralClassName?: string;
}

const PriceView = ({
    price,
    percentage,
    label,
    positiveClassName = 'text-green-500',
    negativeClassName = 'text-red-500',
    neutralClassName = 'text-gray-500',
}: IProps) => {
    //
    const textColorClassName = useMemo(
        () => (percentage === 0 ? neutralClassName : percentage > 0 ? positiveClassName : negativeClassName),
        [percentage],
    );

    return (
        <div className="flex flex-nowrap whitespace-nowrap snap-center">
            {label ? <span className="ml-1">{label}:</span> : null}
            <div className={textColorClassName} style={{ direction: 'ltr' }}>
                {`${seprateNumber(price?.toFixed ? +price.toFixed() : price)} (${percentage}%)`}
            </div>
        </div>
    );
};

export default React.memo(PriceView);
