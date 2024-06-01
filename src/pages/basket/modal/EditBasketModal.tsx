import { FC, useState } from 'react';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import { DateObject } from 'react-multi-date-picker';
import { useCardSendOrder, useDeleteBasket, useUpdateBasket } from 'src/app/queries/basket';
import AdvancedTimePickerAnalog from 'src/common/components/AdvancedTimePickerAnalog';
import Input from 'src/common/components/Input';
import Modal from 'src/common/components/Modal';
import { Check, CloseIcon, DeleteIcon, EditIcon2, Negetive, PlusIcon, SendIcon, UnCheck } from 'src/common/icons';
import { disableTillYesterday, getFarsiDate } from 'src/utils/helpers';
import CreateBasket from '../components/CreateBasket';
import AdvancedDatepicker from 'src/common/components/AdvancedDatePicker/AdvanceDatepicker';
import ipcMain from 'src/common/classes/IpcMain';


type IEditBasketModalType = {
    showEditForm: boolean;
    toggleEditBasket: () => void;
    listBasket: IListBasket[] | undefined;
};

const EditBasketModal: FC<IEditBasketModalType> = ({ showEditForm, toggleEditBasket, listBasket }) => {

    const [editMode, setEditMode] = useState<Partial<IListBasket> | undefined>(undefined);
    const [time, setTime] = useState<any>(null);
    const [ShowNewBasket, setNewBasket] = useState(false);

    const { mutate: mutateCardSendOrder } = useCardSendOrder();

    const handleChangeEditMode = (type: string, value: any) => {
        setEditMode((prev) => ({
            ...prev,
            [type]: value,
        }));
    };

    const { mutate: mutateDelete } = useDeleteBasket();

    const { mutate: mutateEdit } = useUpdateBasket();

    const handleEditBasket = () => {
        const date = new DateObject(editMode?.sendDate as any)?.convert(gregorian, gregorian_en).format('YYYY-MM-DD');
        const times = new DateObject(time)?.convert(gregorian, gregorian_en).format('HH:mm:ss');
        const dateTimeComposed = {
            sendDate: date + 'T' + times + '.000',
        };
        mutateEdit({ ...editMode, ...dateTimeComposed });
        setEditMode(undefined);
    };

    const submitCardSendOrder = (cartId: number) => {
        mutateCardSendOrder({
            cartId,
        })

        ipcMain.send('refetchBasket');
    }

    // const handleIsPinned = (id: number, value: boolean) => {
    //     mutateEdit({ isPinned: value, id });
    // };

    return (
        <Modal
            isOpen={showEditForm}
            onClose={toggleEditBasket}
            className="min-h-[20rem] w-[700px] rounded-md h-full grid bg-L-basic dark:bg-D-basic overflow-visible"
        >
            <div className="grid grid-rows-min-one ">
                <div className="w-full text-white font-semibold rounded-t-md bg-L-blue-200 dark:bg-D-blue-200 h-10 flex items-center justify-between px-5">
                    <div>ویرایش سبد</div>
                    <CloseIcon data-cy="basket-edit-close" onClick={toggleEditBasket} className="cursor-pointer" />
                </div>
                <div className="m-4 text-1.2 border-b border-L-gray-400 dark:border-D-gray-400">
                    <div className="flex bg-L-gray-200 dark:bg-D-gray-200 rounded-t-lg py-2 text-L-gray-600 dark:text-D-gray-600 font-semibold">
                        <div className="w-full flex items-center justify-center min-w-[160px]">عنوان دیده‌بان</div>
                        <div className="w-full flex items-center justify-center min-w-[130px]">تاریخ ارسال</div>
                        <div className="w-full flex items-center justify-center min-w-[130px]">زمان ارسال</div>
                        {/* <div className="w-full flex items-center justify-center">نمایش</div> */}
                        <div className="w-full flex items-center justify-center">عملیات</div>
                    </div>
                    <div className="h-[18rem] overflow-y-auto">
                        {listBasket &&
                            listBasket.map((basket: any) => (
                                <div
                                    key={basket.id}
                                    className="flex items-center gap-1 even:bg-L-gray-100 even:dark:bg-D-gray-100 text-L-gray-600 dark:text-D-gray-600"
                                >
                                    <div className="min-w-[160px] w-full h-full flex items-center justify-center">
                                        {editMode?.id === basket.id ? (
                                            <Input
                                                data-cy={'basket-item-edit-input-' + basket.name}
                                                value={editMode?.name}
                                                onChange={(e) => handleChangeEditMode('name', e.target.value)}
                                                autoFocus={true}
                                            />
                                        ) : (
                                            <span data-cy={'basket-item-title-' + basket.name} className="py-1.5 inline-block">
                                                {basket.name}
                                            </span>
                                        )}
                                    </div>
                                    <div className="min-w-[130px] w-full flex items-center justify-center ">
                                        {editMode?.id === basket.id ? (
                                            <AdvancedDatepicker
                                                dateIsDisabled={disableTillYesterday}
                                                value={editMode?.sendDate}
                                                onChange={(date) => handleChangeEditMode('sendDate', date)}
                                            />
                                        ) : (
                                            <span className="py-1.5 w-100 block">{basket.sendDate ? getFarsiDate(basket.sendDate).farsiDate : '-'}</span>
                                        )}
                                    </div>
                                    <div className="min-w-[130px] w-full flex items-center justify-center ">
                                        {editMode?.id === basket.id ? (
                                            <AdvancedTimePickerAnalog value={time} onChange={setTime} />
                                        ) : (
                                            <span className="py-1.5  w-100 block">{basket.sendDate ? getFarsiDate(basket.sendDate).time : '-'}</span>
                                        )}
                                    </div>

                                    <div className="w-full flex items-center justify-center gap-3 p-1.5">
                                        {editMode?.id === basket.id ? (
                                            <>
                                                <div
                                                    className="p-1 border border-L-success-200 dark:border-D-success-200 rounded-xl cursor-pointer"
                                                    onClick={handleEditBasket}
                                                    data-cy={'basket-item-edit-submit-' + basket.name}
                                                >
                                                    <Check className="text-L-success-200 dark:text-D-success-200" />
                                                </div>
                                                <div
                                                    className="p-1 border border-L-error-200 dark:border-D-error-200 rounded-xl cursor-pointer"
                                                    onClick={() => setEditMode(undefined)}
                                                    data-cy={'basket-item-edit-cancel-' + basket.name}
                                                >
                                                    <UnCheck className="text-L-error-200 dark:text-D-error-200" />
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <SendIcon
                                                    className="cursor-pointer"
                                                    onClick={() => submitCardSendOrder(basket.id)}
                                                />

                                                <EditIcon2
                                                    data-cy={'basket-item-edit-' + basket.name}
                                                    onClick={() => {
                                                        setEditMode(basket);
                                                        setTime(new Date(basket.sendDate));
                                                    }}
                                                    className="cursor-pointer"
                                                />
                                                <DeleteIcon
                                                    data-cy={'basket-item-delete-' + basket.name}
                                                    onClick={() => mutateDelete(basket.id)}
                                                    className="cursor-pointer"
                                                />
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-center py-4 cursor-pointer w-fit select-none" onClick={() => setNewBasket((prev) => !prev)}>
                    {!ShowNewBasket ? (
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
                <div dir="ltr" data-actived={ShowNewBasket} className="opacity-0 actived:opacity-100 h-0 actived:h-auto transition-all">
                    <div className="w-3/4">
                        <CreateBasket toggleAddBasket={toggleEditBasket} />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default EditBasketModal;
