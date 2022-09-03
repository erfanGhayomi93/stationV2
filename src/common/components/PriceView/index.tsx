import React, { useMemo } from 'react';
import { sepNumbers } from 'src/utils/helpers';

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
    neutralClassName = 'text-gray-300',
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
                {`${sepNumbers(price?.toFixed ? +price.toFixed() : price)} (${percentage}%)`}
            </div>
        </div>
    );
};

export default React.memo(PriceView);
