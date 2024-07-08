import { useSymbolGeneralInfo } from 'src/app/queries/symbol';
import { useBuySellState } from '../../context/BuySellContext';
import ActionManager from '../ActionManager';
import BuySellCustomer from '../BuySellCustomer';
import BuySellDetail from '../Detail/BuySellDetail';
import { OptionGuaranty } from '../OptionGuaranty';
import BuySellPrice from '../Price';
import BuySellQuantity from '../Quantity';
// import BuySellStrategy from '../Strategy';
import BuySellSymbol from '../Symbol';
import BuySellValidity from '../Validity';
import { useAppSelector } from 'src/redux/hooks';
import { getSelectedSymbol } from 'src/redux/slices/option';

const GroupBuySell = () => {

    const { side } = useBuySellState();

    const selectedSymbol = useAppSelector(getSelectedSymbol)

    const { data: symbolData } = useSymbolGeneralInfo(selectedSymbol, { select: (data) => ({ isOption: data.symbolData.isOption, symbolData: data.symbolData }) });

    return (
        <div className="flex flex-col text-1.2 p-2 h-full relative justify-between">
            <div className="flex flex-col py-1 grow gap-2 justify-around">
                <BuySellCustomer />
                <BuySellSymbol />
                <BuySellPrice />
                <BuySellQuantity />
                <BuySellValidity />
                {
                    (side === 'Sell' && !!symbolData?.isOption) && (
                        <OptionGuaranty
                            symbolData={symbolData.symbolData}
                        />
                    )
                }
                {/* <BuySellStrategy /> */}
            </div>
            <div className="flex flex-col gap-3 my-6 ">
                <BuySellDetail />
                <ActionManager />
            </div>
        </div>
    );
};

export default GroupBuySell;
