import { FC, memo, useMemo, useState } from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import ControllerInput from 'src/common/components/ControllerInput';
import { InfoFillIcon, LockClose, LockOpen } from 'src/common/icons';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';
import { useAppSelector } from 'src/redux/hooks';
import { getSelectedSymbol } from 'src/redux/slices/option';
import { SymbolBestOneOrders } from 'src/ls/subscribes';
import { pushEngine } from 'src/ls/pushEngine';
import useUpdateEffect from 'src/common/hooks/useUpdateEffect';
import Tippy from '@tippyjs/react';

const BuySellPrice: FC = () => {
    const dispatch = useBuySellDispatch();
    const selectedSymbol = useAppSelector(getSelectedSymbol);

    const lockIconOpen = useMemo(() => <LockOpen className="h-4 w-5 text-L-gray-500 dark:text-D-gray-500" />, []);
    const lockIconClose = useMemo(() => <LockClose className="h-4 w-5 text-L-gray-500 dark:text-D-gray-500" />, []);

    const { price, symbolISIN, side } = useBuySellState();
    const { data: symbolData } = useSymbolGeneralInfo(symbolISIN, { select: (data) => data.symbolData });
   

    const [isLockPrice, setIsLockPrice] = useState(false)

    const { data } = useSymbolGeneralInfo<bestPriceBuySell>(selectedSymbol, {
        select: (data) => {
            return {
                bestBuyLimitPrice_1: data.ordersData.bestBuyLimitPrice_1 || 0,
                bestSellLimitPrice_1: data.ordersData.bestSellLimitPrice_1 || 0,
            }
        }
    })

    const { bestBuyLimitPrice_1, bestSellLimitPrice_1 } = data || {}


    const setPrice = (value: number) => dispatch({ type: 'SET_PRICE', value });

    const handleChangePrice = (value: number) => {
        isLockPrice && handleUnLockPrice()
        setPrice(value);
    };


    const setLockPrice = () => {
        const price = side === 'Buy' ? bestSellLimitPrice_1 : bestBuyLimitPrice_1
        !!price && setPrice(price as number)
    }

    const handleLockPrice = () => {
        setIsLockPrice(true)
        setLockPrice()
        SymbolBestOneOrders(selectedSymbol, ["bestBuyLimitPrice_1", "bestSellLimitPrice_1"])
    }

    const handleUnLockPrice = () => {
        setIsLockPrice(false)
        pushEngine.unSubscribe('SymbolBestOneOrders');
    }

    const handleClickButtonLock = () => {
        isLockPrice ? handleUnLockPrice() : handleLockPrice()
    }

    useUpdateEffect(() => {
        isLockPrice && setLockPrice()
    }, [bestBuyLimitPrice_1, bestSellLimitPrice_1])

    useUpdateEffect(() => {
        handleUnLockPrice()
    }, [selectedSymbol, side])

    const handleTippyWarning = () => {
        if (!price) return false;

        const highThreshold = symbolData?.highThreshold || 0;
        const lowThreshold = symbolData?.lowThreshold || 0;

        if (highThreshold < price || lowThreshold > price) {
            return true;
        } else {
            return false;
        }
    };

    const isPriceValid = handleTippyWarning();

    return (
        <div className="flex w-full gap-4 pr-2">
            <ControllerInput
                highValue={symbolData?.highThreshold || 0}
                lowValue={symbolData?.lowThreshold || 0}
                onChange={handleChangePrice}
                inputValue={price}
                title="قیمت"
                unit={
                    <>
                        <Tippy content={'قیمت در بازه مجاز نمیباشد'} placement="top" className="text-L-warning text-xs">
                            {isPriceValid ? <InfoFillIcon className="text-L-warning mr-1" /> : <></>}
                        </Tippy>
                        ريال
                    </>
                }
                max={1000000000}
            >
                <button onClick={handleClickButtonLock} className="px-2">
                    {isLockPrice ? lockIconClose : lockIconOpen}
                </button>
            </ControllerInput>
        </div>
    );
};

export default memo(BuySellPrice);
