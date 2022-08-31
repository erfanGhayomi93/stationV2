import React, { useMemo } from 'react';
import { sepNumbers } from 'src/utils/helpers';

interface IProps {
    price: number;
    percentage: number;
    positiveClassName?: string;
    negativeClassName?: string;
    neutralClassName?: string;
}

const PriceView = ({
    price,
    percentage,
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
        <div className={textColorClassName} style={{ direction: 'ltr' }}>
            {`${sepNumbers(price?.toFixed ? +price.toFixed() : price)} (${percentage}%)`}
        </div>
    );
};

export default PriceView;
