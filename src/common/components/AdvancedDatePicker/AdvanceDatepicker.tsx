import clsx from 'clsx';
import { AnglesLeftSVG, AnglesRightSVG, ArrowLeftSVG, ArrowRightSVG, CalendarIcon, CloseIcon } from 'src/common/icons';
import { weekDaysName, yearMonthsName } from 'src/constant/datepicker';
import dayjs from 'dayjs';
import { forwardRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';

import styles from './AdvanceDatepicker.module.scss';
import { useAppValues } from 'src/redux/hooks';
import { isBetween, getValidDate } from 'src/utils/helpers';

type DateValue = undefined | null | string | number | Date;

type AdvancedDatepickerProps = {
    clearable?: boolean;
    value: DateValue;
    placeholder?: string;
    weekDays?: string[];
    dateIsDisabled?: (date: Date) => boolean;
    classes?: Partial<
        Record<
            | 'datepicker'
            | 'opened'
            | 'dark'
            | 'active'
            | 'container'
            | 'labels'
            | 'input'
            | 'icon'
            | 'dialogBox'
            | 'switch'
            | 'switchIcon'
            | 'weekDays'
            | 'days'
            | 'day'
            | 'arrows'
            | 'date'
            | 'monthsRoot'
            | 'months'
            | 'month',
            ClassesValue | undefined
        >
    >;
    onChange: (date: Date) => void;
};

type DayType = {
    enable: boolean;
    weekInMonth: number | null;
    year: string | number;
    month: string | number | null;
    id: number;
    holiday: boolean;
    date: string | number | null;
};

const AdvancedDatepicker = ({ classes, value, dateIsDisabled, placeholder, onChange, weekDays = weekDaysName }: AdvancedDatepickerProps) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const datepickerRef = useRef<HTMLDivElement | undefined>(undefined);

    const { ui: theme } = useAppValues();

    const [focusing, setFocusing] = useState(false);

    const [inputValue, setInputValue] = useState('');

    const [visibleCalendar, setVisibleCalendar] = useState(false);

    const valueAsJalali = useMemo(() => {
        const d = value ? new Date(value) : new Date();
        return dayjs(d).calendar('jalali').format('YYYY / MM / DD');
    }, [value]);

    const onClickDocument = (e: MouseEvent) => {
        const rootEl = rootRef.current;
        const datepickerEl = datepickerRef.current;
        if (!rootEl || !datepickerEl) {
            setVisibleCalendar(false);
            document.removeEventListener('mousedown', onClickDocument);
            return;
        }

        const target: Node = (e.target || e.currentTarget) as Node;
        if (target && !datepickerEl.contains(target) && !rootEl.contains(target)) {
            setVisibleCalendar(false);
            document.removeEventListener('mousedown', onClickDocument);
        }
    };

    const onClickIcon = () => {
        const inputElement = inputRef.current;
        if (!inputElement) return;

        setInputValue('');
        inputElement.focus();

        openCalendar();
    };

    const onBlurInput = (value: string, blurInput = true) => {
        if (blurInput) setFocusing(false);

        value = value.replace(/\s/g, '');

        // @ts-ignore
        const d = dayjs(value, { jalali: true }).calendar('jalali');
        if (!d.isValid()) return;

        const asDate = d.toDate();

        const nYear = asDate.getFullYear();
        const currentYear = new Date().getFullYear();

        if (!isBetween(currentYear - 100, nYear, currentYear + 100)) return;

        if (dateIsDisabled) {
            if (!dateIsDisabled(asDate)) onChange(asDate);
        } else onChange(asDate);
    };

    const openCalendar = () => {
        setVisibleCalendar(true);
        setFocusing(true);
        document.addEventListener('mousedown', onClickDocument);
    };

    const onKeydown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        try {
            if (e.key === 'Enter') {
                onBlurInput(inputValue, false);
                return;
            }

            if (e.key === 'Tab') {
                setVisibleCalendar(false);
                return;
            }
        } catch (e) {
            console.log(e);
        }
    };

    const checkDateValue = (str: string, max: number) => {
        if (str.charAt(0) !== '0' || str === '00') {
            let num = Number(str);
            if (isNaN(num) || num <= 0 || num > max) num = 1;

            str = num > Number(max.toString().charAt(0)) && num.toString().length === 1 ? `0${num}` : num.toString();
        }

        return str;
    };

    const dateFormatter = (input: string) => {
        try {
            if (/\D\/$/.test(input)) input = input.substr(0, input.length - 3);

            const values = input.split('/').map((v) => {
                return v.replace(/\D/g, '');
            });

            if (values[1]) values[1] = checkDateValue(values[1], 12);
            if (values[2]) values[2] = checkDateValue(values[2], 31);

            const output = values.map((v, i) => {
                return (v.length === 4 && i === 0) || (v.length === 2 && i === 1) ? `${v} / ` : v;
            });

            return output.join('').substring(0, 14);
        } catch (e) {
            return '';
        }
    };

    const onDatepickerLoad = useCallback(
        (datepickerEl: HTMLDivElement) => {
            const rootEl = rootRef.current;
            if (!rootEl || !datepickerEl) return;

            datepickerRef.current = datepickerEl;

            const elRect = rootEl.getBoundingClientRect();
            datepickerEl.style.width = elRect.width + 'px';
            datepickerEl.style.left = elRect.left + 'px';
            datepickerEl.style.top = elRect.top + elRect.height + 1 + 'px';
        },
        [rootRef.current],
    );

    useEffect(() => {
        setInputValue(valueAsJalali);
    }, [valueAsJalali]);

    useEffect(() => {
        if (!focusing) {
            setInputValue(valueAsJalali);

            const eInput = inputRef.current;
            if (eInput) eInput.blur();
        }
    }, [focusing]);

    return (
        <div
            ref={rootRef}
            className={clsx(
                styles.datepicker,
                classes?.datepicker,
                visibleCalendar && [styles.opened, classes?.opened],
				//@ts-ignore
                theme === 'dark' && [styles.dark, classes?.dark],
            )}
        >
            <div className={clsx(styles.container, classes?.container)}>
                <div className={clsx(styles.labels, classes?.labels)}>
                    <input
                        type="text"
                        ref={inputRef}
                        className={clsx(styles.input, visibleCalendar && [styles.active, classes?.active], classes?.input)}
                        placeholder={placeholder || 'ــ / ــ / ــــ'}
                        value={focusing ? inputValue : valueAsJalali}
                        onKeyDown={onKeydown}
                        onChange={(e) => setInputValue(dateFormatter(e.target.value))}
                        onFocus={(e) => {
                            e.stopPropagation();
                            openCalendar();
                        }}
                        onBlur={(e) => onBlurInput(e.target.value)}
                    />

                    <span tabIndex={-1} role="button" onClick={onClickIcon} className={clsx(styles.icon, classes?.icon)}>
                        {!inputValue ? <CalendarIcon width="13" height="13" /> : <CloseIcon width="10" height="10" />}
                    </span>
                </div>
            </div>

            {visibleCalendar &&
                createPortal(
                    <DialogBox
                        ref={onDatepickerLoad}
                        value={value}
                        dateIsDisabled={dateIsDisabled}
                        weekDays={weekDays}
                        onChange={onChange}
                        onClose={() => setVisibleCalendar(false)}
                        defaultValue={value ? getValidDate(value) : null}
                    />,
                    document.body,
                )}
        </div>
    );
};

type DialogBoxProps = {
    value: DateValue;
    weekDays: string[];
    onClose: () => void;
    dateIsDisabled: ((date: Date) => boolean) | undefined;
    classes?: Partial<
        Record<
            | 'datepicker'
            | 'opened'
            | 'today'
            | 'dark'
            | 'active'
            | 'container'
            | 'labels'
            | 'input'
            | 'icon'
            | 'dialogBox'
            | 'switch'
            | 'switchIcon'
            | 'weekDays'
            | 'days'
            | 'day'
            | 'arrows'
            | 'date'
            | 'monthsRoot'
            | 'months'
            | 'month',
            ClassesValue | undefined
        >
    >;
    onChange: ((date: Date | null) => void) | ((date: Date) => void);
    defaultValue: Date | null;
};

const DialogBox = forwardRef<HTMLDivElement, DialogBoxProps>(({ classes, dateIsDisabled, defaultValue, weekDays, value, onChange, onClose }, ref) => {
    const { t } = useTranslation();

    const [datepickerValue, setDatepickerValue] = useState<Date>(defaultValue ?? new Date());

    const [mode, setMode] = useState<'month' | 'year' | null>(null);

    const { ui: theme } = useAppValues();

    const onEditDate = (method: 'add' | 'subtract', name: 'year' | 'month') => {
        if (!datepickerValue) return;

        const d = dayjs(datepickerValue).calendar('jalali')[method](1, name).toDate();
        setDatepickerValue(d);
    };

    const onClickDay = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, day: DayType): void => {
        e.stopPropagation();
        if (!day.enable) return;

        // @ts-ignore
        const isDisabled = dateIsDisabled?.(dayjs(`${day.year}/${day.month}/${day.date}`, { jalali: true }).calendar('jalali').toDate());
        if (isDisabled) return;

        // @ts-ignore
        const d = dayjs(`${day.year}/${day.month}/${day.date}`, { jalali: true }).calendar('jalali').toDate();

        onChange(d);
        onClose();
    };

    const onChangeMonth = (monthKey: number) => {
        if (!datepickerValue) return;

        const value = dayjs(datepickerValue).calendar('jalali').set('month', monthKey).toDate();

        setDatepickerValue(value);
        setMode(null);
    };

    const onChangeYear = (year: number) => {
        if (!datepickerValue) return;

        const value = dayjs(datepickerValue).calendar('jalali').set('year', year).toDate();

        setDatepickerValue(value);
        setMode(null);
    };

    const setTodayDate = () => {
        const d = new Date();

        onChange(d);
        setDatepickerValue(d);
    };

    const getDatepickerValue = useMemo(() => {
        if (!datepickerValue) return [];

        const d = dayjs(datepickerValue).locale('fa').calendar('jalali').format('YYYY MMMM DD');

        return d.split(' ');
    }, [datepickerValue]);

    const daysInMonth = useMemo(() => {
        if (!datepickerValue) return;
        /* 
		0: [0, 1, 2, 3, 4, 5, 6],
		1: [7, 8, 9, 10, 11, 12, 13],
		2: [14, 15, 16, 17, 18, 19, 20],
		3: [21, 22, 23, 24, 25, 26, 27],
		4: [28, 29, 30, 29 | 30 | 31]
		*/

        type WeekType = DayType[];
        const weeks: [WeekType, WeekType, WeekType, WeekType, WeekType, WeekType] = [Array(7), Array(7), Array(7), Array(7), Array(7), Array(7)];
        const d = dayjs(datepickerValue).locale('fa').calendar('jalali').date(1);
        //@ts-ignore
        const firstDayOfMonthWeekday = d.weekday();

        const daysInMonth = d.daysInMonth();

        const currentDate = d.format('YYYY/MM').split('/');
        for (let i = 0; i < daysInMonth + firstDayOfMonthWeekday; i++) {
            const weekNumber = Math.floor(i / 7);
            const weekday = i % 7;
            const isEnable = i >= firstDayOfMonthWeekday;

            const day = {
                enable: isEnable,
                weekInMonth: isEnable ? weekNumber : null,
                year: currentDate[0],
                month: isEnable ? currentDate[1] : null,
                holiday: !((i + 1) % 7),
                id: i,
                date: isEnable ? i - firstDayOfMonthWeekday + 1 : null,
            };

            weeks[weekNumber][weekday] = day;
        }

        return weeks;
    }, [datepickerValue]);

    const dateIsEqual = useCallback(
        (date: string) => {
            return dayjs(value).calendar('jalali').format('YYYY/MM/D') === date;
        },
        [value],
    );

    return (
        <div
            ref={ref}
            onClick={(e) => e.stopPropagation()}
            tabIndex={-1}
            role="button"
			//@ts-ignore
            className={clsx(styles.dialogBox, classes?.dialogBox, theme === "dark" && [styles.dark, classes?.dark], 'z-[10000]')}
        >
            <div className={clsx(styles.switch, classes?.switch)}>
                <div className={clsx(styles.arrows, classes?.arrows)}>
                    <button role="button" onClick={() => onEditDate('subtract', 'year')} type="button">
                        <AnglesRightSVG width="1.6rem" height="1.6rem" />
                    </button>

                    <button role="button" onClick={() => onEditDate('subtract', 'month')} type="button">
                        <ArrowRightSVG width="1.6rem" height="1.6rem" />
                    </button>
                </div>

                <div className={clsx(styles.date, classes?.date)}>
                    <button role="button" onClick={() => setMode('month')} type="button">
                        {getDatepickerValue && getDatepickerValue[1]}
                    </button>
                    <button role="button" onClick={() => setMode('year')} type="button">
                        {getDatepickerValue && getDatepickerValue[0]}
                    </button>
                </div>

                <div className={clsx(styles.arrows, classes?.arrows)}>
                    <button role="button" onClick={() => onEditDate('add', 'month')} type="button">
                        <ArrowLeftSVG width="1.6rem" height="1.6rem" />
                    </button>

                    <button role="button" onClick={() => onEditDate('add', 'year')} type="button">
                        <AnglesLeftSVG width="1.6rem" height="1.6rem" />
                    </button>
                </div>
            </div>

            <ul className={clsx(styles.weekDays, classes?.weekDays)}>
                {weekDays.map((day) => (
                    <li key={day}>{day}</li>
                ))}
            </ul>

            <ul className={clsx(styles.days, classes?.days)}>
                {daysInMonth &&
                    daysInMonth.map((week, key) => (
                        <li key={key}>
                            <ul>
                                {week.map((day) => (
                                    <li key={day.id}>
                                        <button
                                            role="button"
                                            type="button"
                                            onClick={(e) => onClickDay(e, day)}
                                            className={clsx(styles.day, classes?.day, {
                                                [styles.holiday]: day.holiday,
                                                // @ts-ignore
                                                [styles.disabled]: dateIsDisabled?.(
													//@ts-ignore
                                                    dayjs(`${day.year}/${day.month}/${day.date}`, { jalali: true }).calendar('jalali').toDate(),
                                                ),
                                                [styles.active]: dateIsEqual(`${day.year}/${day.month}/${day.date}`),
                                            })}
                                        >
                                            {day.date ?? ''}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
            </ul>

            <div className={clsx(styles.today, classes?.today)}>
                <button role="button" type="button" onClick={setTodayDate}>
                    {t('datepicker.today_date')}
                </button>
            </div>

            {mode === 'month' && (
                <Months
                    value={getDatepickerValue[1] ?? ''}
                    onChange={onChangeMonth}
                    onClose={() => setMode(null)}
                    classes={{
                        active: classes?.active,
                    }}
                />
            )}

            {mode === 'year' && (
                <Years
                    value={Number(getDatepickerValue[0] ?? 0)}
                    onChange={onChangeYear}
                    onClose={() => setMode(null)}
                    classes={{
                        active: classes?.active,
                    }}
                />
            )}
        </div>
    );
});

DialogBox.displayName = 'DialogBox';

type MonthsProps = {
    value: string;
    months?: string[];
    onChange: (arg: number) => void;
    onClose: () => void;
    classes?: Partial<Record<'list' | 'option' | 'selection' | 'active' | 'back', ClassesValue | undefined>>;
};
const Months = ({ onChange, onClose, value, classes, months = yearMonthsName }: MonthsProps) => (
    <div className={clsx(styles.selection, classes?.selection)}>
        <div className={clsx(styles.back, classes?.back)}>
            <button role="button" type="button" onClick={onClose}>
                <CloseIcon width="16" height="16" />
            </button>
        </div>

        <ul className={clsx(styles.list, classes?.list)}>
            {months.map((month, key) => (
                <li key={month}>
                    <button
                        role="button"
                        onClick={() => onChange(key)}
                        type="button"
                        className={clsx(styles.option, classes?.option, value === month && [styles.active, classes?.active])}
                    >
                        {month}
                    </button>
                </li>
            ))}
        </ul>
    </div>
);

type YearsProps = {
    value: number;
    onChange: (arg: number) => void;
    onClose: () => void;
    classes?: Partial<Record<'list' | 'option' | 'selection' | 'active' | 'back', ClassesValue | undefined>>;
};
const Years = ({ onChange, onClose, value, classes }: YearsProps) => {
    const availableYears = useMemo(() => {
        const yearAsNumber = Number(value);

        const years: number[] = [];
        for (let i = yearAsNumber - 15; i < yearAsNumber + 15; i++) {
            years.push(i);
        }

        return years;
    }, [value]);

    return (
        <div className={clsx(styles.selection, classes?.selection)}>
            <div className={clsx(styles.back, classes?.back)}>
                <button role="button" type="button" onClick={onClose}>
                    <CloseIcon width="16" height="16" />
                </button>
            </div>

            <ul className={clsx(styles.list, classes?.list)}>
                {availableYears.map((year) => (
                    <li key={year}>
                        <button
                            role="button"
                            type="button"
                            onClick={() => onChange(year)}
                            className={clsx(styles.option, classes?.option, value === year && [styles.active, classes?.active])}
                        >
                            {year}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdvancedDatepicker;
