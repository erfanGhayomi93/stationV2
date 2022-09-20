import { FC } from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import ControllerInput from 'src/common/components/ControllerInput';
import { CalculatorIcon, LockIcon } from 'src/common/icons';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';

interface IBuySellQuantityType {}

const BuySellQuantity: FC<IBuySellQuantityType> = ({}) => {
    const dispatch = useBuySellDispatch();

    const { quantity, symbolISIN } = useBuySellState();
    const { data: symbolData } = useSymbolGeneralInfo(symbolISIN, { select: (data) => data.symbolData });

    const setQuantity = (value: number) => dispatch({ type: 'SET_QUANTITY', value });
    return (
        <div className="flex w-full gap-4 pr-2">
            <ControllerInput
                title="تعداد"
                highValue={symbolData?.maxTradeQuantity || 0}
                lowValue={symbolData?.minTradeQuantity || 0}
                onChange={setQuantity}
                inputValue={quantity}
            >
                <button className="px-2">
                    <CalculatorIcon className="text-L-gray-400 dark:text-D-gray-400" />
                </button>
            </ControllerInput>
        </div>
    );
};

export default BuySellQuantity;
