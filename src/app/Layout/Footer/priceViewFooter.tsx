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
    symbolISIN: string,
    clickSymbol: (symbolISIN: string) => void,
}

const PriceViewFooter = ({
    price,
    percentage,
    label,
    symbolISIN,
    clickSymbol,
    positiveClassName = 'text-L-success-200 dark:text-D-success-200',
    negativeClassName = 'text-L-error-200 dark:text-D-error-200',
    neutralClassName = 'text-L-gray-700 dark:text-D-gray-700',
}: IProps) => {
    //
    const textColorClassName = useMemo(
        () => (percentage === 0 ? neutralClassName : percentage > 0 ? positiveClassName : negativeClassName),
        [percentage],
    );

    return (
        <div
            className="flex flex-nowrap whitespace-nowrap snap-center ml-4 cursor-pointer"
            onClick={() => clickSymbol(symbolISIN)}
        >
            <span>{label}:</span>
            <span className='mx-1'>{seprateNumber(price)}</span>
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
