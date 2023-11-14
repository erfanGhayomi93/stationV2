import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import ControllerInput from 'src/common/components/ControllerInput';
import Modal from 'src/common/components/Modal';
import { CloseIcon } from 'src/common/icons';
import DivideOrderTable from './components/DivideOrderTable';
import { useBuySellDispatch, useBuySellState } from '../BuySell/context/BuySellContext';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import clsx from 'clsx';
import { getUniqId, handleValidity, seprateNumber } from 'src/utils/helpers';
import { useAppSelector } from 'src/redux/hooks';
import { getSelectedCustomers } from 'src/redux/slices/option';
import useSendOrders from './useSendOrders';
import useRamandOMSGateway from 'src/ls/useRamandOMSGateway';

const DivideOrderModal = () => {
    //
    const { t } = useTranslation();

    const { divide, symbolISIN, side, price, quantity, validity, percent, validityDate, strategy } = useBuySellState();
    const { data: symbolData } = useSymbolGeneralInfo(symbolISIN, { select: (data) => data.symbolData });
    const [shuffleOrder, setShuffleOrder] = useState(false);
    const [quantityInput, setQuantityInput] = useState<number>(quantity);
    const [priceInput, setPriceInput] = useState(price);
    const [customers, setCustomers] = useState<DividedOrderRowType[]>([]);
    const dispatch = useBuySellDispatch();
    const selectedCustomers = useAppSelector(getSelectedCustomers);

    const { subscribeCustomers, unSubscribeCustomers } = useRamandOMSGateway({
        onOMSMessageReceived: (message) => onOMSMessageHandler(message),
    });

    const checkQuantityTickSize = (quantity: number) => {
        const quantityTickSize = symbolData?.orderQuantityTickSize ?? 1;

        const isDivisibleByTickSize = quantity % quantityTickSize === 0;

        if (isDivisibleByTickSize) return quantity;

        return Math.floor(quantity / quantityTickSize) * quantityTickSize;
    };

    const { sendOrders, orderResult } = useSendOrders();

    useEffect(() => {
        const updatedOrders = customers.map((order) => {
            if (orderResult[order.id]) {
                return {
                    ...order,
                    clientKey: orderResult[order.id],
                };
            }
            return order;
        });

        setCustomers(updatedOrders as DividedOrderRowType[]);
    }, [orderResult]);

    const closeModal = () => {
        dispatch({ type: 'SET_DIVIDE', value: false });
    };

    const handleDivideOrders = (quantity: number, price: number, selectedCustomers: IGoMultiCustomerType[]) => {
        //
        let dividedOrderArray: DividedOrderRowType[] = [];

        const calculateOrders = (totalQuantity: number, selectedCustomers: IGoMultiCustomerType[]) => {
            const symbolMaxQuantity = symbolData?.maxTradeQuantity || 1;
            const quantityPerCustomer = Math.floor(totalQuantity / selectedCustomers.length);

            const createOrder = (customerISIN: string, customerTitle: string, quantity: number, price: number) => {
                return {
                    customerISIN,
                    customerTitle,
                    id: getUniqId(),
                    price,
                    quantity,
                    status: undefined,
                    clientKey: undefined,
                };
            };

            for (const { customerISIN, title } of selectedCustomers) {
                const orderQuantity = Math.min(quantityPerCustomer, symbolMaxQuantity);

                if (orderQuantity > 0) {
                    dividedOrderArray.push(createOrder(customerISIN, title, checkQuantityTickSize(orderQuantity), price));
                } else return;
            }

            const remainingQuantity = quantity - dividedOrderArray.length * symbolMaxQuantity;
            if (remainingQuantity > 0) {
                calculateOrders(remainingQuantity, selectedCustomers);
            }
        };

        calculateOrders(quantity, selectedCustomers);

        dividedOrderArray.sort((customerA, customerB) => {
            return customerA.customerTitle.localeCompare(customerB.customerTitle);
        });

        return dividedOrderArray;
    };

    useEffect(() => {
        //
        if (divide) {
            const customerISINs = customers.map(({ customerISIN }) => customerISIN);

            subscribeCustomers(customerISINs);

            setQuantityInput(quantity);

            setPriceInput(price);

            const dividedOrders = handleDivideOrders(quantity, price, selectedCustomers);
            setCustomers(dividedOrders);
        }

        return () => {
            unSubscribeCustomers();
        };
    }, [divide]);

    const handleQuantityChange = (value: number) => {
        setQuantityInput(value);

        const dividedOrders = handleDivideOrders(value, priceInput, selectedCustomers);
        setCustomers(dividedOrders);
    };

    const onSendAll = () => {
        setCustomers((pre) => pre.map((item) => ({ ...item, status: item.status ? item.status : 'InOMSQueue' })));

        const unSentOrders = customers.filter(({ clientKey }) => !clientKey) || [];

        const orders: IOrderRequestType[] = unSentOrders.map(({ customerISIN, id, price, quantity }) => ({
            id: id as string,
            customerISIN: [customerISIN],
            CustomerTagId: [],
            GTTraderGroupId: [],
            orderSide: side,
            orderDraftId: undefined,
            orderStrategy: strategy,
            orderType: 'LimitOrder',
            percent: percent || 0,
            price,
            quantity,
            symbolISIN: symbolISIN,
            validity: handleValidity(validity),
            validityDate: validityDate,
        }));

        sendOrders(0, orders);
    };

    const sendOneOrder = (orderId: string) => {
        const order: IOrderRequestType = {
            CustomerTagId: [],
            GTTraderGroupId: [],
            orderSide: side,
            orderDraftId: undefined,
            orderStrategy: strategy,
            orderType: 'LimitOrder',
            percent: percent || 0,
            symbolISIN: symbolISIN,
            validity: handleValidity(validity),
            validityDate: validityDate,

            price: 0,
            quantity: 0,
            customerISIN: [],
            id: orderId,
        };

        setCustomers((pre) =>
            pre.map((item) => {
                if (item.id === orderId) {
                    order.price = item.price;
                    order.quantity = item.quantity;
                    order.customerISIN = [item.customerISIN];

                    return {
                        ...item,
                        status: 'InOMSQueue',
                    };
                }

                return item;
            }),
        );

        sendOrders(0, [order]);
    };

    const onOMSMessageHandler = (message: Record<number, string>) => {
        //
        let timer: NodeJS.Timer;
        const omsClientKey = message[12];
        const omsOrderStatus = message[22];

        // LS message ( omsClientKey ) may come sooner than API response, so i check it every 100ms to find omsClientKey in API response.
        timer = setInterval(() => {
            //
            setCustomers((pre) =>
                pre.map((item) => {
                    if (item.clientKey === omsClientKey) {
                        clearInterval(timer);
                        return {
                            ...item,
                            status: omsOrderStatus as DividedOrderRowType['status'],
                        };
                    }

                    return item;
                }),
            );
        }, 100);

        // if the omsClientKey is not found after 1000ms
        setTimeout(() => {
            clearInterval(timer);
        }, 1000);
    };

    return (
        <Modal isOpen={divide} onClose={closeModal} className="w-[800px] h-[540px] bg-L-basic dark:bg-D-basic  rounded-md">
            <div className="grid h-full grid-rows-min-one">
                <div className="w-full text-white font-semibold bg-L-blue-200 dark:bg-D-blue-200 h-10 flex items-center justify-between px-5">
                    <div className="w-full">
                        {t('DivideOrder.modalHeader', { side: t(`orderSide.${side}`), symbolTitle: symbolData?.symbolTitle || '-' })}
                    </div>
                    <CloseIcon onClick={closeModal} className="cursor-pointer" />
                </div>
                <div className="p-6 flex flex-col gap-3">
                    <div className="pb-3 flex items-center justify-between border-b border-L-gray-400 dark:border-D-gray-400">
                        <div className="text-D-basic dark:text-L-basic font-medium">
                            {t('DivideOrder.orderDetail', {
                                side: t(`orderSide.${side}`),
                                symbolTitle: symbolData?.symbolTitle || '-',
                                quantity: seprateNumber(quantityInput),
                                price: seprateNumber(priceInput),
                            })}
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                id="shuffleOrder"
                                className="outline-none cursor-pointer"
                                type="checkbox"
                                checked={shuffleOrder}
                                onChange={(e) => setShuffleOrder(e.target.checked)}
                            />
                            <label className="text-xs text-D-basic dark:text-L-basic cursor-pointer" htmlFor="shuffleOrder">
                                {t('DivideOrder.shuffleOrder')}
                            </label>
                        </div>
                    </div>
                    <div className="text-xs text-L-gray-600 dark:text-D-gray-600 flex gap-2 bg-L-gray-100 dark:bg-D-gray-100 rounded-md px-2 py-2 gap-4 items-center">
                        <span>{t('DivideOrder.divideOrder')}</span>
                        <div className="w-56">
                            <ControllerInput
                                title={t('DivideOrder.quantity')}
                                highValue={symbolData?.maxTradeQuantity || 0}
                                lowValue={symbolData?.minTradeQuantity || 0}
                                onChange={handleQuantityChange}
                                inputValue={quantityInput}
                            />
                        </div>
                        <div className="w-56">
                            <ControllerInput
                                title={t('DivideOrder.price')}
                                highValue={symbolData?.highThreshold || 0}
                                lowValue={symbolData?.lowThreshold || 0}
                                onChange={(value) => {
                                    setPriceInput(value);
                                    setCustomers((pre) => pre.map((item) => ({ ...item, price: value, status: undefined, clientKey: undefined })));
                                }}
                                inputValue={priceInput}
                            />
                        </div>
                    </div>
                    <div className="h-[282px]">
                        <DivideOrderTable
                            symbolMaxQuantity={symbolData?.maxTradeQuantity ?? 1}
                            rowData={customers}
                            updateData={setCustomers}
                            sendOneOrder={sendOneOrder}
                            setQuantityInput={setQuantityInput}
                        />
                    </div>

                    <div className="flex gap-4 text-[11px]">
                        <div className="text-L-gray-500 dark:text-D-gray500">
                            <span>{t('DivideOrder.rowCount')}: </span>
                            <span>{customers.length || 0}</span>
                        </div>
                        <div className={clsx({ ['text-L-success-200']: side === 'Buy' }, { ['text-L-error-200']: side === 'Sell' })}>
                            <span>{side === 'Buy' ? t('DivideOrder.buyVolume') : t('DivideOrder.sellVolume')}: </span>
                            <span>{seprateNumber(quantityInput)}</span>
                        </div>
                    </div>
                    <div className="flex flex-1 items-end justify-end gap-3">
                        <button
                            onClick={onSendAll}
                            className={clsx(
                                'h-8 px-12 rounded text-L-basic flex items-center justify-center',
                                { ['bg-L-success-200 dark:bg-D-success-200']: side === 'Buy' },
                                { ['bg-L-error-200 dark:bg-D-error-200']: side === 'Sell' },
                            )}
                        >
                            {t('DivideOrder.sendAll')}
                        </button>
                        <button
                            onClick={closeModal}
                            className="flex items-center h-8 px-8 justify-center rounded text-L-primary-50 dark:bg-D-primary-50 border-L-primary-50 dark:border-D-primary-50 border"
                        >
                            {t('DivideOrder.cancel')}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default DivideOrderModal;
