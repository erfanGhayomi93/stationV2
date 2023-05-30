import ActionManager from '../ActionManager';
import BuySellCustomer from '../BuySellCustomer';
import BuySellDetail from '../Detail/BuySellDetail';
import BuySellPrice from '../Price';
import BuySellQuantity from '../Quantity';
import BuySellStrategy from '../Strategy';
import BuySellSymbol from '../Symbol';
import BuySellValidity from '../Validity';

const GroupBuySell = () => {
    return (
        <div className="flex flex-col text-1.2 p-2 h-full relative justify-between">
            <div className="flex flex-col py-1 grow justify-around">
                <BuySellCustomer />
                <BuySellSymbol />
                <BuySellPrice />
                <BuySellQuantity />
                <BuySellValidity />
                <BuySellStrategy />
            </div>
            <div className="flex flex-col gap-3">
                <BuySellDetail />
                <ActionManager />
            </div>
        </div>
    );
};

export default GroupBuySell;
