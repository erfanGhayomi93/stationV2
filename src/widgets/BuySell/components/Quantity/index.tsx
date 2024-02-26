import { RadioGroup, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { FC, Fragment, memo, useEffect, useMemo, useState } from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import ControllerInput from 'src/common/components/ControllerInput';
import useCommission, { useCommissionValue } from 'src/common/hooks/useCommission/useCommissionValue';
import { CalculatorIcon, CoinIcon, InfoFillIcon, PercentIcon } from 'src/common/icons';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';
import TradeInput from '../Input';
import { useAppSelector } from 'src/redux/hooks';
import { getSelectedCustomers } from 'src/redux/slices/option';
import Tippy from '@tippyjs/react';

const BuySellQuantity: FC = () => {
    const dispatch = useBuySellDispatch();
    const { quantity, symbolISIN, isCalculatorEnabled, amount, price, side } = useBuySellState();
    const { data: symbolData } = useSymbolGeneralInfo(symbolISIN, { select: (data) => data.symbolData });
    const calculatorIcon = useMemo(() => <CalculatorIcon className="h-5 w-4 text-L-gray-500 dark:text-D-gray-500" />, []);
    const toggleButton = useMemo(() => <ToggleButton />, []);

    // const { unitCommission } = useCommission({ quantity, price, marketUnit: symbolData?.marketUnit, side });
    const { buyCommission, sellCommission } = useCommissionValue({ marketUnit: symbolData?.marketUnit });
    //
    const setQuantity = (value: number) => dispatch({ type: 'SET_QUANTITY', value });
    const setPercent = (value: number) => dispatch({ type: 'SET_PERCENT', value });
    const setAmount = (value: number) => dispatch({ type: 'SET_AMOUNT', value });
    const toggleCalculator = (value: boolean) => dispatch({ type: 'TOGGLE_CALCULATOR', value });

    const selectedCustomer = useAppSelector(getSelectedCustomers)


    const [mode, setMode] = useState<'AMOUNT' | 'PERCENT'>('AMOUNT');
    //
    const calculateQuantity = (value: number) => {
        setAmount(value);
    };
    const setPercentage = (value: number) => {
        setAmount(value);
        setPercent(value);
    };
    const handleQuantity = (value: number) => {
        setQuantity(value);
        setAmount(0);
    };
    const handleChangeMode = (value: 'AMOUNT' | 'PERCENT') => {
        setMode(value);
        setAmount(0);
        setPercent(0);
    };

    const getTradedQuantity = () => {
        try {
            const commissionValue = side === 'Buy' ? buyCommission : sellCommission;
            const purchasePower = selectedCustomer[0]?.purchasePower || 0
            const calcPercent = selectedCustomer.length === 1 && purchasePower > 0 ? purchasePower * (amount / 100) : 0
            const total = mode === 'AMOUNT' ? amount : calcPercent
            return side === 'Buy' ? total / (commissionValue * price + price) : total / (-commissionValue * price + price)
        }
        catch {
            return 0
        }
    };

    useEffect(() => {
        (price && isCalculatorEnabled) && setQuantity(Math.floor(getTradedQuantity()))
    }, [price, amount, isCalculatorEnabled, selectedCustomer]);


    const handleTippyWarning = () => {
        if (!quantity) return false;

        const maxTradeQuantity = symbolData?.maxTradeQuantity || 0;
        const minTradeQuantity = symbolData?.minTradeQuantity || 0;

        if (maxTradeQuantity < quantity || minTradeQuantity > quantity) {
            return true;
        } else {
            return false;
        }
    };

    const isQuantityValid = handleTippyWarning();

    return (
        <>
            <div className="flex w-full gap-4 pr-2 ">
                <ControllerInput
                    title="تعداد"
                    highValue={symbolData?.maxTradeQuantity || 0}
                    lowValue={symbolData?.minTradeQuantity || 0}
                    onChange={handleQuantity}
                    inputValue={quantity}
                    unit={
                        <>
                            <Tippy content={'تعداد در بازه مجاز نمیباشد'} placement="top" className="text-L-warning text-xs">
                                {isQuantityValid ? <InfoFillIcon className="text-L-warning mr-1" /> : <></>}
                            </Tippy>
                            عدد
                        </>
                    }
                >
                    <button className="px-2" onClick={() => toggleCalculator(!isCalculatorEnabled)}>
                        {calculatorIcon}
                    </button>
                </ControllerInput>
            </div>
            <Transition
                appear
                show={isCalculatorEnabled}
                as={Fragment}
                enter="ease-out duration-300 origin-top"
                enterFrom="scale-y-0 opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-300 origin-top"
                leaveFrom="opacity-100"
                leaveTo="scale-y-0 opacity-0"
            >
                <div className={'flex w-full gap-4 pr-2 duration-150'}>
                    <label className="w-full flex items-center justify-center ">
                        <span className="w-16 whitespace-nowrap "> {mode === 'AMOUNT' ? 'مبلغ' : 'درصد'}</span>
                        <div className="w-full flex border-L-gray-400 dark:border-D-gray-400 border overflow-hidden rounded-md">
                            <div className="w-full">
                                <TradeInput
                                    onChange={(value) => (mode === 'AMOUNT' ? calculateQuantity(value) : setPercentage(value))}
                                    value={amount}
                                    max={mode === 'AMOUNT' ? 100000000000 : 100}
                                    type={mode === 'AMOUNT' ? 'text' : 'text'}
                                    unit={mode === 'AMOUNT' ? <>ريال</> : <>%</>}
                                />
                            </div>
                            <div className=" w-48  bg-L-gray-300 dark:bg-D-gray-300 border-r border-L-gray-500 dark:border-D-gray-500">
                                <RadioGroup
                                    value={mode}
                                    onChange={handleChangeMode}
                                    as="div"
                                    className="flex items-center justify-center w-full h-full"
                                >
                                    {toggleButton}
                                </RadioGroup>
                            </div>
                        </div>
                    </label>
                </div>
            </Transition>
        </>
    );
};

export default memo(BuySellQuantity);


const ToggleButton = () => {
    return (
        <>
            <RadioGroup.Option className="w-full flex items-center cursor-pointer justify-center" value="AMOUNT">
                {({ checked }) => (
                    <span
                        className={clsx(
                            '  w-full  flex items-center justify-center gap-1 ',
                            checked ? 'text-L-primary-50 dark:text-D-primary-50' : 'text-L-gray-500 dark:text-D-gray-500 ',
                        )}
                    >
                        <CoinIcon />
                        مبلغ
                    </span>
                )}
            </RadioGroup.Option>
            <RadioGroup.Option
                className="w-full flex items-center cursor-pointer justify-center border-r border-L-gray-500 dark:border-D-gray-500"
                value="PERCENT"
            >
                {({ checked }) => (
                    <span
                        className={clsx(
                            '  w-full   flex items-center justify-center gap-1',
                            checked ? 'text-L-primary-50 dark:text-D-primary-50' : ' text-L-gray-500 dark:text-D-gray-500',
                        )}
                    >
                        <PercentIcon />
                        درصد
                    </span>
                )}
            </RadioGroup.Option>
        </>
    );
};
