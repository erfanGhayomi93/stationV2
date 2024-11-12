import SelectInput from "@uiKit/Inputs/SelectInput"
import { useBuySellContext } from "../../context/buySellContext"
import useUpdateEffect from "@hooks/useUpdateEffect"
// import { useQuerySymbolGeneralInformation } from "@api/Symbol"
import { useSymbolStore } from "@store/symbol"
import { FC, useEffect, useMemo } from "react"
import FieldInputNumber from "@uiKit/Inputs/FieldInputNumber"
import { useQuerySymbolGeneralInformation } from "@api/Symbol"

interface IPriceByPercentProps {
    downTickValue?: number;
    upTickValue?: number;
}

const PriceByPercent: FC<IPriceByPercentProps> = ({ downTickValue, upTickValue }) => {
    const { priceWithPercent, setPriceWithPercentValue, setPriceWithPercentBaseOn, isPercentPrice, setPrice, price, side } = useBuySellContext()

    const { selectedSymbol } = useSymbolStore()

    const { data: symbolData } = useQuerySymbolGeneralInformation(selectedSymbol, (data) => ({
        closingPrice: data?.symbolData?.closingPrice,
        lastTradedPrice: data?.symbolData?.lastTradedPrice,
        bestBuyLimitPrice_1: data?.ordersData?.bestBuyLimitPrice_1,
        bestSellLimitPrice_1: data?.ordersData?.bestSellLimitPrice_1,
    }))

    const closingPrice = symbolData?.closingPrice;
    const lastTradedPrice = symbolData?.lastTradedPrice;
    const bestBuyLimitPrice_1 = symbolData?.bestBuyLimitPrice_1;
    const bestSellLimitPrice_1 = symbolData?.bestSellLimitPrice_1;

    const priceVar = useMemo(() => {
        if (priceWithPercent.priceBasedOn.includes("ClosingPrice")) return closingPrice || 0;
        else if (priceWithPercent.priceBasedOn.includes("LastPrice")) return lastTradedPrice || 0;
        else if (priceWithPercent.priceBasedOn.includes("BestPrice")) return side !== 'Buy' ? bestBuyLimitPrice_1 || 0 : bestSellLimitPrice_1 || 0
        else return 0
    }, [priceWithPercent.priceBasedOn, closingPrice, lastTradedPrice, bestBuyLimitPrice_1, bestSellLimitPrice_1, side, price])

    const TICK_ITEMS = useMemo(() => [
        { id: "GreaterThanClosingPrice", label: "بیشتر از قیمت پایانی" },
        { id: "GreaterThanLastPrice", label: "بیشتر از قیمت آخرین" },
        { id: "GreaterThanBestPrice", label: "بیشتر از بهترین مظنه" },
        { id: "LessThanClosingPrice", label: "کمتر از قیمت پایانی" },
        { id: "LessThanLastPrice", label: "کمتر از قیمت آخرین" },
        { id: "LessThanBestPrice", label: "کمتر از بهترین مظنه" },
    ], [])

    function calculatePercent(type: 'Greater' | 'Less'): number {
        const { percent } = priceWithPercent;
        let res = 0
        if (type === 'Greater') {
            res = priceVar + (priceVar * (percent / 100));
        } else if (type === 'Less') {
            res = priceVar - (priceVar * (percent / 100));
        }
        return Math.floor(res); // If no valid type is provided, return the original price
    }



    useUpdateEffect(() => {
        if (isPercentPrice && priceWithPercent.priceBasedOn) {
            if (priceWithPercent.priceBasedOn.includes("Greater")) {
                setPrice(calculatePercent('Greater'))
            }
            else if (priceWithPercent.priceBasedOn.includes("Less")) {
                setPrice(calculatePercent('Less'))
            }
        }
    }, [priceWithPercent.priceBasedOn, priceWithPercent.percent, price])

    const isBetweenUpDownTick = useMemo(() => {

        if (!downTickValue || !upTickValue) return true;

        return price >= downTickValue && price <= upTickValue;
    }, [price, downTickValue, upTickValue]);



    return (
        <div className="flex gap-x-2 w-full">
            <div className="w-1/3">
                <FieldInputNumber
                    variant="simple"
                    value={priceWithPercent.percent}
                    onChangeValue={value => {
                        setPriceWithPercentValue(
                            +value,
                        )
                    }}
                    secondaryPrice={price ?? price}
                    placeholder="درصد(قیمت)"
                    direction='left'
                    isError={!isBetweenUpDownTick}
                    textError="قیمت در آستانه مجاز نمی‌باشد."
                />
            </div>

            <div className="w-2/3">
                <SelectInput
                    value={TICK_ITEMS.find(item => item.id === priceWithPercent.priceBasedOn) || { id: '', label: '' }}
                    placeholder="انتخاب کنید"
                    items={TICK_ITEMS}
                    onChange={value => {
                        setPriceWithPercentBaseOn(value.id)
                    }}
                />
            </div>

        </div>
    )
}

export default PriceByPercent