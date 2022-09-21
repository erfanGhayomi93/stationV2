import DatePicker, { DateObject, Value } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import InputIcon from 'react-multi-date-picker/components/input_icon';
import { FC } from 'react';
interface IAdvancedDatePicker {
    value: Value;
    onChange?: (selectedDates: DateObject | DateObject[] | null) => void;
    goToday: () => void;
}
const AdvancedDatePicker: FC<IAdvancedDatePicker> = ({ value, onChange, goToday, ...props }) => {
    return (
        <DatePicker
            portal
            style={{ height: '32px' }}
            containerClassName="h-full w-full"
            className=""
            calendar={persian}
            locale={persian_fa}
            value={value}
            onChange={onChange}
            render={
                <InputIcon className="py-2  bg-L-basic dark:bg-D-basic border-L-gray-350 dark:border-D-gray-350 border cursor-default rounded-lg pr-3  " />
            }
            {...props}
        >
            <button onClick={goToday} className="flex ml-3 bg-transparent text-secondary border-0 text-sm font-medium pb-2">
                تاریخ امروز
            </button>
        </DatePicker>
    );
};

export default AdvancedDatePicker;
