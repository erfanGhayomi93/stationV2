import { RadioGroup, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { FC, Fragment, useState } from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import ControllerInput from 'src/common/components/ControllerInput';
import useCommission, { useCommissionValue } from 'src/common/hooks/useCommission/useCommissionValue';
import { CalculatorIcon, CoinIcon, PercentIcon } from 'src/common/icons';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';
import TradeInput from '../Input';

interface IBuySellQuantityType {}
const ToggleButton = () => {
    return (
        <>
            <RadioGroup.Option className="w-full flex items-center cursor-pointer justify-center" value="AMOUNT">
                {({ checked }) => (
                    <span
                        className={clsx(
                            '  w-full  flex items-center justify-center gap-1 ',
                            checked ? 'text-L-primary-50 dark:text-D-primary-50' : 'text-L-gray-400 dark:text-D-gray-400 ',
                        )}
                    >
                        <CoinIcon />
                        مبلغ
                    </span>
                )}
            </RadioGroup.Option>
            <RadioGroup.Option
                className="w-full flex items-center cursor-pointer justify-center border-r border-L-gray-400 dark:border-D-gray-400"
                value="PERCENT"
            >
                {({ checked }) => (
                    <span
                        className={clsx(
                            '  w-full   flex items-center justify-center gap-1',
                            checked ? 'text-L-primary-50 dark:text-D-primary-50' : ' text-L-gray-400 dark:text-D-gray-400',
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
const BuySellQuantity: FC<IBuySellQuantityType> = ({}) => {
    const dispatch = useBuySellDispatch();
    const { quantity, symbolISIN, price, isCalculatorEnabled, amount, side } = useBuySellState();
    const { data: symbolData } = useSymbolGeneralInfo(symbolISIN, { select: (data) => data.symbolData });
    const { buyCommissionValue, sellCommissionValue } = useCommissionValue({ marketUnit: symbolData?.marketUnit });
    //
    const setQuantity = (value: number) => dispatch({ type: 'SET_QUANTITY', value });
    const setPercent = (value: number) => dispatch({ type: 'SET_PERCENT', value });
    const setAmount = (value: number) => dispatch({ type: 'SET_AMOUNT', value });
    const toggleCalculator = (value: boolean) => dispatch({ type: 'TOGGLE_CALCULATOR', value });
    //

    const [mode, setMode] = useState<'AMOUNT' | 'PERCENT'>('AMOUNT');
    //
    const calculateQuantity = (value: number) => {
        setAmount(value);
        price && setQuantity(Math.ceil(getTradedQuantity(price, value, side)));
        console.log(getTradedQuantity(price, value, side));
    };

    const getTradedQuantity = (p: number, value: number, side: 'Buy' | 'Sell') => {
        console.log(side);

        const cv = side === 'Buy' ? buyCommissionValue : sellCommissionValue;
        return side === 'Buy' ? value / (cv * p + p) : value / (-cv * p + p);
    };

    const setPercentage = (value: number) => {
        setAmount(value);
        setPercent(value);
    };
    const handleQuantity = (value: number) => {
        if (!isCalculatorEnabled) {
            setQuantity(value);
            setAmount(0);
        }
    };
    const handleChangeMode = (value: 'AMOUNT' | 'PERCENT') => {
        setMode(value);
        setAmount(0);
    };

    return (
        <>
            <div className="flex w-full gap-4 pr-2">
                <ControllerInput
                    title="تعداد"
                    highValue={symbolData?.maxTradeQuantity || 0}
                    lowValue={symbolData?.minTradeQuantity || 0}
                    onChange={handleQuantity}
                    inputValue={quantity}
                    unit={<>عدد</>}
                >
                    <button className="px-2" onClick={() => toggleCalculator(!isCalculatorEnabled)}>
                        <CalculatorIcon className="text-L-gray-400 dark:text-D-gray-400" />
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
                        <span className="w-[64px] whitespace-nowrap "> {mode === 'AMOUNT' ? 'مبلغ' : 'درصد'}</span>
                        <div className="w-full flex border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded-md">
                            <div className="w-full">
                                <TradeInput
                                    onChange={(value) => (mode === 'AMOUNT' ? calculateQuantity(value) : setPercentage(value))}
                                    value={amount}
                                    max={mode === 'AMOUNT' ? 100000000000 : 100}
                                    type={mode === 'AMOUNT' ? 'text' : 'percent'}
                                    unit={mode === 'AMOUNT' ? <>ريال</> : <>%</>}
                                />
                            </div>
                            <div className=" w-48  bg-L-gray-150 dark:bg-D-gray-150 border-r border-L-gray-400 dark:border-D-gray-400">
                                <RadioGroup
                                    value={mode}
                                    onChange={handleChangeMode}
                                    as="div"
                                    className="flex items-center justify-center w-full h-full"
                                >
                                    <ToggleButton />
                                </RadioGroup>
                            </div>
                        </div>
                    </label>
                </div>
            </Transition>
        </>
    );
};

export default BuySellQuantity;
