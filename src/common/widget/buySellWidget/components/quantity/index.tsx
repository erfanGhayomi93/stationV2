

import { FC, useEffect, useMemo } from "react";
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

    const { quantity, side, price, amount, isCalculatedQuantity, setQuantity, isPercentQuantity, setIsPercentQuantity, setIsCalculatedQuantity, setAmount, isDivideOrder, setIsDivideOrder } = useBuySellContext()

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

    //     const isBetweenMaxMinQuantity = useMemo(() => {
    //         if (!minTradeQuantity || !maxTradeQuantity) return true;
    // 
    //         return quantity >= minTradeQuantity && quantity <= maxTradeQuantity;
    //     }, [quantity, minTradeQuantity, maxTradeQuantity]);


    const calcIsDivideOrder = useMemo(() => {
        if (!maxTradeQuantity) return false;

        return quantity > maxTradeQuantity
    }, [quantity, maxTradeQuantity]);

    useEffect(() => {
        setIsDivideOrder(calcIsDivideOrder)
    }, [calcIsDivideOrder])



    return (
        <div className={clsx('flex-1 flex flex-col gap-y-4', styles.container)}>

            <div className="flex items-center">
                <div className="flex w-9/12 pl-4">
                    {
                        !isPercentQuantity && (
                            <FieldInputNumber
                                value={quantity}
                                onChangeValue={value => setQuantity(+value)}
                                placeholder="حجم"
                                upTickValue={maxTradeQuantity}
                                downTickValue={minTradeQuantity}
                                variant="advanced"
                                onClickIcon={() => setIsCalculatedQuantity(!isCalculatedQuantity)}
                                // isError={!isBetweenMaxMinQuantity}
                                // textError="حجم در تعداد مجاز نمی‌باشد."
                                selectIcon={!isCalculatedQuantity ? 'calculator-0' : 'calculator-1'}
                                isInfo={isDivideOrder}
                            />
                        )
                    }

                    {isPercentQuantity && <QuantityByPercent />}
                </div>

                <div className="w-3/12">
                    <ToggleSwitch
                        checked={isPercentQuantity}
                        label="درصدی"
                        onChange={() => setIsPercentQuantity(!isPercentQuantity)}
                    />
                </div>
            </div>


            {
                isCalculatedQuantity && (
                    <div className="w-9/12 pl-4">
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
