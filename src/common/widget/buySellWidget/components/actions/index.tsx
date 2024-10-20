import { SendToBasketIcon } from "@assets/icons"
import useSendOrders from "@hooks/useSendOrders"
import Button from "@uiKit/Button"
import { FC } from "react"
import { useBuySellContext } from "../../context/buySellContext"
import { useCustomerStore } from "@store/customer"
import { uid } from "@methods/helper"
import { useSymbolStore } from "@store/symbol"

interface IBodyBuySellProps { }

const ActionsOrder: FC<IBodyBuySellProps> = () => {

    const { price, quantity, side, strategy, validity, validityDate, source } = useBuySellContext()
    const { selectedCustomers } = useCustomerStore()
    const { selectedSymbol } = useSymbolStore()

    const { sendOrders } = useSendOrders()

    const handleValidity = (validity: TValidity): TValidity => {
        if (validity === 'Week' || validity === 'Month') return 'GoodTillDate';
        return validity;
    };

    const generateSourceOrder = () => {
        try {
            const sourcePosition = source?.split("-")[0]
            // if (side === 'Sell' && symbolData?.isOption) {
            if (side === 'Sell') {

                if (sourcePosition === "Position") return sourcePosition
                return source
            }
            return undefined
        }
        catch {
            return undefined
        }
    }

    const sendingOrder = () => {
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
                    source: generateSourceOrder(),
                    // PositionSymbolISIN: (side === 'Sell' && symbolData?.isOption && generateSourceOrder() === "Position") ? source?.split("-")[1] : undefined
                }
            }).filter(Boolean)

        sendOrders(orders)
    }


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
                onClick={sendingOrder}
            >
                ارسال خرید
            </Button>
        </div>
    )
}

export default ActionsOrder