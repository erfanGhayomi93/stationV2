import { useQueryClient } from '@tanstack/react-query';
import { FC, useState } from 'react';
import { useCreateDetailsBasket, useGetBasket } from 'src/app/queries/basket';
import Modal from 'src/common/components/Modal';
import { CloseIcon, ModalBasketIcon, PlusIcon } from 'src/common/icons';
import { onErrorNotif, onSuccessNotif } from 'src/handlers/notification';
import { useAppDispatch, useAppValues } from 'src/redux/hooks';
import { setSelectedCustomers } from 'src/redux/slices/option';
import { handleValidity } from 'src/utils/helpers';
import { useBuySellDispatch, useBuySellState } from '../../context/BuySellContext';
import Tippy from '@tippyjs/react';

interface ISetBasketActionType {}

const SetBasketAction: FC<ISetBasketActionType> = ({}) => {
    const { side, price, quantity, sequential, symbolISIN, validity, validityDate, percent } = useBuySellState();

    const [isOpen, setisOpen] = useState(false);
    const queryClient = useQueryClient();
    const dispatch = useBuySellDispatch();
    const appDispatch = useAppDispatch();
    // const [isNewBasket, setisNewBasket] = useState(false);
    const { data: listBasket } = useGetBasket();
    const { mutate: mutateCreateDetailBasket } = useCreateDetailsBasket({
        onSuccess: () => {
            onSuccessNotif({ title: 'مشتری با موفقیت به سبد اضافه شد' });
            queryClient.invalidateQueries(['draftList']);

            if (!sequential) {
                dispatch({ type: 'RESET' });
                appDispatch(setSelectedCustomers([]));
            }
        },
        onError: () => {
            onErrorNotif();
        },
    });
    const {
        option: { selectedCustomers },
    } = useAppValues();

    const toggleOpen = () => {
        setisOpen((prev) => !prev);
    };

    const handleSetBasket = (id: number) => {
        let isins = selectedCustomers.map((c: any) => c.customerISIN);
        let isinsCommaSeparator = String(isins);
        const result = {
            cartID: id,
            symbolISIN: symbolISIN,
            price: price,
            quantity: quantity,
            percent: percent,
            side: side,
            validity: handleValidity(validity),
            validityDate: validityDate,
            customerISINs: isinsCommaSeparator,
            orderStrategy: 'Normal',
        };
        mutateCreateDetailBasket(result);
    };

    return (
        <>
            <Tippy content='ثبت در سند' className='text-xs'>
                <button
                    onClick={() => setisOpen(true)}
                    className="flex items-center h-8 justify-center w-[32px] bg-L-primary-100  rounded text-L-primary-50 dark:bg-D-primary-50 border-L-primary-50 dark:border-D-primary-50 border"
                >
                    <ModalBasketIcon />
                </button>
            </Tippy>
            <Modal isOpen={isOpen} onClose={toggleOpen} className="min-h-[31rem] w-[500px] rounded-md h-full grid">
                <div className="grid grid-rows-min-one bg-L-basic dark:bg-D-basic">
                    <div className="w-full text-white font-medium  bg-L-primary-50 dark:bg-D-gray-350 h-10 flex items-center justify-between px-5">
                        <p>انتخاب سبد</p>
                        <CloseIcon onClick={toggleOpen} className="cursor-pointer" />
                    </div>
                    <div className="mx-4">
                        <div className="py-2 h-[fit-content]">
                            {listBasket &&
                                listBasket
                                    .filter((item) => item.isPinned)
                                    .map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center justify-between my-4 text-L-gray-500 dark:text-D-gray-500 bg-L-gray-100 dark:bg-D-gray-100 border border-solid border-L-gray-350 dark:border-D-gray-350 rounded-lg p-2"
                                        >
                                            <p>{item.name}</p>
                                            <div
                                                onClick={() => handleSetBasket(item.id)}
                                                className="text-L-primary-50 dark:text-D-primary-50 rounded bg-L-basic dark:bg-D-basic drop-shadow cursor-pointer"
                                            >
                                                <PlusIcon width={16} height={16} />
                                            </div>
                                        </div>
                                    ))}
                        </div>

                        {/* <div>
                            <div className="flex items-center py-4 cursor-pointer w-fit select-none" onClick={() => setisNewBasket((prev) => !prev)}>
                                {!isNewBasket ? (
                                    <div className="text-L-basic dark:text-D-basic rounded bg-L-primary-50 dark:bg-D-primary-50 drop-shadow border border-L-primary-50 dark:border-D-primary-50">
                                        <PlusIcon width={16} height={16} />
                                    </div>
                                ) : (
                                    <div className="text-L-primary-50 dark:text-D-primary-50 rounded bg-L-primary-100 dark:bg-D-primary-100 drop-shadow border border-L-primary-100 dark:border-D-primary-100">
                                        <Negetive />
                                    </div>
                                )}
                                <p className="text-L-primary-50 dark:text-D-primary-50 pr-4">ایجاد سبد جدید</p>
                            </div>
                            {isNewBasket && (
                                <div dir="ltr">
                                    <CreateBasket />
                                </div>
                            )}
                        </div> */}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default SetBasketAction;
