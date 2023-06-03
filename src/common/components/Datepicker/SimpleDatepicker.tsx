import clsx from 'clsx';
import dayjs, { Dayjs } from 'dayjs';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarIcon } from 'src/common/icons';
import { zeroPad } from 'src/utils/helpers';
import styles from './Datepicker.module.scss';

type StaticComponentProps = Pick<SimpleDatepickerProps, 'classes'> & {
    label: string;
    disabled: boolean;
    onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    disable: boolean | undefined
};

const StaticComponent = ({ classes, label, disabled, onClick, disable }: StaticComponentProps) => (
    <div className={clsx(styles.datepicker, classes?.datepicker)}>
        <div data-testid="datepicker-toggler" className={clsx(styles.container, styles.noDate, classes?.container, {
            "cursor-pointer": !disable
        })} onClick={onClick}>
            <span
                data-testid="datepicker-label"
                className={clsx(styles.label, classes?.disabled, classes?.label, {
                    [styles.disabled]: disabled,
                })}
            >
                {label}
            </span>

            <span className={clsx(styles.icon, classes?.icon)}>
                <CalendarIcon width="24" height="24" />
            </span>
        </div>
    </div>
);

type SimpleDatepickerProps = {
    defaultValue?: Date | Record<'y' | 'm' | 'd', string | number | null>;
    open?: boolean;
    yearRange?: [number, number];
    disable?: boolean;
    classes?: Record<
        | 'datepicker'
        | 'select'
        | 'disabled'
        | 'empty'
        | 'children'
        | 'child'
        | 'inputGroup'
        | 'input'
        | 'submit'
        | 'label'
        | 'noDate'
        | 'container'
        | 'icon',
        ClassesValue | undefined
    >;
    onChange: (v: Date) => void;
};

const monthsOfYear = 'فروردین_اردیبهشت_خرداد_تیر_مرداد_شهریور_مهر_آبان_آذر_دی_بهمن_اسفند'.split('_');
const SimpleDatepicker = ({ open, defaultValue, yearRange, classes, disable, onChange }: SimpleDatepickerProps) => {
    const dialog = useRef<HTMLUListElement>(null);

    const { t } = useTranslation();

    const [isModifiedMode, setIsModifiedMode] = useState(open ?? false);

    const [input, setInput] = useState<null | Record<'y' | 'm' | 'd', number>>(null);

    const [openedList, setOpenedList] = useState<'month' | 'day' | 'year' | null>(null);

    const getMonthName = useMemo<string>(() => {
        if (!input) return '';

        const months = 'فروردین_اردیبهشت_خرداد_تیر_مرداد_شهریور_مهر_آبان_آذر_دی_بهمن_اسفند'.split('_');
        return months[input.m];
    }, [input?.m]);

    const updateDate = (name: 'year' | 'month' | 'date', v: number) => {
        let d = dayjs(new Date()).calendar('jalali');

        if (input) {
            if (name === 'date') d = d.month(input.m).year(input.y);
            else if (name === 'month') d = d.date(input.d).year(input.y);
            else if (name === 'year') d = d.date(input.d).month(input.m);
        }

        d = d.set(name, v);
        const res = { y: d.year(), m: d.month(), d: d.date() };

        setInput(res);
        setOpenedList(null);

        onChange(d.toDate());
    };

    const closeListOnDocumentClick = (e: MouseEvent, name: Exclude<typeof openedList, null>) => {
        const el = dialog.current;
        if (!el) return;

        if (!el.contains(e.target as Node)) {
            setOpenedList(null);
            document.removeEventListener('mousedown', (e) => closeListOnDocumentClick(e, name));
        }
    };

    const updateOpenedList = (name: Exclude<typeof openedList, null>) => {
        setOpenedList(openedList === name ? null : name);

        document.addEventListener('mousedown', (e) => closeListOnDocumentClick(e, name));
    };

    const renderDays = () => {
        let d = dayjs().calendar('jalali');
        if (input) d = d.year(input.y).month(input.m);

        const numberOfDays = d.daysInMonth();
        const days: JSX.Element[] = [];

        for (let i = 1; i <= numberOfDays; i++) {
            days.push(
                <li key={i} data-value={i} className={clsx(classes?.child)} onClick={() => onChangeDay(i)}>
                    {zeroPad(String(i))}
                </li>,
            );
        }

        return days;
    };

    const renderMonths = () => {
        const months: JSX.Element[] = [];

        for (let i = 0; i < 12; i++) {
            months.push(
                <li key={i} data-value={i} className={clsx(classes?.child)} onClick={() => onChangeMonth(i)}>
                    {monthsOfYear[i]}
                </li>,
            );
        }

        return months;
    };

    const renderYears = () => {
        const years: JSX.Element[] = [];

        let from = 0,
            to = 0;

        if (yearRange) {
            from = yearRange[0];
            to = yearRange[1];
        } else {
            const currentDate = new Date().getFullYear();
            from = currentDate - 10;
            to = currentDate + 10;
        }

        const d = dayjs();
        from = d.year(from).calendar('jalali').get('year');
        to = d.year(to).calendar('jalali').get('year');

        for (let i = from; i <= to; i++) {
            years.push(
                <li key={i} data-value={i} className={clsx(classes?.child)} onClick={() => onChangeYear(i)}>
                    {i}
                </li>,
            );
        }

        return years;
    };

    const onChangeDay = (v: number) => {
        updateDate('date', v);
    };

    const onChangeMonth = (v: number) => {
        updateDate('month', v);
    };

    const onChangeYear = (v: number) => {
        if (isNaN(v)) return;

        updateDate('year', v);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>, v: Date) => {
        e.preventDefault();

        console.log(v);

        setIsModifiedMode(false);
    };

    useEffect(() => {
        if (!defaultValue) return;

        let d: Date | Dayjs;
        if (defaultValue instanceof Date) {
            d = defaultValue;
        } else {
            const date = new Date();
            if (defaultValue.d) date.setDate(+defaultValue.d);
            if (defaultValue.m) date.setMonth(+defaultValue.m);
            if (defaultValue.y) date.setFullYear(+defaultValue.y);

            d = date;
        }

        d = dayjs(d).calendar('jalali');
        setInput({
            y: d.year(),
            m: d.month(),
            d: d.date(),
        });
    }, []);

    useEffect(() => {
        setIsModifiedMode(false);
        setInput(null);
    }, [disable]);

    if (!isModifiedMode)
        return (
            <StaticComponent
                label={input ? `${input.y} / ${zeroPad(String(input.m + 1))} / ${zeroPad(String(input.d))}` : t('datepicker.no_date_selected')}
                classes={classes}
                disabled={!input}
                onClick={() => !disable && setIsModifiedMode(true)}
                disable={disable}
            />
        );

    return (
        <div className={clsx(styles.datepicker, classes?.datepicker)}>
            <div className={clsx(styles.container, classes?.container)}>
                <form className={clsx(styles.inputGroup, classes?.inputGroup)} onSubmit={(e) => onSubmit(e, new Date())}>
                    <div className={clsx(styles.input, classes?.input)}>
                        <div className={clsx(styles.select, classes?.select)}>
                            <span
                                data-testid="datepicker-day-label"
                                className={clsx({ [styles.empty]: !input })}
                                onClick={() => updateOpenedList('day')}
                            >
                                {(input && zeroPad(String(input.d))) || t('datepicker.day')}
                            </span>

                            {openedList === 'day' && (
                                <ul data-testid="datepicker-day-children" ref={dialog} className={clsx(styles.children, classes?.children)}>
                                    {renderDays()}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className={clsx(styles.input, classes?.input)}>
                        <div className={clsx(styles.select, classes?.select)}>
                            <span
                                data-testid="datepicker-month-label"
                                className={clsx({ [styles.empty]: !input })}
                                onClick={() => updateOpenedList('month')}
                            >
                                {getMonthName || t('datepicker.month')}
                            </span>

                            {openedList === 'month' && (
                                <ul data-testid="datepicker-month-children" ref={dialog} className={clsx(styles.children, classes?.children)}>
                                    {renderMonths()}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className={clsx(styles.input, classes?.input)}>
                        <div className={clsx(styles.select, classes?.select)}>
                            <span
                                data-testid="datepicker-year-label"
                                className={clsx({ [styles.empty]: !input })}
                                onClick={() => updateOpenedList('year')}
                            >
                                {(input && input.y) || t('datepicker.year')}
                            </span>

                            {openedList === 'year' && (
                                <ul data-testid="datepicker-year-children" ref={dialog} className={clsx(styles.children, classes?.children)}>
                                    {renderYears()}
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className={clsx(styles.submit, classes?.submit)}>
                        <button data-testid="datepicker-submit" type="submit">
                            {t('datepicker.submit')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SimpleDatepicker;
