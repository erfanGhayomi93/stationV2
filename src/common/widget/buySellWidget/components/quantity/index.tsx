

import { FC, useMemo } from "react";
import { useBuySellContext } from "../../context/buySellContext";
import { useCommissionValue } from "@hooks/useCommissionValue";
import useUpdateEffect from "@hooks/useUpdateEffect";
import ToggleSwitch from "@uiKit/ToggleSwitch";
import QuantityByPercent from "./QuantityByPercent";
import FieldInputNumber from "@uiKit/Inputs/FieldInputNumber";
import styles from './../../index.module.scss'
import clsx from "clsx";



interface IPriceProps {
    minTradeQuantity?: number;
    maxTradeQuantity?: number;
    marketUnit?: TMarketUnit
}

const Quantity‌: FC<IPriceProps> = ({ minTradeQuantity, maxTradeQuantity, marketUnit }) => {

    const { quantity, side, price, amount, isCalculatedQuantity, setQuantity, isPercentQuantity, setIsPercentQuantity, setIsCalculatedQuantity, setAmount } = useBuySellContext()

    const { buyCommission, sellCommission } = useCommissionValue(marketUnit)

    const getTradedQuantity = () => {
        try {
            const commissionValue = side === 'Buy' ? buyCommission : sellCommission;
            return side === 'Buy' ? amount / (commissionValue * price + price) : amount / (-commissionValue * price + price)
        }
        catch {
            return 0
        }
    };

    useUpdateEffect(() => {
        if (price && isCalculatedQuantity) {
            setQuantity(Math.floor(getTradedQuantity()))
        }
    }, [price, amount])

    const isBetweenMaxMinQuantity = useMemo(() => {
        if (!minTradeQuantity || !maxTradeQuantity) return true;

        return quantity >= minTradeQuantity && quantity <= maxTradeQuantity;
    }, [quantity, minTradeQuantity, maxTradeQuantity]);


    //     useEffect(() => {
    //         if (sizeRef.current) {
    //             const resizeObserver = new ResizeObserver(() => {
    //                 setwidthSize(sizeRef?.current?.offsetWidth)
    //             });
    // 
    //             resizeObserver.observe(sizeRef.current);
    // 
    //             return () => resizeObserver.disconnect(); // Cleanup observer on unmount
    //         }
    //     }, []);



    return (
        <div className={clsx('flex-1 flex flex-col gap-y-4', styles.container)}>

            <div className="flex items-center">
                <div className="flex w-9/12 px-4">
                    {
                        !isPercentQuantity && (
                            <FieldInputNumber
                                value={quantity}
                                onChangeValue={value => setQuantity(+value)}
                                placeholder="تعداد"
                                upTickValue={maxTradeQuantity}
                                downTickValue={minTradeQuantity}
                                variant="advanced"
                                onClickIcon={() => setIsCalculatedQuantity(!isCalculatedQuantity)}
                                isError={!isBetweenMaxMinQuantity}
                                textError="حجم در تعداد مجاز نمی‌باشد."
                                selectIcon={!isCalculatedQuantity ? 'calculator-0' : 'calculator-1'}
                            />
                        )
                    }

                    {isPercentQuantity && <QuantityByPercent />}
                </div>

                <div className="w-3/12 pl-4">
                    <ToggleSwitch
                        checked={isPercentQuantity}
                        label="درصدی"
                        onChange={() => setIsPercentQuantity(!isPercentQuantity)}
                    />
                </div>
            </div>


            {
                isCalculatedQuantity && (
                    <div className="w-9/12 px-4">
                        <FieldInputNumber
                            value={amount}
                            onChangeValue={value => {
                                setAmount(+value)
                            }}
                            placeholder="ارزش"
                            variant="simple"
                        />
                    </div>
                )
            }
        </div>
    );
};

export default Quantity‌;
