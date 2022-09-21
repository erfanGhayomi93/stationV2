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
        <div className="flex flex-col text-1.2 p-2 h-full relative">
            <div className="flex flex-col py-4 gap-2">
                <div className="flex w-full gap-4 pr-2">
                    <label className="w-full flex items-center justify-center ">
                        <span className="w-[64px] whitespace-nowrap ">مشتری</span>
                        <div className="w-full border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded-md">
                            <Input value={selectedCustomers.map((c) => c.customerTitle)} />
                        </div>
                    </label>
                </div>

                <BuySellSymbol />
                <BuySellPrice />
                <BuySellQuantity />

                <div className="flex w-full gap-4 pr-1 items-start">
                    <div className="flex w-full gap-4 pr-2">
                        <BuySellValidity />
                    </div>
                    <div className="flex w-full gap-4 ">
                        <BuySellStrategy />
                    </div>
                </div>
            </div>

            <BuySellDetail />
            <div className="flex gap-3 pt-2 ">
                <SetOrderAction />
                <SetDraftAction />
                <SetBasketAction />
            </div>
        </div>
    );
};

export default GroupBuySell;
