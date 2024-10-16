import { SendToBasketIcon } from "@assets/icons"
import Button from "@uiKit/Button"
import { FC } from "react"

interface IBodyBuySellProps {
    side: TSide
}

const ActionsOrder: FC<IBodyBuySellProps> = ({ side }) => {


    return (
        <div className="flex gap-x-4">
            <Button
                variant={side === "Buy" ? "primary-outline" : "danger-outline"}
                className="flex-1"
                icon={<SendToBasketIcon />}
            >
                ارسال به سبد
            </Button>

            <Button
                variant={side === "Buy" ? "primary" : "danger"}
                className="flex-1"
            >
                ارسال خرید
            </Button>
        </div>
    )
}

export default ActionsOrder