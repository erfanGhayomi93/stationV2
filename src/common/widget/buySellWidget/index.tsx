import Button from "@uiKit/Button"
import clsx from "clsx"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import BodyBuySell from "./components/bodyBuySell"


const BuySellWidget = () => {

    const { t } = useTranslation()

    const [tabSelected, setTabSelected] = useState<TSide>('Buy')

    return (
        <div className="py-2 px-4 flex flex-col gap-y-4 ">
            <div className="flex gap-x-2">
                <Button
                    variant={tabSelected === "Buy" ? "primary" : "secondary"}
                    onClick={() => setTabSelected("Buy")}
                    className="flex-1"
                >
                    {t("common.buy")}
                </Button>

                <Button
                    variant={tabSelected === "Sell" ? "danger" : "secondary"}
                    onClick={() => setTabSelected("Sell")}
                    className="flex-1"
                >
                    {t("common.sell")}
                </Button>
            </div>

            <span className={clsx("w-100 h-0.5", {
                "bg-line-error": tabSelected === "Sell",
                "bg-line-success": tabSelected === "Buy"
            })}></span>

            <div>
                <BodyBuySell />
            </div>

            <span className={clsx("w-100 h-0.5 bg-line-div-2")}></span>
        </div>
    )
}

export default BuySellWidget 