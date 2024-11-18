

import { FC, useEffect, useMemo } from "react";
import { useBuySellContext } from "../../context/buySellContext";
import PriceByPercent from "./PriceByPercent";
import ToggleSwitch from "@uiKit/ToggleSwitch";
import { useSymbolStore } from "@store/symbol";
// import { SubscribeSymbolBestOneOrders } from "@LS/subscribes";
// import { pushEngine } from "@LS/pushEngine";
import FieldInputNumber from "@uiKit/Inputs/FieldInputNumber";
import useUpdateEffect from "@hooks/useUpdateEffect";


interface IPriceProps {
    downTickValue?: number;
    upTickValue?: number;
    bestBuyLimitPrice_1?: number;
    bestSellLimitPrice_1?: number;
}

const Price: FC<IPriceProps> = ({ downTickValue, upTickValue, bestBuyLimitPrice_1, bestSellLimitPrice_1 }) => {
    const { selectedSymbol } = useSymbolStore()

    const { price, setPrice, isPercentPrice, setIsPercentPrice, side, isLockPrice, setIsLockPrice } = useBuySellContext()

    const setPriceProcess = () => {
        const price = side === 'Buy' ? bestSellLimitPrice_1 : bestBuyLimitPrice_1
        if (price) {
            setPrice(price)
        }
        // subscribeBestPrice()
    }

    useUpdateEffect(() => {
        if (isLockPrice) {
            setPriceProcess()
        }
    }, [bestSellLimitPrice_1, bestBuyLimitPrice_1])

    const handleLockPrice = () => {
        setIsLockPrice(true)
        setPriceProcess()
    }

    const handleUnLockPrice = () => {
        setIsLockPrice(false)
        // if (isLockPrice) pushEngine.unSubscribe('SymbolBestOneOrders');
    }

    const handleClickLock = () => {
        if (isLockPrice) {
            handleUnLockPrice()
            return
        }

        handleLockPrice()
    }

    // const subscribeBestPrice = () => {
    //     SubscribeSymbolBestOneOrders(selectedSymbol, ["bestBuyLimitPrice_1", "bestSellLimitPrice_1"], (changedFields) => {
    //         if ('bestBuyLimitPrice_1' in changedFields && side === 'Sell') {
    //             setPrice(changedFields.bestBuyLimitPrice_1)
    //         }
    //         else if ('bestSellLimitPrice_1' in changedFields && side === 'Buy') {
    //             setPrice(changedFields.bestSellLimitPrice_1)
    //         }
    //     })
    // }

    useEffect(() => {
        return () => {
            handleUnLockPrice()
        }
    }, [side, selectedSymbol])



    const isBetweenUpDownTick = useMemo(() => {
        if (!downTickValue || !upTickValue) return true;

        return price >= downTickValue && price <= upTickValue;
    }, [price, downTickValue, upTickValue]);


    return (
        <div className="flex-1 flex items-center">
            <div className="w-9/12 flex pl-4">
                {
                    !isPercentPrice &&
                    <FieldInputNumber
                        value={price}
                        onChangeValue={value => {
                            setPrice(+value)
                            setIsLockPrice(false);
                        }}
                        placeholder="قیمت"
                        upTickValue={upTickValue}
                        downTickValue={downTickValue}
                        variant="advanced"
                        selectIcon={isLockPrice ? "lock-1" : "lock-0"}
                        onClickIcon={handleClickLock}
                        isError={!isBetweenUpDownTick}
                        textError="قیمت در آستانه مجاز نمی‌باشد."
                    />
                }

                {isPercentPrice && <PriceByPercent
                    upTickValue={upTickValue}
                    downTickValue={downTickValue}
                />}
            </div>

            <div className="w-3/12">
                <ToggleSwitch
                    checked={isPercentPrice}
                    label="درصدی"
                    onChange={() => setIsPercentPrice(!isPercentPrice)}
                />
            </div>

        </div>
    );
};

export default Price;