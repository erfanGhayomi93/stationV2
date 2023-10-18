import { ICellRendererParams } from "ag-grid-community"
import clsx from "clsx"
import { FC, useMemo } from "react"
import { abbreviateNumber } from "src/utils/helpers"




export const CellLostProfit: FC<ICellRendererParams<IGTPortfolioResultType>> = ({ data }) => {
    if (!data) return <span></span>


    const calcLostProfitValue = useMemo(() => {
        const { lastTradedPrice, asset, commissionPrice, averagePrice } = data
        const res = ((lastTradedPrice - averagePrice) * asset) - commissionPrice
        return "\u200E" + String(abbreviateNumber(res))
    }, [data])


    const calcLostProfitPercent = useMemo(() => {
        const { lastTradedPrice, averagePrice } = data

        const res = (lastTradedPrice - averagePrice) / averagePrice

        return res
    }, [data])


    return (
        <div className={clsx({
            "text-L-success-200": calcLostProfitPercent > 0,
            "text-L-error-200": calcLostProfitPercent < 0,
        })}>
            <span>{calcLostProfitValue}</span>
            <span className="pl-1">({calcLostProfitPercent.toFixed(2)}%)</span>
        </div>
    )
}
