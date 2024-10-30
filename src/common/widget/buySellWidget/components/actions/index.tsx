import { SendToBasketIcon } from "@assets/icons"
import useSendOrders from "@hooks/useSendOrders"
import Button from "@uiKit/Button"
import { FC } from "react"
import { useBuySellContext } from "../../context/buySellContext"
import { useCustomerStore } from "@store/customer"
import { generateSourceOrder, handleValidity, uid } from "@methods/helper"
import { useSymbolStore } from "@store/symbol"
import { useModalStore } from "@store/modal"

interface IBodyBuySellProps { }

const ActionsOrder: FC<IBodyBuySellProps> = () => {

    const { price, quantity, side, strategy, validity, validityDate, source, isPercentQuantity } = useBuySellContext()

    const { setIsPercentQuantityOrderModal } = useModalStore()

    const { selectedCustomers } = useCustomerStore()

    const { selectedSymbol } = useSymbolStore()

    const { sendOrders } = useSendOrders()

    const handleSendOrder = () => {
        const CustomerTagId: TCustomerIsins = [];
        const GTTraderGroupId: TCustomerIsins = [];

        const orders: ICreateOrderReq[] = selectedCustomers
            .map(({ customerISIN, title }) => {
                return {
                    id: uid(),
                    customerISIN: [customerISIN],
                    customerTitle: [title],
                    CustomerTagId,
                    GTTraderGroupId,
                    orderSide: side,
                    orderDraftId: undefined,
                    orderStrategy: strategy,
                    orderType: "LimitOrder" as IOrderType,
                    percent: 0,
                    price: price,
                    quantity: quantity,
                    symbolISIN: selectedSymbol,
                    validity: handleValidity(validity),
                    validityDate: validityDate,
                    source: generateSourceOrder(source, side),
                    // PositionSymbolISIN: (side === 'Sell' && symbolData?.isOption && generateSourceOrder() === "Position") ? source?.split("-")[1] : undefined
                }
            }).filter(Boolean)

        sendOrders(orders)
    }

    const sendingOrder = () => {

        if (isPercentQuantity) {
            setIsPercentQuantityOrderModal(true)
            return
        }

        handleSendOrder()
    }


    return (
        <div className="flex gap-x-4">
            <Button
                variant={side === "Buy" ? "primary-outline" : "danger-outline"}
                className="flex-1"
                icon={<SendToBasketIcon />}
                disabled={true}
            >
                ارسال به سبد
            </Button>

            <Button
                variant={side === "Buy" ? "primary" : "danger"}
                className="flex-1"
                onClick={sendingOrder}
            >
                ارسال {side === "Buy" ? "خرید" : "فروش"}
            </Button>
        </div>
    )
}

export default ActionsOrder