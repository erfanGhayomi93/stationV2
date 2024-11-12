import { useQuerySymbolGeneralInformation } from "@api/Symbol"
import { useSymbolStore } from "@store/symbol"
import OrderBookHeader from "../marketDepth/OrderBookHeader"
import HalfRowDepth from "../marketDepth/HalfRowDepth"
import { FC, useCallback, useEffect, useMemo } from "react"
import { IHalfRowDepth } from "../marketDepth"
import { useBuySellStore } from "common/widget/buySellWidget/context/buySellContext"

interface IBest5MarketProps {
    onDataStatus: (flag: boolean) => void;
}


export const Best5Market: FC<IBest5MarketProps> = ({ onDataStatus }) => {
    const { selectedSymbol } = useSymbolStore()

    const { setPrice, setQuantity, setSide, setIsLockPrice } = useBuySellStore()

    const { data, isLoading } = useQuerySymbolGeneralInformation(selectedSymbol, (data) => {
        return {
            ordersData: data.ordersData,
            lowThreshold: data.symbolData.lowThreshold,
            highThreshold: data.symbolData.highThreshold,
        }
    })

    const totalQuantity = useMemo(() => {
        const buyQuantities = [
            data?.ordersData?.bestBuyLimitQuantity_1,
            data?.ordersData?.bestBuyLimitQuantity_2,
            data?.ordersData?.bestBuyLimitQuantity_3,
            data?.ordersData?.bestBuyLimitQuantity_4,
            data?.ordersData?.bestBuyLimitQuantity_5,
        ]

        const sellQuantities = [
            data?.ordersData?.bestSellLimitQuantity_1,
            data?.ordersData?.bestSellLimitQuantity_2,
            data?.ordersData?.bestSellLimitQuantity_3,
            data?.ordersData?.bestSellLimitQuantity_4,
            data?.ordersData?.bestSellLimitQuantity_5,
        ];

        const totalBuyQuantity = buyQuantities.reduce((sum, qty) => (sum ?? 0) + (qty ?? 0), 0);
        const totalSellQuantity = sellQuantities.reduce((sum, qty) => (sum ?? 0) + (qty ?? 0), 0);

        return { totalBuyQuantity, totalSellQuantity };
    }, [data?.ordersData]
    )

    const buyData = useMemo(() => {
        if (!data?.ordersData) return []

        const res: IHalfRowDepth[] = []

        for (let i = 1; i <= 5; i++) {
            const volume = data.ordersData[`bestBuyLimitQuantity_${i}` as keyof IOrdersData]
            const price = data.ordersData[`bestBuyLimitPrice_${i}` as keyof IOrdersData]
            const count = data.ordersData[`numberOfOrdersAtBestBuy_${i}` as keyof IOrdersData]
            res.push({
                price,
                volume,
                count,
                percent: volume / (totalQuantity.totalBuyQuantity ?? 0)
            })
        }

        return res;
    }, [data?.ordersData])

    const sellData = useMemo(() => {
        if (!data?.ordersData) return []

        const res: IHalfRowDepth[] = []

        for (let i = 1; i <= 5; i++) {
            const volume = data.ordersData[`bestSellLimitQuantity_${i}` as keyof IOrdersData]
            const price = data.ordersData[`bestSellLimitPrice_${i}` as keyof IOrdersData]
            const count = data.ordersData[`numberOfOrdersAtBestSell_${i}` as keyof IOrdersData]

            res.push({
                price,
                volume,
                count,
                percent: volume / (totalQuantity.totalSellQuantity ?? 0)
            })
        }

        return res;
    }, [data?.ordersData])

    const isPriceInRange = useCallback(
        (price: number) => {
            if (!data?.lowThreshold || !data?.highThreshold)
                return true; // or maybe false
            else return +data.lowThreshold <= +price && +price <= +data.highThreshold;
        },
        [data?.lowThreshold, data?.highThreshold]
    );

    const clickPrice = (price: number, side?: TSide) => {
        setPrice(price)
        if (side) setSide(side)
        setIsLockPrice(false)
    }

    const clickVolume = (volume: number, side?: TSide) => {
        setQuantity(volume)
        if (side) setSide(side)
        setIsLockPrice(false)
    }

    const clickTotalUpQueue = (side: TSide, ind: number) => {
        const data = side == "Buy" ? buyData : sellData;
        const price = data[0].price;
        const mode = side === "Buy" ? "Sell" : "Buy";
        const collectData = data.slice(0, ind + 1);


        let collectVolume = 0;
        collectData.forEach(item => {
            collectVolume += item.volume
        })

        clickPrice(price, mode)
        clickVolume(collectVolume)
    }



    useEffect(() => {
        if ((!!buyData.length || !!sellData.length) && !isLoading) {
            onDataStatus(true)
        } else {
            onDataStatus(false)
        }
    }, [buyData, sellData])

    return (
        <div className="h-full max-h-full px-2">
            <div className="grid grid-cols-2 grid-rows-1 gap-x-2 overflow-y-auto">
                <div className="flex flex-col gap-y-4">
                    <div>
                        <OrderBookHeader side="Buy" />
                    </div>
                    <div className="flex flex-col">
                        {buyData
                            .map((item, ind) => (
                                <HalfRowDepth
                                    key={item.price + 'Buy' + ind}
                                    side="Buy"
                                    data={item}
                                    isInRange={isPriceInRange(item.price)}
                                    clickPrice={clickPrice}
                                    clickVolume={clickVolume}
                                    clickTotalUpQueue={(side) => clickTotalUpQueue(side, ind)}
                                />
                            ))}
                    </div>
                </div>

                <div className="flex flex-col gap-y-4">
                    <div>
                        <OrderBookHeader side="Sell" />
                    </div>
                    <div className="flex flex-col">
                        {sellData
                            .map((item, ind) => (
                                <HalfRowDepth
                                    key={item.price + 'Sell' + ind}
                                    side="Sell"
                                    data={item}
                                    isInRange={isPriceInRange(item.price)}
                                    clickPrice={clickPrice}
                                    clickVolume={clickVolume}
                                    clickTotalUpQueue={(side) => clickTotalUpQueue(side, ind)}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
