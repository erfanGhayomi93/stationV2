import dayjs from 'dayjs';
import { FC, useEffect, useState } from 'react';
import { useCreateBasket } from 'src/app/queries/basket';
import { queryClient } from 'src/app/queryClient';
import AdvancedDatepicker from 'src/common/components/AdvancedDatePicker/AdvanceDatepicker';
import Input from 'src/common/components/Input';
import TimePicker from 'src/common/components/TimePicker';
import { onSuccessNotif } from 'src/handlers/notification';
import { disableTillYesterday } from 'src/utils/helpers';

type ICreateBasket = {
    toggleAddBasket: () => void;
};

const CreateBasket: FC<ICreateBasket> = ({ toggleAddBasket }) => {
    const [name, setName] = useState<string>('');
    const [date, setDate] = useState<Date | string>(new Date());
    const [time, setTime] = useState<string>();

    const { mutate: AddNewBasketReq } = useCreateBasket({
        onSuccess: (result) => {
            if (result) {
                queryClient.invalidateQueries(['BasketList']);
                toggleAddBasket();
                onSuccessNotif({
                    title: 'سبد با موفقیت اضافه شد.',
                });
            }
        },
    });

    const clearData = () => {
        setName('');
        setDate('');
        setTime('');
    };

    const AddNewBasket = () => {
        const dateMiladi = dayjs(date).format('YYYY/MM/DD');
        const sendDate = `${dateMiladi}T${time}.000`;
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
        <div dir="rtl" className="rounded-md border-L-gray-400 dark:border-D-gray-400 border p-4 text-right mb-4">
            <div className="flex gap-2 items-center mb-4">
                <p className="min-w-[75px] font-medium text-L-gray-500 dark:text-D-gray-700">نام سبد :</p>

                <Input data-cy="basket-create-input-name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex items-center gap-4">
                <div className="flex flex-1 gap-2 items-center">
                    <p className="min-w-[75px] font-medium text-L-gray-500 dark:text-D-gray-700">تاریخ ارسال :</p>
                    <div className="flex-1" data-cy="basket-create-input-date">
                        <AdvancedDatepicker placement="top" dateIsDisabled={disableTillYesterday} value={date} onChange={(date) => setDate(date)} />
                    </div>
                </div>
                <div className="flex flex-1 gap-2 items-center">
                    <p className="min-w-[75px] font-medium text-L-gray-500 dark:text-D-gray-700">زمان ارسال :</p>
                    <div className="flex-1" data-cy="basket-create-input-time">
                        <TimePicker onChange={(value) => setTime(value)} />
                    </div>
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
