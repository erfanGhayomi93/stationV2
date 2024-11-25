import { useModalStore } from '@store/modal'
import Modal from '..'
import { useTranslation } from 'react-i18next'
import useBuySellStore from 'common/widget/buySellWidget/context/buySellContext'
import clsx from 'clsx'
import { useSymbolStore } from '@store/symbol'
import { handleValidity, sepNumbers, uid } from '@methods/helper'
import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { ColDef } from '@ag-grid-community/core'
import AgGrid from '@components/Table/AgGrid'
import { useCustomerStore } from '@store/customer'
import { useQuerySymbolGeneralInformation } from '@api/Symbol'
import Button from '@uiKit/Button'
import useSendOrders from '@hooks/useSendOrders'
// import Tippy from '@tippyjs/react'


const DividedOrdersModal: FC = () => {

    const { setDividedOrdersModal } = useModalStore()

    const { t } = useTranslation()

    const { side, quantity, price, strategy, validity, validityDate } = useBuySellStore()

    const { selectedSymbol, symbolTitle } = useSymbolStore()

    const { selectedCustomers } = useCustomerStore()

    const [divideData, setDivideData] = useState<IDividedOrderRow[]>()

    const { data: symbolData } = useQuerySymbolGeneralInformation<ISymbolData>(
        selectedSymbol,
        data => data.symbolData,
    );

    const { sendOrders } = useSendOrders()


    const COLUMNS_DEFS = useMemo<ColDef<IDividedOrderRow>[]>(
        () => [
            {
                field: 'customerTitle',
                headerName: 'مشتری',
            },
            {
                field: 'quantity',
                headerName: 'حجم',
                type: "sepratedNumber"
            },
            {
                headerName: 'قیمت',
                field: 'price',
                type: 'sepratedNumber',
            },
            {
                headerName: 'وضعیت',
                field: 'status',
                cellClass: 'font-bold',
                minWidth: 180,
                cellRenderer: ({ data }: { data: IDividedOrderRow }) => {
                    if (data?.status === 'Error') {
                        return (
                            // <Tippy content={data?.customErrorMsg}>
                            <span>{data?.status ? t(`orderStatus.${data?.status as TStatus}`) : '-'}</span>
                            // </Tippy>
                        );
                    } else {
                        return <span>{data?.status ? t(`orderStatus.${data?.status as TStatus}`) : '-'}</span>;
                    }
                }
            },
        ],
        []
    );

    const handleDivideOrders = useCallback((quantity: number, price: number, selectedCustomers: ICustomerAdvancedSearchRes[]): IDividedOrderRow[] | undefined => {

        const checkQuantityTickSize = (quantity: number) => {
            const quantityTickSize = symbolData?.orderQuantityTickSize ?? 1;

            const isDivisibleByTickSize = quantity % quantityTickSize === 0;

            if (isDivisibleByTickSize || quantity < quantityTickSize) return quantity;

            return Math.floor(quantity / quantityTickSize) * quantityTickSize;
        };


        const createOrder = (customerISIN: string, customerTitle: string, quantity: number, price: number) => {
            return {
                customerISIN,
                customerTitle,
                id: uid(),
                price,
                quantity,
                isError: false,
                status: undefined,
                clientKey: undefined,
            };
        };

        const dividedOrderArray: IDividedOrderRow[] = [];

        const maxTradeQuantity = symbolData?.maxTradeQuantity

        if (maxTradeQuantity) {
            const pureOrdersQuantity = Math.floor(quantity / maxTradeQuantity);
            const unPureOrderValue = Math.abs(maxTradeQuantity * pureOrdersQuantity - quantity);

            for (let i = 0; i < selectedCustomers.length; i++) {
                const { customerISIN, title } = selectedCustomers[i];

                let pureOrders = pureOrdersQuantity;

                while (pureOrders) {
                    dividedOrderArray.push(createOrder(customerISIN, title, checkQuantityTickSize(maxTradeQuantity), price));
                    pureOrders--;
                }
                if (unPureOrderValue) {
                    dividedOrderArray.push(createOrder(customerISIN, title, checkQuantityTickSize(unPureOrderValue), price));
                }
            }
        }

        return dividedOrderArray


    }, [quantity, price, selectedCustomers])


    const onSendAll = () => {

        if (divideData) {
            const orders: ICreateOrderReq[] = divideData.map(({ customerISIN, id, price, quantity, customerTitle }) => ({
                id: id,
                customerISIN: [customerISIN],
                customerTitle: [customerTitle],
                CustomerTagId: [],
                GTTraderGroupId: [],
                orderSide: side,
                orderDraftId: undefined,
                orderStrategy: strategy,
                orderType: 'LimitOrder',
                percent: 0,
                price,
                quantity,
                symbolISIN: selectedSymbol,
                validity: handleValidity(validity),
                validityDate: validityDate,
            }));

            sendOrders(orders)
        }

    }


    useEffect(() => {
        const dividedOrders = handleDivideOrders(quantity, price, selectedCustomers);

        setDivideData(dividedOrders)
    }, [])



    return (
        <Modal title={'سفارش تقسیم'} onCloseModal={() => setDividedOrdersModal(false)} size="md" >
            <div className="grid grid-rows-min-one-min gap-y-6">
                <p className='flex gap-x-1'>
                    <span className='text-content-deselecttab'>
                        سفارش
                    </span>

                    <span className={clsx({
                        "text-content-success-buy": side === "Buy",
                        "text-content-error-sell": side === "Sell"
                    })}>
                        {t(`common.${side}`)}
                    </span>

                    <span className="text-content-deselecttab">
                        {symbolTitle}
                    </span>

                    <span className='text-content-deselecttab'>
                        به تعداد
                    </span>

                    <span className='text-content-title'>
                        {sepNumbers(quantity)}
                    </span>

                    <span className='text-content-deselecttab'>
                        به قیمت
                    </span>

                    <span className='text-content-title'>
                        {sepNumbers(price)}
                    </span>
                </p>

                <div>
                    <AgGrid
                        tableHeight="20rem"
                        columnDefs={COLUMNS_DEFS}
                        rowData={divideData || []}
                    />



                </div>

                <div className='flex justify-between items-center'>
                    <div className='flex gap-x-4 flex-1'>
                        <div className='text-content-paragraph flex gap-x-2'>
                            <span >تعداد سطر</span>
                            <span>{divideData?.length}</span>
                        </div>

                        <div className='flex gap-x-2'>
                            <span>
                                حجم
                            </span>
                            <span className={clsx({
                                "text-content-success-buy": side === "Buy",
                                "text-content-error-sell": side === "Sell"
                            })}>
                                {t(`common.${side}`)}
                            </span>
                            <span>{sepNumbers(quantity)}</span>
                        </div>
                    </div>

                    <div className='flex-1'>
                        <Button
                            variant='primary'
                            // className='w-1/3'
                            onClick={onSendAll}
                        >
                            ارسال همه
                        </Button>
                    </div>
                </div>

            </div>
        </Modal>
    )
}

export default DividedOrdersModal