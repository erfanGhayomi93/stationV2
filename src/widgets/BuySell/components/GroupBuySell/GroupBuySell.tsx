import SimpleDatepicker from 'src/common/components/Datepicker/SimpleDatepicker';
import Input from 'src/common/components/Input';
import { useAppValues } from 'src/redux/hooks';
import BuySellDetail from '../Detail/BuySellDetail';
import BuySellPrice from '../Price';
import BuySellQuantity from '../Quantity';
import SetBasketAction from '../SetBasketAction';
import SetDraftAction from '../SetDraftAction';
import SetOrderAction from '../SetOrderAction';
import BuySellStrategy from '../Strategy';
import BuySellSymbol from '../Symbol';
import BuySellValidity from '../Validity';

const GroupBuySell = () => {
    const {
        option: { selectedCustomers },
    } = useAppValues();

    return (
        <div className="flex flex-col text-1.2 p-2 h-full relative justify-between">
            <div className="flex flex-col py-1 grow justify-around">
                <div className="flex w-full gap-4 pr-2">
                    <label className="w-full flex items-center justify-center ">
                        <span className="w-[64px] whitespace-nowrap ">مشتری</span>
                        <div className="w-full border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded-md">
                            <Input value={selectedCustomers.map((c) => c.customerTitle)} onChange={() => {}} />
                        </div>
                    </label>
                </div>

                <BuySellSymbol />
                <BuySellPrice />
                <BuySellQuantity />
                <BuySellValidity />
                <BuySellStrategy />
            </div>
            <div className="flex flex-col gap-3">
                <BuySellDetail />
                <div className="flex gap-3  ">
                    <SetOrderAction />
                    <SetDraftAction />
                    <SetBasketAction />
                </div>
            </div>
        </div>
    );
};

export default GroupBuySell;
