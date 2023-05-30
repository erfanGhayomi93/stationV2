import clsx from 'clsx';
import { FC, useEffect, useRef } from 'react';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import AnalogTimePicker from 'react-multi-date-picker/plugins/analog_time_picker';
import InputIconTime from './InputIconTime';
interface IAdvancedTimePickerAnalog<T> {
    value: T;
    onChange: (selectedDates: T) => void;
    className?: any;
}
const AdvancedTimePickerAnalog: FC<IAdvancedTimePickerAnalog<DateObject | DateObject[] | null | string | undefined>> = ({
    value,
    onChange,
    className,
    ...props
}) => {
    const calendarRef = useRef<any>();

    useEffect(() => {
        function handler(e: any) {
            if (document?.querySelector('.rmdp-wrapper')?.contains(e?.target)) return;
            else calendarRef.current?.closeCalendar();
        }

        if (document) document.addEventListener('click', handler, { capture: true });

        return () => document.removeEventListener('click', handler, { capture: true });
    }, []);

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
                <InputIconTime
                    onClick={(e : Event) => {
                        e.preventDefault();
                        calendarRef.current.openCalendar();
                    }}
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
