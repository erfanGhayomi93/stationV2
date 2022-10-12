import DatePicker, { DateObject, Value } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import InputIcon from 'react-multi-date-picker/components/input_icon';
import { FC } from 'react';
import clsx from 'clsx';
interface IAdvancedDatePicker<T> {
    value: T;
    onChange: (selectedDates: T) => void;
    className?: any;
}
const AdvancedDatePicker: FC<IAdvancedDatePicker<DateObject | DateObject[] | null | string | undefined>> = ({ value, onChange, className, ...props }) => {
    return (
        <DatePicker
            portal
            style={{ height: '32px' }}
            format="YYYY-MM-DD"
            containerClassName={'h-full w-full'}
            calendar={persian}
            locale={persian_fa}
            value={typeof value === "string" ? new DateObject(value) : value}
            onChange={onChange}
            render={
                <InputIcon
                    className={clsx(
                        'w-full py-2 bg-L-basic dark:bg-D-basic border-L-gray-350 dark:border-D-gray-350 border cursor-default rounded pr-3 focus-visible:outline-none',
                        {
                            [className]: !!className,
                        },
                    )}
                />
            }
            {...props}
        >
            <button onClick={() => onChange(new DateObject())} className="flex ml-3 bg-transparent text-secondary border-0 text-sm font-medium pb-2">
                تاریخ امروز
            </button>
        </DatePicker>
    );
};

export default AdvancedDatePicker;
