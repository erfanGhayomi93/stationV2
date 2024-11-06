import { sepNumbers } from "@methods/helper";
import clsx from "clsx";

interface PriceDisplayProps {
    value?: number;
    percentage?: number;
    amountChange?: number
}



const  PriceWithAmountChange: React.FC<PriceDisplayProps> = ({ value = 0, percentage = 0, amountChange }) => {

    const percentageClass = clsx('ltr text-xs', {
        'text-content-success-buy': percentage > 0,
        'text-content-error-sell': percentage < 0,
        'text-content-title': percentage === 0,
    });

    return (
        <>
            <span className="flex gap-x-1 items-center">
                <span className={percentageClass}>{`(${percentage}%)`}</span>
                <span className={percentageClass}>{amountChange}</span>
                <span className="text-base text-content-title">{sepNumbers(value)}</span>
            </span>
        </>
    );

}


export default PriceWithAmountChange;