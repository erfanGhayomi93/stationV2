import { useModalStore } from '@store/modal'
import Modal from '..'
import { useTranslation } from 'react-i18next'
import useBuySellStore from 'common/widget/buySellWidget/context/buySellContext'
import clsx from 'clsx'
import { useSymbolStore } from '@store/symbol'
import { handleValidity, sepNumbers, uid } from '@methods/helper'
import { FC, useCallback, useEffect, useMemo, useRef } from 'react'
import { ColDef } from '@ag-grid-community/core'
import AgGrid from '@components/Table/AgGrid'
import { useCustomerStore } from '@store/customer'
import { useQuerySymbolGeneralInformation } from '@api/Symbol'
import Button from '@uiKit/Button'
import useSendOrders from '@hooks/useSendOrders'
import FieldInputNumber from '@uiKit/Inputs/FieldInputNumber'
import ipcMain from 'common/classes/IpcMain'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Tippy from '@tippyjs/react'
import { CustomCellRendererProps } from '@ag-grid-community/react';
import { DeleteOutlineIcon, SendIcon } from '@assets/icons';

interface IActionRendererParamsProps extends CustomCellRendererProps<IDividedOrderRow> {
    onDeleteOrder: (data: IDividedOrderRow | undefined) => void;
    onSendOrder: (data: IDividedOrderRow | undefined) => void;
}

const ActionRenderer = ({ data, onDeleteOrder, onSendOrder }: IActionRendererParamsProps) => {

    return (
        <div className="flex h-full items-center justify-center gap-4 text-icon-default">
            <button
                className="disabled:opacity-60"
                onClick={() => onSendOrder(data)}
                disabled={data?.status}
            >
                <SendIcon />
            </button>
            <button
                className="disabled:opacity-60"
                onClick={() => onDeleteOrder(data)}
                disabled={data?.status}
            >
                <DeleteOutlineIcon />
            </button>
        </div>
    );
};



const DividedOrdersModal: FC = () => {

    const { setDividedOrdersModal } = useModalStore()

    const { t } = useTranslation()

    const { side, quantity, price, strategy, validity, validityDate, setQuantity, setPrice } = useBuySellStore()

    const { selectedSymbol, symbolTitle } = useSymbolStore()

    const { selectedCustomers } = useCustomerStore()

    const queryClient = useQueryClient()

    const { data: divideData } = useQuery<IDividedOrderRow[]>({
        queryKey: ['divideOrderCache']
    })

    const { data: symbolData } = useQuerySymbolGeneralInformation<ISymbolData>(
        selectedSymbol,
        data => data.symbolData,
    );

    const { sendOrders, ordersLoading } = useSendOrders((x) => onOrderResultReceived(x))

    const onOMSMessageHandlerRef = useRef<{
        onUpdate: (message: Record<number, string>) => void
    }>({
        onUpdate: () => { }
    });

    const onOrderResultReceived = (x: Record<string, string>) => {
        let divideDataSnapshot: IDividedOrderRow[] = JSON.parse(JSON.stringify(divideData))

        divideDataSnapshot = divideDataSnapshot.map(item => {
            if (x[item.id]) {
                return { ...item, clientKey: x[item.id] }
            }

            return item
        })

        queryClient.setQueryData(['divideOrderCache'], () => divideDataSnapshot)
    }

    const onSendOrder = (data: IDividedOrderRow) => {
        if (data) {
            const order: ICreateOrderReq =
            {
                id: data.id,
                customerISIN: [data.customerISIN],
                customerTitle: [data.customerTitle],
                CustomerTagId: [],
                GTTraderGroupId: [],
                orderSide: side,
                orderDraftId: undefined,
                orderStrategy: strategy,
                orderType: 'LimitOrder',
                percent: 0,
                price: data.price,
                quantity: data.quantity,
                symbolISIN: selectedSymbol,
                validity: handleValidity(validity),
                validityDate: validityDate
            }
            
            sendOrders([order])
        }

    }

    const onDeleteOrder = (data: IDividedOrderRow) => {
        setQuantity(quantity - data.quantity)
    }


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
                        const dataVal = data?.errorMessageType ? data?.errorMessageType : t(`order_errors.${data?.orderMessageType as errorStatus}`)
                        return (
                            <Tippy className='rtl' content={dataVal}>
                                <span>{dataVal}</span>
                            </Tippy>
                        );
                    } else {
                        return <span>{data?.status ? t(`orderStatus.${data?.status as TStatus}`) : '-'}</span>;
                    }
                },
                cellClassRules: {
                    'text-content-warning': ({ value }) => !['OrderDone', 'Canceled', 'DeleteByEngine', 'Error', 'InOMSQueue'].includes(value),
                    'text-content-success-buy': ({ value }) => value === 'OrderDone',
                    'text-content-error-sell': ({ value }) => ['Canceled', 'DeleteByEngine', 'Error'].includes(value),
                },
            },
            {
                headerName: 'عملیات',
                field: 'id',
                cellRenderer: ActionRenderer,
                cellRendererParams: {
                    onSendOrder,
                    onDeleteOrder
                }

            }
        ],
        [quantity]
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
            const orders: ICreateOrderReq[] = divideData
                .filter(item => !item.status)
                .map(({ customerISIN, id, price, quantity, customerTitle }) => ({
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

            const updatedDividedOrder = divideData.map(item => ({ ...item, status: 'InOMSQueue' }))

            queryClient.setQueryData(['divideOrderCache'], () => updatedDividedOrder)
        }
    }

    const isBetweenUpDownTick = useMemo(() => {
        if (!symbolData?.lowThreshold || !symbolData?.highThreshold) return true;

        return price >= symbolData?.lowThreshold && price <= symbolData?.highThreshold;
    }, [price, symbolData?.lowThreshold, symbolData?.highThreshold]);

    onOMSMessageHandlerRef.current.onUpdate = useMemo(
        () => (message: Record<number, string>) => {
            const omsClientKey = message[12];
            const omsOrderStatus = message[22] as TStatus;

            const orderMessageType = message[200];
            const errorMessageType = message[208];

            const timer = setTimeout(() => {
                queryClient.setQueryData(['divideOrderCache'], (oldData: IDividedOrderRow[]) => {
                    const dividedSnapshot: IDividedOrderRow[] = oldData ? JSON.parse(JSON.stringify(oldData)) : [];


                    const res = dividedSnapshot.map(item => {
                        if (item.clientKey === omsClientKey) {
                            return { ...item, status: omsOrderStatus, orderMessageType, errorMessageType }
                        }
                        return item
                    })
                    return res
                })
                clearTimeout(timer);
            }, 800)
        },
        []
    );



    useEffect(() => {
        const dividedOrders = handleDivideOrders(quantity, price, selectedCustomers);

        queryClient.setQueryData(['divideOrderCache'], () => dividedOrders)
    }, [quantity, price])

    useEffect(() => {
        ipcMain.handle('onOMSMessageReceived', onOMSMessageHandlerRef.current.onUpdate);
    }, [divideData]);


    return (
        <Modal title={'سفارش تقسیم'} onCloseModal={() => setDividedOrdersModal(false)} size="md" >
            <div className="grid grid-rows-min-one-min gap-y-6">
                <div>
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
                </div>

                <div className='flex gap-x-8'>
                    <div className=''>
                        {
                            <FieldInputNumber
                                value={quantity}
                                onChangeValue={value => setQuantity(+value)}
                                placeholder="حجم"
                                upTickValue={symbolData?.maxTradeQuantity}
                                downTickValue={symbolData?.minTradeQuantity}
                                variant="advanced"
                            />
                        }
                    </div>

                    <div>
                        <FieldInputNumber
                            value={price}
                            onChangeValue={value => {
                                setPrice(+value)
                            }}
                            placeholder="قیمت"
                            upTickValue={symbolData?.highThreshold}
                            downTickValue={symbolData?.lowThreshold}
                            variant="advanced"
                            isError={!isBetweenUpDownTick}
                            textError="قیمت در آستانه مجاز نمی‌باشد."
                        />

                    </div>

                </div>

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
                            isLoading={ordersLoading}
                            disabled={!isBetweenUpDownTick || !divideData?.length}
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