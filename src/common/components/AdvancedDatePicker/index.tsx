import DatePicker, { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import InputIcon from 'react-multi-date-picker/components/input_icon';
import { FC, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { clearAllListeners } from '@reduxjs/toolkit';

export type DateType = DateObject | DateObject[] | null | string | undefined;
interface IAdvancedDatePicker<T> {
    value: T;
    onChange: (selectedDates: T) => void;
    className?: any;
}
const AdvancedDatePicker: FC<IAdvancedDatePicker<DateType>> = ({ value, onChange, className, ...props }) => {
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
            portal
            style={{ height: '32px' }}
            format="YYYY-MM-DD"
            containerClassName={'h-full w-full'}
            calendar={persian}
            locale={persian_fa}
            value={typeof value === 'string' ? new DateObject(value) : value}
            onChange={onChange}
            ref={calendarRef}
            render={
                <InputIcon
                    onClick={() => calendarRef.current.openCalendar()}
                    className={clsx(
                        'w-full py-2 bg-L-basic dark:bg-D-basic border-L-gray-350 dark:border-D-gray-350  text-L-gray-500 dark:text-D-gray-500 border cursor-default rounded pr-3 focus-visible:outline-none',
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
