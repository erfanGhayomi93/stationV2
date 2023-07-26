import dayjs from 'dayjs';
import { useCallback, useRef } from 'react';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import DatePicker from 'react-multi-date-picker';
import { dateFormatter } from 'src/utils/helpers';
import Input from '../Input';

const CustomDatePicker = ({ value, onChange, readOnly }) => {
    //
    const calendarRef = useRef();
    const closeCalendar = () => {
        calendarRef.current && calendarRef.current.closeCalendar();
    };
    return (
        <DatePicker
            readOnly={readOnly}
            portal
            style={{ height: '32px' }}
            containerClassName={'h-full w-full'}
            calendar={persian}
            locale={persian_fa}
            value={value ? dayjs(value).calendar('jalali').format('YYYY/MM/DD') : ''}
            onChange={(dateObj) => (dateObj ? onChange(dayjs(dateObj).calendar('gregory').format('YYYY-MM-DDT00:00:00')) : onChange(null))}
            ref={calendarRef}
            onOpenPickNewDate={false}
            render={<DateInput closeCalendar={closeCalendar} readOnly={readOnly}/>}
            mapDays={({ date, today, isSameDate }) => {
                let props = {};
                return props;
            }}
        >
            <button
                onClick={() => {
                    onChange(dayjs().calendar('gregory').format('YYYY-MM-DDT00:00:00'));
                    calendarRef.current && calendarRef.current.closeCalendar();
                }}
                className="flex ml-3 bg-transparent text-secondary border-0 text-sm font-medium pb-2"
            >
                تاریخ امروز
            </button>
        </DatePicker>
    );
};

const DateInput = ({ value, handleValueChange, openCalendar, closeCalendar }) => {
    const onInputChange = useCallback((e) => {
        //
        const acceptable = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '/', '-'];

        const oldValue = e.target.value;
        const newValue = oldValue
            .split('')
            .filter((char) => acceptable.includes(char))
            .join('');

        e.target.value = dateFormatter(newValue);
        handleValueChange(e);
    }, []);
    return (
        <div className="w-full flex items-center rounded-md border overflow-hidden dark:focus-within:border-D-secondary-50 focus-within:border-L-secondary-50">
            <Input
                disabled={readOnly}
                value={value}
                onFocus={openCalendar}
                onChange={onInputChange}
                onKeyDown={(e) => ['Enter', 'Tab'].includes(e.key) && closeCalendar()}
            />
        </div>
    );
};

export default CustomDatePicker;
