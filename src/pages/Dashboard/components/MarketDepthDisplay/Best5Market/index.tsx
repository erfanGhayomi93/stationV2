import { useQuerySymbolGeneralInformation } from "@api/Symbol"
import { useSymbolStore } from "@store/symbol"
import OrderBookHeader from "../marketDepth/OrderBookHeader"
import HalfRowDepth from "../marketDepth/HalfRowDepth"
import { FC, useEffect, useMemo } from "react"
import { IHalfRowDepth } from "../marketDepth"

interface IBest5MarketProps {
    onDataStatus: (flag: boolean) => void;
}


export const Best5Market: FC<IBest5MarketProps> = ({ onDataStatus }) => {
    const { selectedSymbol } = useSymbolStore()

    const { data, isLoading, isSuccess } = useQuerySymbolGeneralInformation(selectedSymbol, (data) => {
        return data.ordersData
    })

    const buyData = useMemo(() => {
        if (!data) return []

        const res: IHalfRowDepth[] = []

        for (let i = 1; i <= 5; i++) {
            res.push({
                price: data[`bestBuyLimitPrice_${i}` as keyof IOrdersData],
                volume: data[`bestBuyLimitQuantity_${i}` as keyof IOrdersData],
                count: data[`numberOfOrdersAtBestBuy_${i}` as keyof IOrdersData],
            })
        }

        return res;
    }, [data])

    const sellData = useMemo(() => {
        if (!data) return []

        const res: IHalfRowDepth[] = []

        for (let i = 1; i <= 5; i++) {
            res.push({
                price: data[`bestSellLimitPrice_${i}` as keyof IOrdersData],
                volume: data[`bestSellLimitQuantity_${i}` as keyof IOrdersData],
                count: data[`numberOfOrdersAtBestSell_${i}` as keyof IOrdersData],
            })
        }

        return res;
    }, [data])

    useEffect(() => {
        console.log({ isSuccess })
    }, [isSuccess])


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
                            .slice(0, 100)
                            .map((item, ind) => (
                                <HalfRowDepth
                                    key={item.price + 'Buy' + ind}
                                    side="Buy"
                                    data={item}
                                    isInRange={true}
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
                            .slice(0, 100)
                            .map((item, ind) => (
                                <HalfRowDepth
                                    key={item.price + 'Sell' + ind}
                                    side="Sell"
                                    data={item}
                                    isInRange={true}
                                />
                            ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
