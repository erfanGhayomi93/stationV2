import clsx from 'clsx';
import { FC, useState } from 'react';
import { useGetBasket } from 'src/app/queries/basket';
import { useGlobalSetterState } from 'src/common/context/globalSetterContext';
import { CloseIcon } from 'src/common/icons';
import { ComeFromKeepDataEnum } from 'src/constant/enums';
import BuySellWidget from 'src/widgets/BuySell/context/BuySellContext';

interface IInsertBasketItemType {
    activeBasket?: number;
}

const InsertBasketItem: FC<IInsertBasketItemType> = ({ activeBasket }) => {
    const [isBuySellModalVisible, setIsBuySellModalVisible] = useState(false);
    const { setBuySellModalExtra } = useGlobalSetterState();
    const { data: listBasket } = useGetBasket();
    const setBuySellModalVisible = () => {
        setIsBuySellModalVisible(true);
        setBuySellModalExtra<IBuySellExtra>({
            from: ComeFromKeepDataEnum.Basket,
            id: activeBasket,
        });
    };

    return (
        <div>
            <button onClick={setBuySellModalVisible}>افزودن</button>

            <div
                className={clsx(
                    isBuySellModalVisible
                        ? 'fixed top-0 z-40 left-0 w-screen h-screen bg-black bg-opacity-10 flex items-center justify-center '
                        : 'hidden',
                )}
            >
                <div>
                    <div className="bg-L-primary-50 dark:bg-D-primary-50 text-L-basic py-2 flex px-3 relative rounded-t-lg">
                        افزودن سفارش به سبد :<span>{listBasket?.find((item) => item.id === activeBasket)?.name}</span>
                        <button
                            onClick={() => setIsBuySellModalVisible(false)}
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
