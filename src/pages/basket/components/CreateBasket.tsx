import { FC, useEffect, useState } from 'react';
import gregorian from 'react-date-object/calendars/gregorian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import { useCreateBasket } from 'src/app/queries/basket';
import { queryClient } from 'src/app/queryClient';
import AdvancedDatePicker from 'src/common/components/AdvancedDatePicker';
import AdvancedTimePicker from 'src/common/components/AdvancedTimePickerAnalog';
import Input from 'src/common/components/Input';
import { onSuccessNotif } from 'src/handlers/notification';
type ICreateBasket = {
    toggleAddBasket: () => void;
};

const CreateBasket: FC<ICreateBasket> = ({ toggleAddBasket }) => {
    const [name, setname] = useState<string>('');
    const [date, setdata] = useState<any>(null);
    const [time, settime] = useState<any>(null);

    const { mutate: AddNewBasketReq } = useCreateBasket({
        onSuccess: (result) => {
            if (result) {
                queryClient.invalidateQueries(['BasketList']);
                toggleAddBasket();
                onSuccessNotif({
                    title: 'سبد با موفقیت اضافه شد.'
                })
            }
        },
    });

    const clearData = () => {
        setname('');
        setdata(null);
        settime(null);
    };

    const AddNewBasket = () => {
        const dateMiladi = date?.convert(gregorian, gregorian_en).toString();
        const timeMiladi = time?.convert(gregorian, gregorian_en).toString();
        const sendDate = `${dateMiladi}T${timeMiladi}.000`;
        // const queryParams = '?name=' + name + '&sendDate=' + sendDate;
        const queryParams = { name, sendDate };

        AddNewBasketReq(queryParams);
        clearData();
    };

    useEffect(() => {
        return () => {
            clearData();
        };
    }, []);

    return (
        <div dir="rtl" className="rounded-md border-L-gray-350 dark:border-D-gray-350 border p-4 text-right mb-4">
            <div className="flex items-center mb-4">
                <p className="min-w-[100px] font-medium text-L-gray-500 dark:text-D-gray-500">نام سبد :</p>
                <div className="border-L-gray-350 dark:border-D-gray-350 border overflow-hidden rounded flex-1">
                    <Input data-cy="basket-create-input-name" value={name} onChange={(e) => setname(e.target.value)} />
                </div>
            </div>
            <div className="flex items-center mb-4">
                <p className="min-w-[100px] font-medium text-L-gray-500 dark:text-D-gray-500">تاریخ ارسال :</p>
                <div className="flex-1" data-cy="basket-create-input-date">
                    <AdvancedDatePicker value={date} onChange={(date) => setdata(date)} className="text-L-gray-400 dark:text-D-gray-400" />
                </div>
            </div>
            <div className="flex items-center">
                <p className="min-w-[100px] font-medium text-L-gray-500 dark:text-D-gray-500">زمان ارسال :</p>
                <div className="flex-1" data-cy="basket-create-input-time">
                    <AdvancedTimePicker
                        value={time}
                        onChange={(date) => {
                            settime(date);
                        }}
                        className="text-L-gray-400 dark:text-D-gray-400"
                    />
                </div>
            </div>
            <div dir="ltr" className="flex mt-7">
                <button
                    data-cy="basket-create-new"
                    onClick={AddNewBasket}
                    className="px-10 py-1 mr-2 rounded border border-L-primary-50 dark:border-D-primary-50 text-L-basic dark:text-D-basic bg-L-primary-50 dark:bg-D-primary-50"
                >
                    ثبت سبد
                </button>

                <button
                    onClick={toggleAddBasket}
                    className="px-4 py-1 rounded border border-L-primary-50 dark:border-D-primary-50 text-L-primary-50 dark:text-D-primary-50 bg-L-primary-100 dark:bg-D-primary-100"
                >
                    انصراف
                </button>
            </div>
        </div>
    );
};

export default CreateBasket;
