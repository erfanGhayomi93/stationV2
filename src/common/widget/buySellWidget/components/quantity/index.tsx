

import FieldInput from "@uiKit/Inputs/FieldInput";
import { FC } from "react";
import { useBuySellContext } from "../../context/buySellContext";
import { useCommissionValue } from "@hooks/useCommissionValue";
import useUpdateEffect from "@hooks/useUpdateEffect";
import ToggleSwitch from "@uiKit/ToggleSwitch";
import QuantityByPercent from "./QuantityByPercent";


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




    return (
        <div className="flex-1 flex flex-col gap-y-4">

            <div className="flex gap-x-1">
                {
                    !isPercentQuantity && <FieldInput
                        value={quantity}
                        onChangeValue={value => {
                            setQuantity(+value)
                        }}
                        placeholder="تعداد"
                        upTickValue={maxTradeQuantity}
                        downTickValue={minTradeQuantity}
                        variant="advanced"
                        type="number"
                        onClickIcon={() => setIsCalculatedQuantity(!isCalculatedQuantity)}
                    />
                }

                {isPercentQuantity && <QuantityByPercent />}

                <ToggleSwitch
                    checked={isPercentQuantity}
                    label="درصدی"
                    onChange={() => setIsPercentQuantity(!isPercentQuantity)}
                />
            </div>


            {
                isCalculatedQuantity && (
                    <FieldInput
                        value={amount}
                        onChangeValue={value => {
                            setAmount(+value)
                        }}
                        placeholder="ارزش"
                        variant="simple"
                        type="number"
                    />
                )
            }
        </div>
    );
};

export default Quantity‌;
