import FieldInput from "@uiKit/Inputs/FieldInput"
import SelectInput from "@uiKit/Inputs/SelectInput"
import { useBuySellContext } from "../../context/buySellContext"
import useUpdateEffect from "@hooks/useUpdateEffect"
// import { useQuerySymbolGeneralInformation } from "@api/Symbol"
import { useSymbolStore } from "@store/symbol"
import { useMemo } from "react"
import { useQueryClient } from "@tanstack/react-query"



const PriceByPercent = () => {
    const { priceWithPercent, setPriceWithPercent, isPercentPrice, setPrice, price, side } = useBuySellContext()

    const { selectedSymbol } = useSymbolStore()

    const queryClient = useQueryClient()

    // const { data: symbolData } = useQuerySymbolGeneralInformation(selectedSymbol, (data) => ({
    //     closingPrice: data?.symbolData?.closingPrice,
    //     lastTradedPrice: data?.symbolData?.lastTradedPrice,
    //     bestBuyLimitPrice_1: data?.ordersData?.bestBuyLimitPrice_1,
    //     bestSellLimitPrice_1: data?.ordersData?.bestSellLimitPrice_1,
    // }))

    const symbolGeneral = queryClient.getQueryData<ISymbolGeneralInformationRes>(['SymbolGeneralInformation', selectedSymbol]);
    
    const closingPrice = symbolGeneral?.symbolData?.closingPrice;
    const lastTradedPrice = symbolGeneral?.symbolData?.lastTradedPrice;
    const bestBuyLimitPrice_1 = symbolGeneral?.ordersData?.bestBuyLimitPrice_1;
    const bestSellLimitPrice_1 = symbolGeneral?.ordersData?.bestSellLimitPrice_1;

    const priceVar = useMemo(() => {
        if (priceWithPercent.PriceBasedOn.includes("ClosingPrice")) return closingPrice || 0;
        else if (priceWithPercent.PriceBasedOn.includes("LastPrice")) return lastTradedPrice || 0;
        else if (priceWithPercent.PriceBasedOn.includes("BestPrice")) return side !== 'Buy' ? bestBuyLimitPrice_1 || 0 : bestSellLimitPrice_1 || 0
        else return 0
    }, [priceWithPercent.PriceBasedOn, closingPrice, lastTradedPrice, bestBuyLimitPrice_1, bestSellLimitPrice_1, side])

    const TICK_ITEMS = [
        { id: "GreaterThanClosingPrice", label: "بیشتر از قیمت پایانی" },
        { id: "GreaterThanLastPrice", label: "بیشتر از قیمت آخرین" },
        { id: "GreaterThanBestPrice", label: "بیشتر از بهترین مظنه" },
        { id: "LessThanClosingPrice", label: "کمتر از قیمت پایانی" },
        { id: "LessThanLastPrice", label: "کمتر از قیمت آخرین" },
        { id: "LessThanBestPrice", label: "کمتر از بهترین مظنه" },
    ]

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
        if (isPercentPrice && priceWithPercent.PriceBasedOn) {
            if (priceWithPercent.PriceBasedOn.includes("Greater")) {
                setPrice(calculatePercent('Greater'))
            }
            else if (priceWithPercent.PriceBasedOn.includes("Less")) {
                setPrice(calculatePercent('Less'))
            }
        }
    }, [priceWithPercent.PriceBasedOn, priceWithPercent.percent])



    return (
        <div className="flex gap-x-2 w-full">
            <div className="w-1/3">
                <FieldInput
                    variant="simple"
                    value={`${priceWithPercent.percent}`}
                    onChangeValue={value => setPriceWithPercent({
                        percent: +value,
                        PriceBasedOn: priceWithPercent.PriceBasedOn
                    })}
                    type='number'
                    secondaryPrice={price && price}
                    placeholder="درصد(قیمت)"
                    direction='left'
                    isPercentage={true}
                />
            </div>

            <div className="w-2/3">
                <SelectInput
                    value={TICK_ITEMS.find(item => item.id === priceWithPercent.PriceBasedOn) || { id: '', label: '' }}
                    placeholder="انتخاب کنید"
                    items={TICK_ITEMS}
                    onChange={value => setPriceWithPercent({
                        percent: priceWithPercent.percent,
                        PriceBasedOn: value.id
                    })}
                />
            </div>

        </div>
    )
}

export default PriceByPercent