import clsx from "clsx"
import { FC } from "react"
import { useTranslation } from "react-i18next"

interface IOrderBookHeaderProps {
    side: TSide
}

const OrderBookHeader: FC<IOrderBookHeaderProps> = ({ side }) => {

    const { t } = useTranslation()

    return (
        <div className={clsx('flex w-full justify-between p-2 rounded-md text-xs', {
            "bg-back-success-container text-content-success-buy": side === "Buy",
            "bg-back-error-container text-content-error-sell flex-row-reverse": side === "Sell"
        })}>
            <span className={clsx("w-1/3" , {
                "text-right" : side === "Buy",
                "text-left" : side === "Sell",
            })}>{t("orderBook.countHeader")}</span>
            <span className="text-center w-1/3">{t("orderBook.volumeHeader")}</span>
            <span className={clsx("w-1/3" , {
                "text-left" : side === "Buy",
                "text-right" : side === "Sell",
            })}>{t("orderBook.priceHeader")}</span>
        </div>
    )
}

export default OrderBookHeader