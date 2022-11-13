import clsx from 'clsx';
import { FC } from 'react';
import { useGetBasket } from 'src/app/queries/basket';
import { useGlobalSetterState } from 'src/common/context/globalSetterContext';
import { BasketPlusIcon, CloseIcon } from 'src/common/icons';
import { useAppDispatch } from 'src/redux/hooks';
import { setSelectedCustomers, setSelectedSymbol } from 'src/redux/slices/option';
import BuySellWidget from 'src/widgets/BuySell/context/BuySellContext';
import { useBasketDispatch, useBasketState } from '../context/BasketContext';

interface IInsertBasketItemType {
    activeBasket?: number;
}

const InsertBasketItem: FC<IInsertBasketItemType> = ({ activeBasket }) => {
    const dispatch = useBasketDispatch();
    const { visible } = useBasketState();
    const { data: listBasket } = useGetBasket();
    const appDispatch = useAppDispatch();
    const { resetBuySellState } = useGlobalSetterState();
    const resetSelectedCustomer = () => {
        appDispatch(setSelectedCustomers([]));
    };
    const setBuySellModalVisible = () => {
        appDispatch(setSelectedSymbol(''));
        dispatch({ type: 'SET_BUY_SELL_MODALL', value: true });
    };

    const setBuySellModalInVisible = () => {
        dispatch({ type: 'RESET' });
        resetBuySellState();
        resetSelectedCustomer();
    };
    return (
        <div>
            <button
                className="shadow-sm flex gap-2 mt-2 py-1.5 drop-shadow-sm px-2 shadow-L-primary-50 text-L-primary-50 dark:text-D-primary-50 bg-L-basic dark:bg-D-basic border border-L-primary-50 p-1 text-1.3 rounded-md"
                onClick={setBuySellModalVisible}
            >
                <BasketPlusIcon />
                افزودن سفارش جدید به سبد
            </button>

            <div
                className={clsx(
                    visible ? 'fixed top-0 z-40 left-0 w-screen h-screen bg-black bg-opacity-10 flex items-center justify-center ' : 'hidden',
                )}
            >
                <div>
                    <div className="bg-L-primary-50 dark:bg-D-primary-50 text-L-basic py-2 flex px-3 relative rounded-t-lg">
                        افزودن سفارش به سبد :<span>{listBasket?.find((item) => item.id === activeBasket)?.name}</span>
                        <button
                            onClick={setBuySellModalInVisible}
                            className="absolute p-1 left-0 z-[888] top-0 -translate-x-1.5 -translate-y-1.5 rounded-full border-L-primary-50 text-L-primary-50 border bg-L-basic "
                        >
                            <CloseIcon width={12} height={12} />
                        </button>
                    </div>
                    <div className=" min-h-[475px] grid ">
                        <BuySellWidget />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsertBasketItem;
