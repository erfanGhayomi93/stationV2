import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ControllerInput from 'src/common/components/ControllerInput';
import Modal from 'src/common/components/Modal';
import { CloseIcon } from 'src/common/icons';
import DivideOrderTable from './components/DivideOrderTable';
import { useBuySellDispatch, useBuySellState } from '../BuySell/context/BuySellContext';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import clsx from 'clsx';
import { getUniqId, seprateNumber } from 'src/utils/helpers';
import { useAppValues } from 'src/redux/hooks';

const DivideOrderModal = () => {
    //
    const { t } = useTranslation();
    const { quantity, symbolISIN, amount, divide, side, price } = useBuySellState();
    const { data: symbolData } = useSymbolGeneralInfo(symbolISIN, { select: (data) => data.symbolData });
    const [shuffleOrder, setShuffleOrder] = useState(false);
    const [quantityInput, setQuantityInput] = useState<number>(quantity);
    const [priceInput, setPriceInput] = useState(price);
    const [customers, setCustomers] = useState<DividedOrderRowType[]>([]);
    const dispatch = useBuySellDispatch();
    const {
        option: { selectedCustomers },
    } = useAppValues();

    const closeModal = () => {
        dispatch({ type: 'SET_DIVIDE', value: false });
    };

    const handleDivideOrders = (quantity: number, selectedCustomers: IGoMultiCustomerType[]) => {
        //
        let dividedOrderArray: DividedOrderRowType[] = [];

        const calculateOrders = (totalQuantity: number, selectedCustomers: IGoMultiCustomerType[]) => {
            const symbolMaxQuantity = symbolData?.maxTradeQuantity || 1;
            const quantityPerCustomer = Math.floor(totalQuantity / selectedCustomers.length);

            const createOrder = (customerISIN: string, customerTitle: string, quantity: number) => {
                return {
                    customerISIN,
                    customerTitle,
                    id: getUniqId(),
                    price: priceInput,
                    quantity,
                    status: null,
                };
            };

            for (const { customerISIN, customerTitle } of selectedCustomers) {
                const orderQuantity = Math.min(quantityPerCustomer, symbolMaxQuantity);
                dividedOrderArray.push(createOrder(customerISIN, customerTitle, orderQuantity));
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
            setQuantityInput(quantity);
            setPriceInput(price);

            const dividedOrders = handleDivideOrders(quantity, selectedCustomers);
            setCustomers(dividedOrders);
        }
    }, [divide]);

    const handleQuantityChange = (value: number) => {
        setQuantityInput(value);

        const dividedOrders = handleDivideOrders(value, selectedCustomers);
        setCustomers(dividedOrders);
    };

    const onSendAll = () => {
        console.log(customers);
    };

    return (
        <Modal isOpen={divide} onClose={closeModal} className="w-[720px] h-[540px] bg-L-basic dark:bg-D-basic  rounded-md">
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
                                    setCustomers((pre) => pre.map((item) => ({ ...item, price: value })));
                                }}
                                inputValue={priceInput}
                            />
                        </div>
                    </div>
                    <div className="h-[282px]">
                        <DivideOrderTable rowData={customers} updateData={setCustomers} setQuantityInput={setQuantityInput} />
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
