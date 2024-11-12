import { useModalStore } from "@store/modal";
import Modal from "..";
import { useBuySellStore } from "common/widget/buySellWidget/context/buySellContext";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { useCustomerStore } from "@store/customer";
import { useEffect, useMemo, useState } from "react";
import { generateSourceOrder, handleValidity, sepNumbers, uid } from "@methods/helper";
import { useSymbolStore } from "@store/symbol";
import { useCommissionValue } from "@hooks/useCommissionValue";
import Button from "@uiKit/Button";
import AgGridTable from '@components/Table/AgGrid';
import { ColDef } from "@ag-grid-community/core";
import useSendOrders from "@hooks/useSendOrders";

interface IPercentQuantityOrderValue extends ICustomerAdvancedSearchRes {
    price: number,
    quantity: number,
    percent: number
}

const PercentQuantityOrderModal = () => {

    const [value, setValue] = useState<IPercentQuantityOrderValue[]>([])

    const { t } = useTranslation()

    const { selectedSymbol, marketUnit, symbolTitle } = useSymbolStore()

    const { setIsPercentQuantityOrderModal } = useModalStore();

    const { quantityWithPercent, side, strategy, price, validity, validityDate, source } = useBuySellStore()

    const selectedCustomers = useCustomerStore(state => state.selectedCustomers)

    const { buyCommission, sellCommission } = useCommissionValue(marketUnit)

    const { sendOrders } = useSendOrders()


    const handleSetValue = () => {

        const getTradedQuantity = (amount: number) => {
            try {
                const commissionValue = side === 'Buy' ? buyCommission : sellCommission;
                return side === 'Buy' ? amount / (commissionValue * price + price) : amount / (-commissionValue * price + price)
            }
            catch {
                return 0
            }
        };

        const calculatorQuantityByPercent = (customerRemainAndOptionRemainDto: ICustomerRemainAndOptionRemainDto) => {
            const priceValue = customerRemainAndOptionRemainDto[quantityWithPercent.quantityBasedOn]
            const amount = priceValue > 0 ? Math.floor(priceValue * (quantityWithPercent.percent / 100)) : 0
            const quantityValue = Math.floor(getTradedQuantity(amount))
            return quantityValue
        }

        if (selectedCustomers.length) {
            const res = selectedCustomers.map((customer) => ({
                ...customer,
                price: price,
                percent: quantityWithPercent.percent,
                quantity: calculatorQuantityByPercent(customer.customerRemainAndOptionRemainDto)
            }))

            setValue(res);
        }
    }

    useEffect(() => {
        handleSetValue()
    }, [])



    const handleSendOrder = () => {
        const CustomerTagId: TCustomerIsins = [];
        const GTTraderGroupId: TCustomerIsins = [];

        const orders: ICreateOrderReq[] = value
            .map(({ customerISIN, title, quantity }) => ({
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
            })).filter(Boolean)

        sendOrders(orders)

        setIsPercentQuantityOrderModal(false)
    }


    const columnDefs = useMemo<ColDef<IPercentQuantityOrderValue>[]>(
        () => [
            {
                field: 'title',
                headerName: "نام و نام خانوادگی"
            },
            {
                field: "bourseCode",
                headerName: "کد بورسی"
            }, {
                field: 'quantity',
                headerName: "تعداد",
                valueGetter: ({ data }) => sepNumbers(data?.quantity),
            }, {
                field: 'price',
                headerName: "قیمت",
                valueGetter: ({ data }) => sepNumbers(data?.price),
            }, {
                field: `customerRemainAndOptionRemainDto.${quantityWithPercent.quantityBasedOn}`,
                headerName: `${t(`quantityPercentOption.${quantityWithPercent.quantityBasedOn as TQuantityBasedOn}`)}`,
                valueGetter: ({ data }) => sepNumbers(data?.customerRemainAndOptionRemainDto[quantityWithPercent.quantityBasedOn]),
                cellClass: "ltr"
            }
        ], []
    )


    return (
        <Modal title={'ارسال سفارش گروهی'} onCloseModal={() => setIsPercentQuantityOrderModal(false)} size="md">
            <div className="flex flex-col gap-y-6">
                <p>
                    <span className="border-l border-line-div-2 pl-2 text-content-title">
                        {quantityWithPercent.percent} درصد از {t(`quantityPercentOption.${quantityWithPercent.quantityBasedOn as TQuantityBasedOn}`)}
                    </span>

                    <span className="mx-2 text-content-paragraph">
                        {symbolTitle}
                    </span>
                    <span className={clsx("pr-1", {
                        "text-content-success-buy": side === "Buy",
                        "text-content-error-sell": side === "Sell"
                    })}>
                        {t(`common.${side}`)}
                    </span>
                </p>

                <div className="flex-1">
                    <AgGridTable
                        rowData={value ?? []}
                        columnDefs={columnDefs}
                        tableHeight="13rem"
                    />
                </div>

                <div className="">
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