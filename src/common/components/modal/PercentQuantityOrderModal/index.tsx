import { useModalStore } from "@store/modal";
import Modal from "..";
import { useBuySellStore } from "common/widget/buySellWidget/context/buySellContext";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useCustomerStore } from "@store/customer";
import { useEffect } from "react";
import { generateSourceOrder, handleValidity, uid } from "@methods/helper";
import { useSymbolStore } from "@store/symbol";
import { useCommissionValue } from "@hooks/useCommissionValue";
import Button from "@uiKit/Button";


const PercentQuantityOrderModal = () => {

    // const [value, setValue] = useState([])

    const { t } = useTranslation()

    const { selectedSymbol, marketUnit, symbolTitle } = useSymbolStore()

    const { setIsPercentQuantityOrderModal } = useModalStore();

    const { quantityWithPercent, side, strategy, price, quantity, validity, validityDate, source } = useBuySellStore()

    const selectedCustomers = useCustomerStore(state => state.selectedCustomers)

    const { buyCommission, sellCommission } = useCommissionValue(marketUnit)

    useEffect(() => {
        console.log({ selectedCustomers })
    }, [selectedCustomers])


    const handleSendOrder = () => {
        const CustomerTagId: TCustomerIsins = [];
        const GTTraderGroupId: TCustomerIsins = [];

        const getTradedQuantity = (amount: number) => {
            try {
                const commissionValue = side === 'Buy' ? buyCommission : sellCommission;
                return side === 'Buy' ? amount / (commissionValue * price + price) : amount / (-commissionValue * price + price)
            }
            catch {
                return 0
            }
        };

        const calculaterQuantityByPercent = (customerRemainAndOptionRemainDto: ICustomerRemainAndOptionRemainDto) => {
            const priceValue = customerRemainAndOptionRemainDto[quantityWithPercent.quantityBasedOn]
            const amount = Math.floor(priceValue * (quantityWithPercent.percent / 100))
            const quantityValue = Math.floor(getTradedQuantity(amount))
            return quantityValue
        }

        const res = selectedCustomers
            .map(({ customerISIN, title, customerRemainAndOptionRemainDto }) => ({
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
                quantity: calculaterQuantityByPercent(customerRemainAndOptionRemainDto),
                symbolISIN: selectedSymbol,
                validity: handleValidity(validity),
                validityDate: validityDate,
                source: generateSourceOrder(source, side),
            }))

        console.log('res', res)
    }


    return (
        <Modal title={'ارسال سفارش گروهی'} onCloseModal={() => setIsPercentQuantityOrderModal(false)} size="sm">
            <div>
                <p>
                    <span className="border-l border-line-div-2 pl-2 text-content-title">
                        {quantityWithPercent.percent} درصد از {t(`quantityPercentOption.${quantityWithPercent.quantityBasedOn as TQuantityBasedOn}`)}
                    </span>

                    <span className="pr-2 text-content-paragraph">
                        {symbolTitle}
                    </span>
                    <span className={clsx("pr-1", {
                        "text-content-success-buy": side === "Buy",
                        "text-content-error-sell": side === "Sell"
                    })}>
                        {t(`common.${side}`)}
                    </span>
                </p>

                <div className="pt-6">
                    <Button
                        variant="primary"
                        onClick={handleSendOrder}
                    >
                        ارسال گروهی سفارش
                    </Button>
                </div>


            </div>
        </Modal>
    )
}

export default PercentQuantityOrderModal