import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import InputIcon from 'react-multi-date-picker/components/input_icon';
import { FC, useRef } from 'react';
import clsx from 'clsx';
import AnalogTimePicker from 'react-multi-date-picker/plugins/analog_time_picker';
interface IAdvancedTimePickerAnalog<T> {
    value: T;
    onChange: (selectedDates: T) => void;
    className?: any;
}
const AdvancedTimePickerAnalog: FC<IAdvancedTimePickerAnalog<DateObject | DateObject[] | null | string | undefined>> = ({ value, onChange, className, ...props }) => {
    const calendarRef = useRef<any>();

    return (
            <DatePicker
                disableDayPicker
                format="HH:mm:ss"
                plugins={[<AnalogTimePicker key={0} />]}
                portal
                style={{ height: '32px' }}
                containerClassName={'h-full w-full'}
                calendar={persian}
                locale={persian_fa}
                value={value}
                onChange={onChange}
                calendarPosition="bottom-right"
                ref={calendarRef}
                render={
                    <InputIcon
                        className={clsx(
                            'w-full py-2 bg-L-basic dark:bg-D-basic border-L-gray-350 dark:border-D-gray-350 border cursor-default rounded-lg pr-3 focus-visible:outline-none',
                            {
                                [className]: !!className,
                            },
                        )}
                    />
                }
                {...props}
            >
                <button
                    onClick={() => calendarRef.current.closeCalendar()}
                    className="flex ml-3 bg-transparent text-secondary border-0 text-sm font-medium pb-2"
                >
                    بستن
                </button>
            </DatePicker>
    );
};

export default AdvancedTimePickerAnalog;
