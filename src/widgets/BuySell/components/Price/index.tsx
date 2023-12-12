import { FC, memo, useEffect, useMemo, useState } from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import ControllerInput from 'src/common/components/ControllerInput';
import useCommission, { useCommissionValue } from 'src/common/hooks/useCommission/useCommissionValue';
import { LockClose, LockOpen } from 'src/common/icons';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';
import { useAppSelector } from 'src/redux/hooks';
import { getSelectedSymbol } from 'src/redux/slices/option';
import { SymbolBestOneOrders } from 'src/ls/subscribes';
import { pushEngine } from 'src/ls/pushEngine';
import useUpdateEffect from 'src/common/hooks/useUpdateEffect';

interface bestPriceBuySell {
    bestBuyLimitPrice_1: number;
    bestSellLimitPrice_1: number;
}

const BuySellPrice: FC = () => {
    const dispatch = useBuySellDispatch();
    const selectedSymbol = useAppSelector(getSelectedSymbol);

    const lockIconOpen = useMemo(() => <LockOpen className="h-4 w-5 text-L-gray-500 dark:text-D-gray-500" />, []);
    const lockIconClose = useMemo(() => <LockClose className="h-4 w-5 text-L-gray-500 dark:text-D-gray-500" />, []);

    const { price, symbolISIN, isCalculatorEnabled, amount, quantity, side } = useBuySellState();
    const { data: symbolData } = useSymbolGeneralInfo(symbolISIN, { select: (data) => data.symbolData });
    const { unitCommission } = useCommission({ quantity, price, marketUnit: symbolData?.marketUnit, side });
    const { buyCommission, sellCommission } = useCommissionValue({ marketUnit: symbolData?.marketUnit });

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
    const setQuantity = (value: number) => dispatch({ type: 'SET_QUANTITY', value });

    const handleChangePrice = (value: number) => {
        isLockPrice && handleUnLockPrice()
        setPrice(value);
    };

    const getTradedQuantity = () => {
        const commissionValue = side === 'Buy' ? buyCommission : sellCommission;
        return side === 'Buy' ? amount / (commissionValue * price + price) : amount / (-commissionValue * price + price);
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
    }, [selectedSymbol , side])

    useEffect(() => {
        price ? isCalculatorEnabled && setQuantity(Math.floor(getTradedQuantity())) : setQuantity(0);
    }, [unitCommission, price, amount, isCalculatorEnabled]);


    return (
        <div className="flex w-full gap-4 pr-2">
            <ControllerInput
                highValue={symbolData?.highThreshold || 0}
                lowValue={symbolData?.lowThreshold || 0}
                onChange={handleChangePrice}
                inputValue={price}
                title="قیمت"
                unit={<>ريال</>}
                max={1000000000}
            >
                <button onClick={handleClickButtonLock} className="px-2">{
                    isLockPrice ? lockIconClose : lockIconOpen
                }</button>
            </ControllerInput>
        </div>
    );
};

export default memo(BuySellPrice);
