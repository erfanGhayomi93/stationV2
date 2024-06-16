import Tippy from '@tippyjs/react';
import { FC, useState } from 'react';
import { useGetBasket } from 'src/app/queries/basket';
import Modal from 'src/common/components/Modal';
import { CloseIcon, InfoIcon, ModalBasketIcon, Negetive, PlusIcon } from 'src/common/icons';
import { onErrorNotif } from 'src/handlers/notification';
import { useAppSelector } from 'src/redux/hooks';
import { getSelectedCustomers } from 'src/redux/slices/option';
import { useTranslation } from 'react-i18next';
import ConfirmOrder from './ConfirmOrder';
import CreateBasket from 'src/pages/basket/components/CreateBasket';

interface ISetBasketActionType {}

const SetBasketAction: FC<ISetBasketActionType> = ({}) => {
    //
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(false);

    const [selectedBasket, setSelectedBasket] = useState<{ name?: string; id?: number }>({});

    const [isNewBasket, setIsNewBasket] = useState(false);
    
    const { data: listBasket } = useGetBasket();

    const selectedCustomers = useAppSelector(getSelectedCustomers);

    const toggleOpen = () => {
        setSelectedBasket({});
        setIsOpen((prev) => !prev);
    };

    const openModal = () => {
        if (!selectedCustomers.length) {
            onErrorNotif({ title: t('common.notCustomerSelected') });
            return;
        }

        setIsOpen(true);
    };

    const onCancel = () => setSelectedBasket({});

    return (
        <>
            <Tippy content="ثبت در سبد" className="text-xs">
                <button
                    onClick={openModal}
                    className="flex items-center h-8 justify-center w-8 bg-L-primary-100  rounded text-L-primary-50 dark:bg-D-primary-50 border-L-primary-50 dark:border-D-primary-50 border"
                >
                    <ModalBasketIcon className='w-6 h-6' />
                </button>
            </Tippy>


            <Modal isOpen={isOpen} onClose={toggleOpen} className="min-h-[25rem] w-[500px] rounded-md h-full grid">
                <div className="grid grid-rows-min-one-min gap-2 bg-L-basic dark:bg-D-basic">
                    <div className="w-full text-white font-medium  bg-L-blue-200 dark:bg-D-gray-400 h-10 flex items-center justify-between px-5">
                        <p>ثبت سفارش در سبد</p>
                        <CloseIcon onClick={toggleOpen} className="cursor-pointer" />
                    </div>
                    {selectedBasket.id ? (
                        <ConfirmOrder basketID={selectedBasket.id} basketName={selectedBasket.name || ''} onCancel={onCancel} />
                    ) : (
                        <div className="mx-4">
                            <div className="py-2 h-[fit-content]">
                                <div className="flex gap-2 pt-2">
                                    <InfoIcon />
                                    <p className="text-right text-xs text-L-gray-500 dark:text-D-gray-500">{t('Basket.InsertToBasketDescription')}</p>
                                </div>
                                <div className="max-h-[15rem] overflow-y-scroll">
                                    {listBasket &&
                                        listBasket
                                            // .filter((item) => item.isPinned)
                                            .map(({ id, name }) => (
                                                <div
                                                    key={id}
                                                    className="flex items-center justify-between my-4 text-L-gray-500 dark:text-D-gray-700 bg-L-gray-100 dark:bg-D-gray-100 border border-solid border-L-gray-400 dark:border-D-gray-400 rounded-lg p-2"
                                                >
                                                    <p>{name}</p>
                                                    <div
                                                        onClick={() => setSelectedBasket({ id, name })}
                                                        className="text-L-primary-50 dark:text-D-primary-50 rounded bg-L-basic dark:bg-D-basic drop-shadow cursor-pointer"
                                                    >
                                                        <PlusIcon width={16} height={16} />
                                                    </div>
                                                </div>
                                            ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {!selectedBasket.id && (
                        <div className="px-4">
                            <div className="flex items-center py-4 cursor-pointer w-fit select-none" onClick={() => setIsNewBasket((prev) => !prev)}>
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
                                    <CreateBasket toggleAddBasket={() => setIsNewBasket(false)} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default SetBasketAction;
