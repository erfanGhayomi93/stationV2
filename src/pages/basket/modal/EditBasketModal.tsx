import Modal from 'src/common/components/Modal';
import { Check, CloseIcon, DeleteIcon, EditIcon2, Negetive, PlusIcon, UnCheck } from 'src/common/icons';
import Switcher from 'src/common/components/SwitchButton';
import { useState, FC } from 'react';
import { getFarsiDate } from 'src/utils/helpers';
import { useDeleteBasket, useUpdateBasket } from 'src/app/queries/basket';
import AdvancedDatePicker from 'src/common/components/AdvancedDatePicker';
import Input from 'src/common/components/Input';
import AdvancedTimePickerAnalog from 'src/common/components/AdvancedTimePickerAnalog';
import { DateObject } from 'react-multi-date-picker';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import gregorian from 'react-date-object/calendars/gregorian';
import CreateBasket from '../components/CreateBasket';

type IEditBasketModalType = {
    isEditActive: boolean;
    toggleEditBasket: () => void;
    listBasket: IListBasket[] | undefined;
};

const EditBasketModal: FC<IEditBasketModalType> = ({ isEditActive, toggleEditBasket, listBasket }) => {
    const [editMode, setEditMode] = useState<Partial<IListBasket> | undefined>(undefined);
    const [time, setTime] = useState<any>(null);
    const [isNewBasket, setisNewBasket] = useState(false);

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

    const handleIsPinned = (id: number, value: boolean) => {
        mutateEdit({ isPinned: value, id });
    };

    // const clickEnterName = (e: KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === 'Escape') {
    //         e.preventDefault();
    //         e.stopPropagation();
    //         setEditMode(undefined);
    //     }
    //     if (e.key === 'Enter' && editMode) {
    //         e.preventDefault();
    //         e.stopPropagation();
    //         handleEditBasket();
    //     }
    // };

    return (
        <>
            <Modal isOpen={isEditActive} onClose={toggleEditBasket} className="min-h-[20rem] w-[700px] rounded-md h-full grid bg-L-basic dark:bg-D-basic">
                <div className="grid grid-rows-min-one ">
                    <div className="w-full text-white font-semibold  bg-L-primary-50 dark:bg-D-gray-350 h-10 flex items-center justify-between px-5">
                        <div>ویرایش سبد</div>
                        <CloseIcon onClick={toggleEditBasket} className="cursor-pointer" />
                    </div>
                    <div className="m-4 text-1.2 border-b border-L-gray-350 dark:border-D-gray-350">
                        <div className="flex bg-L-gray-200 dark:bg-D-gray-200 rounded-t-lg py-2 text-L-gray-450 dark:text-D-gray-450 font-semibold">
                            <div className="w-full flex items-center justify-center min-w-[160px]">عنوان دیده‌بان</div>
                            <div className="w-full flex items-center justify-center min-w-[130px]">تاریخ ارسال</div>
                            <div className="w-full flex items-center justify-center min-w-[130px]">زمان ارسال</div>
                            <div className="w-full flex items-center justify-center">نمایش</div>
                            <div className="w-full flex items-center justify-center">عملیات</div>
                        </div>
                        <div className="h-[18rem] overflow-y-auto">
                            {listBasket &&
                                listBasket.map((basket: any) => (
                                    <div
                                        key={basket.id}
                                        className="flex items-center gap-1 even:bg-L-gray-200 even:dark:bg-D-gray-200 border-b last:border-none border-L-gray-300 text-L-gray-450 dark:text-D-gray-450"
                                    >
                                        <div className="min-w-[160px] w-full h-full flex items-center justify-center">
                                            {editMode?.id === basket.id ? (
                                                <div className="w-full h-full border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded mt-[2px]">
                                                    <Input
                                                        // className="text-center border border-L-gray-350 w-full h-full outline-L-primary-50"
                                                        value={editMode?.name}
                                                        onChange={(e) => handleChangeEditMode('name', e.target.value)}
                                                        // onKeyDownCapture={(e) => clickEnterName(e)}
                                                        autoFocus={true}
                                                        // onBlur={() => setEditMode(undefined)}
                                                    />
                                                </div>
                                            ) : (
                                                <span className="py-1.5 inline-block">{basket.name}</span>
                                            )}
                                        </div>
                                        <div className="min-w-[130px] w-full flex items-center justify-center ">
                                            {editMode?.id === basket.id ? (
                                                <AdvancedDatePicker
                                                    value={editMode?.sendDate}
                                                    onChange={(date) => handleChangeEditMode('sendDate', date)}
                                                />
                                            ) : (
                                                <span className="py-1.5 w-100 block">{getFarsiDate(basket.sendDate).farsiDate}</span>
                                            )}
                                        </div>
                                        <div className="min-w-[130px] w-full flex items-center justify-center ">
                                            {editMode?.id === basket.id ? (
                                                <AdvancedTimePickerAnalog value={time} onChange={setTime} />
                                            ) : (
                                                <span className="py-1.5  w-100 block">{getFarsiDate(basket.sendDate).time}</span>
                                            )}
                                        </div>
                                        <div className="w-full flex items-center justify-center py-1.5">
                                            <Switcher
                                                onCheck={(value: boolean) => {
                                                    editMode?.id === basket.id
                                                        ? handleChangeEditMode('isPinned', value)
                                                        : handleIsPinned(basket.id, value);
                                                }}
                                                value={editMode?.id === basket.id ? editMode?.isPinned : basket.isPinned}
                                            />
                                        </div>
                                        <div className="w-full flex items-center justify-center gap-3 p-1.5">
                                            {editMode?.id === basket.id ? (
                                                <>
                                                    <div
                                                        className="p-1 border border-L-success-150 dark:border-D-success-150 rounded-xl cursor-pointer"
                                                        onClick={handleEditBasket}
                                                    >
                                                        <Check className="text-L-success-150 dark:text-D-success-150" />
                                                    </div>
                                                    <div
                                                        className="p-1 border border-L-error-150 dark:border-D-error-150 rounded-xl cursor-pointer"
                                                        onClick={() => setEditMode(undefined)}
                                                    >
                                                        <UnCheck className="text-L-error-150 dark:text-D-error-150" />
                                                    </div>
                                                </>
                                            ) : (
                                                <>
                                                    <EditIcon2
                                                        onClick={() => {
                                                            setEditMode(basket);
                                                            setTime(new Date(basket.sendDate));
                                                        }}
                                                        className="cursor-pointer"
                                                    />
                                                    <DeleteIcon onClick={() => mutateDelete(basket.id)} className="cursor-pointer" />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                <div className="p-4">
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
                    <div dir="ltr" data-actived={isNewBasket} className="opacity-0 actived:opacity-100 h-0 actived:h-auto transition-all">
                        <div className="w-3/4">
                            <CreateBasket toggleAddBasket={toggleEditBasket} />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default EditBasketModal;
