import { FC, useCallback, useRef } from 'react';
import gregorian from 'react-date-object/calendars/gregorian';
import persian from 'react-date-object/calendars/persian';
import gregorian_en from 'react-date-object/locales/gregorian_en';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker, { DateObject } from 'react-multi-date-picker';
import { dateFormatter } from 'src/utils/helpers';
import Input from '../Input';

export type DateType = Date | DateObject | DateObject[] | null | string | undefined;
interface IAdvancedDatePicker<T> {
    value: T;
    onChange: (selectedDates: T) => void;
    className?: any;
    readonly?: boolean;
    disableBefore?: T;
}
const AdvancedDatePicker: FC<IAdvancedDatePicker<DateType>> = ({ value, onChange, className, disableBefore = null, readonly = false, ...props }) => {
    //
    const calendarRef = useRef<any>();
    const closeCalendar = () => {
        calendarRef.current && calendarRef.current.closeCalendar();
    };
    return (
        <DatePicker
            portal
            readOnly={readonly}
            ref={calendarRef}
            style={{ height: '32px' }}
            format="YYYY/MM/DD"
            containerClassName={'h-full w-full'}
            calendar={persian}
            locale={persian_fa}
            value={typeof value === 'string' ? new DateObject(value) : value}
            onOpenPickNewDate={false}
            onChange={(value) => {
                if (value instanceof DateObject) {
                    onChange(value.convert(gregorian, gregorian_en).toString());
                }
            }}
            mapDays={({ date, isSameDate }) => {
                let props: { disabled?: boolean } = {};

                return props;
            }}
            render={<DatePickerInput closeCalendar={closeCalendar} disabled={readonly} />}
            {...props}
        >
            <button
                onClick={() => {
                    onChange(new DateObject().convert(gregorian, gregorian_en).toString());
                    closeCalendar();
                }}
                className="flex ml-3 bg-transparent text-secondary border-0 text-sm font-medium pb-2"
            >
                تاریخ امروز
            </button>
        </DatePicker>
    );
};

const DatePickerInput = ({ value, openCalendar, handleValueChange, closeCalendar, disabled }: any) => {
    //
    const onInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const acceptable = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '/', '-'];

        const oldValue = e.target.value;
        const newValue = oldValue
            .split('')
            .filter((char) => acceptable.includes(char))
            .join('');

        e.target.value = dateFormatter(newValue);
        handleValueChange && handleValueChange(e);
    }, []);
    return (
        <div className="w-full flex items-center rounded-md border overflow-hidden dark:focus-within:border-D-secondary-50 focus-within:border-L-secondary-50">
            <Input
                disabled={disabled}
                value={value}
                onFocus={openCalendar}
                onChange={onInputChange}
                onKeyDown={(e) => ['Enter', 'Tab'].includes(e.key) && closeCalendar()}
            />
        </div>
    );
};

export default AdvancedDatePicker;
