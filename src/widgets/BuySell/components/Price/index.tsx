import { FC } from 'react';
import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import ControllerInput from 'src/common/components/ControllerInput';
import { LockIcon } from 'src/common/icons';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';

interface IBuySellPriceType {}

const BuySellPrice: FC<IBuySellPriceType> = ({}) => {
    const dispatch = useBuySellDispatch();

    const { price, symbolISIN } = useBuySellState();
    const { data: symbolData } = useSymbolGeneralInfo(symbolISIN, { select: (data) => data.symbolData });
    const setPrice = (value: number) => dispatch({ type: 'SET_PRICE', value });

    return (
        <div className="flex w-full gap-4 pr-2">
            <ControllerInput
                highValue={symbolData?.highThreshold || 0}
                lowValue={symbolData?.lowThreshold || 0}
                onChange={setPrice}
                inputValue={price}
                title="قیمت"
            >
                <button className="px-2">
                    <LockIcon className="text-L-gray-400 dark:text-D-gray-400" />
                </button>
            </ControllerInput>
        </div>
    );
};

export default BuySellPrice;
