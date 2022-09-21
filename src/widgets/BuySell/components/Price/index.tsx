import { FC, useCallback, useEffect } from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import ControllerInput from 'src/common/components/ControllerInput';
import useCommission, { useCommissionValue } from 'src/common/hooks/useCommission/useCommissionValue';
import { LockIcon } from 'src/common/icons';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';

interface IBuySellPriceType {}

const BuySellPrice: FC<IBuySellPriceType> = ({}) => {
    const dispatch = useBuySellDispatch();

    const { price, symbolISIN, isCalculatorEnabled, amount, quantity, side } = useBuySellState();
    const { data: symbolData } = useSymbolGeneralInfo(symbolISIN, { select: (data) => data.symbolData });
    const { unitCommission } = useCommission({ quantity, price, marketUnit: symbolData?.marketUnit, side });
    const { buyCommissionValue, sellCommissionValue } = useCommissionValue({ marketUnit: symbolData?.marketUnit });

    const setPrice = (value: number) => dispatch({ type: 'SET_PRICE', value });
    const setQuantity = (value: number) => dispatch({ type: 'SET_QUANTITY', value });

    const handleChangePrice = (value: number) => {
        setPrice(value);
    };

    const getTradedQuantity = (p: number, value: number, side: 'BUY' | 'SELL') => {
        const cv = side === 'BUY' ? buyCommissionValue : sellCommissionValue;
        return side === 'BUY' ? value / (cv * p + p) : value / (-cv * p + p);
    };

    useEffect(() => {
        price ? isCalculatorEnabled && setQuantity(Math.floor(getTradedQuantity(price, amount, side))) : setQuantity(0);
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
                <button className="px-2">
                    <LockIcon className="text-L-gray-400 dark:text-D-gray-400" />
                </button>
            </ControllerInput>
        </div>
    );
};

export default BuySellPrice;
