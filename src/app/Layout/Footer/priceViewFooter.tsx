import React, { useMemo } from 'react';
import { ArrowDropDown, ArrowDropUp } from 'src/common/icons';
import { seprateNumber } from 'src/utils/helpers';

interface IProps {
    price: number;
    percentage: number;
    label?: string;
    positiveClassName?: string;
    negativeClassName?: string;
    neutralClassName?: string;
}

const PriceViewFooter = ({
    price,
    percentage,
    label,
    positiveClassName = 'text-L-success-200 dark:text-D-success-200',
    negativeClassName = 'text-L-error-200 dark:text-D-error-200',
    neutralClassName = 'text-L-gray-700 dark:text-D-gray-700',
}: IProps) => {
    //
    const textColorClassName = useMemo(
        () => (percentage === 0 ? neutralClassName : percentage > 0 ? positiveClassName : negativeClassName),
        [percentage],
    );

    //     const handlePositiveNegative = () => {
    //         if (percentage === 0) {
    //             
    //         } else if (percentage > 0) {
    // 
    //         } else if (percentage < 0) {
    // 
    //         }
    //     }

    return (
        <div className="flex flex-nowrap whitespace-nowrap snap-center mx-4">
            <span>{label}:</span>
            <span className='mx-1'>{price}</span>
            <span className='ml-1'>ریال</span>
            <div className={`${textColorClassName} flex items-center`} style={{ direction: 'ltr' }}>
                {
                    percentage > 0 ? <ArrowDropUp className={textColorClassName} /> : percentage < 0 ? <ArrowDropDown /> : null
                }
                <span className='ml-1'>{percentage}%</span>
            </div>
        </div>
    );
};

export default React.memo(PriceViewFooter);
