

import FieldInput from "@uiKit/Inputs/FieldInput";
import { FC, useEffect } from "react";
import { useBuySellContext } from "../../context/buySellContext";
import PriceByPercent from "./PriceByPercent";
import ToggleSwitch from "@uiKit/ToggleSwitch";
import { useSymbolStore } from "@store/symbol";
import { SubscribeSymbolBestOneOrders } from "@LS/subscribes";
import { pushEngine } from "@LS/pushEngine";


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
        subscribeBestPrice()
    }

    const handleLockPrice = () => {
        setIsLockPrice(true)
        setPriceProcess()
    }

    const handleUnLockPrice = () => {
        setIsLockPrice(false)
        if (isLockPrice) pushEngine.unSubscribe('SymbolBestOneOrders');
    }

    const handleClickLock = () => {
        if (isLockPrice) {
            handleUnLockPrice()
            return
        }

        handleLockPrice()
    }

    const subscribeBestPrice = () => {
        SubscribeSymbolBestOneOrders(selectedSymbol, ["bestBuyLimitPrice_1", "bestSellLimitPrice_1"], (changedFields) => {
            if ('bestBuyLimitPrice_1' in changedFields && side === 'Sell') {
                setPrice(changedFields.bestBuyLimitPrice_1)
            }
            else if ('bestSellLimitPrice_1' in changedFields && side === 'Buy') {
                setPrice(changedFields.bestSellLimitPrice_1)
            }
        })
    }

    useEffect(() => {
        return () => {
            handleUnLockPrice()
        }
    }, [side, selectedSymbol])


    return (
        <div className="flex-1 flex gap-x-1">

            {!isPercentPrice &&
                <FieldInput
                    value={price}
                    onChangeValue={value => setPrice(+value)}
                    placeholder="قیمت"
                    upTickValue={upTickValue}
                    downTickValue={downTickValue}
                    variant="advanced"
                    type="number"
                    selectIcon={isLockPrice ? "lock-1" : "lock-0"}
                    onClickIcon={handleClickLock}
                />}

            {isPercentPrice && <PriceByPercent />}

            <ToggleSwitch
                checked={isPercentPrice}
                label="درصدی"
                onChange={() => setIsPercentPrice(!isPercentPrice)}
            />

        </div>
    );
};

export default Price;