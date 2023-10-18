import React, { useState, useRef, forwardRef, useCallback, ChangeEvent, useEffect } from 'react';
import Input from '../Input';
import { createPortal } from 'react-dom';
import styles from './style.module.scss';
import clsx from 'clsx';
import { zeroPad } from 'src/utils/helpers';
import { getTheme } from 'src/redux/slices/ui';
import { useAppSelector } from 'src/redux/hooks';

type TimePickerProps = {
    onChange?: (x: string) => void;
};

const TimePicker = ({ onChange }: TimePickerProps) => {
    const [value, setValue] = useState<Record<'second' | 'minute' | 'hour', string>>({
        second: '00',
        minute: '00',
        hour: '00',
    });
    const [isClockOpen, setIsClockOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const clockRef = useRef<HTMLDivElement | undefined>(undefined);

    useEffect(() => {
        onChange && onChange(`${value.hour}:${value.minute}:${value.second}`);
    }, [value]);

    const onClickDocument = (e: MouseEvent) => {
        const containerEl = containerRef.current;
        const clockEl = clockRef.current;
        if (!containerEl || !clockEl) {
            setIsClockOpen(false);
            document.removeEventListener('mousedown', onClickDocument);
            return;
        }

        const target: Node = (e.target || e.currentTarget) as Node;
        if (target && !containerEl.contains(target) && !clockEl.contains(target)) {
            setIsClockOpen(false);
            document.removeEventListener('mousedown', onClickDocument);
        }
    };

    const openClock = () => {
        setIsClockOpen(true);
        document.addEventListener('mousedown', onClickDocument);
    };

    const onClockRefLoad = useCallback(
        (clock: HTMLDivElement) => {
            const containerEl = containerRef.current;
            if (!containerEl || !clock) return;

            clockRef.current = clock;

            const containerOffset = containerEl.getBoundingClientRect();

            clock.style.width = `clamp(250px, ${containerOffset.width + 'px'}, 250px)`;
            clock.style.left = containerOffset.left + 'px';

            clock.style.top = containerOffset.top + containerOffset.height + 1 + 'px';
        },
        [containerRef.current],
    );

    return (
        <div ref={containerRef} className="">
            <div className="text-xs">
                <Input disabled={false} value={`${value.second} : ${value.minute} : ${value.hour}`} onChange={() => {}} onFocus={openClock} />
            </div>

            {isClockOpen && createPortal(<DialogBox setValue={setValue} value={value} ref={onClockRefLoad} />, document.body)}
        </div>
    );
};

export default TimePicker;

type DialogBoxProps = {
    value: Record<'second' | 'minute' | 'hour', string>;
    setValue: React.Dispatch<React.SetStateAction<Record<'second' | 'minute' | 'hour', string>>>;
};
const DialogBox = forwardRef<HTMLDivElement, DialogBoxProps>(({ value, setValue }, ref) => {
    //
    const hourRef = useRef<HTMLDivElement>(null);
    const minRef = useRef<HTMLDivElement>(null);
    const secRef = useRef<HTMLDivElement>(null);

    const theme = useAppSelector(getTheme);

    const onSecondChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(e.target.value);
        if (!secRef.current) return;
        const secondsDegrees = (inputValue / 60) * 360 + 90;
        secRef.current.style.transform = `rotate(${secondsDegrees}deg)`;

        const second = inputValue > 59 ? '00' : inputValue < 0 ? '59' : zeroPad(inputValue);
        setValue((pre) => ({ ...pre, second }));
    };

    const onMinuteChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(e.target.value);
        if (!minRef.current) return;
        const minsDegrees = (inputValue / 60) * 360 + (+value?.second / 60) * 6 + 90;
        minRef.current.style.transform = `rotate(${minsDegrees}deg)`;

        const minute = inputValue > 59 ? '00' : inputValue < 0 ? '59' : zeroPad(inputValue);
        setValue((pre) => ({ ...pre, minute }));
    };

    const onHourChange = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = Number(e.target.value);
        if (!hourRef.current) return;
        const hourDegrees = (inputValue / 12) * 360 + (+value?.minute / 60) * 30 + 90;
        hourRef.current.style.transform = `rotate(${hourDegrees}deg)`;

        const hour = inputValue > 23 ? '00' : inputValue < 0 ? '23' : zeroPad(inputValue);
        setValue((pre) => ({ ...pre, hour }));
    };

    return (
        <div className={clsx(styles.root, theme === 'dark' && styles.dark)} ref={ref} onClick={(e) => e.stopPropagation()}>
            <div className={styles.clock}>
                <div className={styles.outerClockFace}>
                    <div className={clsx([styles.marking, styles.markingOne])}></div>
                    <div className={clsx([styles.marking, styles.markingTwo])}></div>
                    <div className={clsx([styles.marking, styles.markingThree])}></div>
                    <div className={clsx([styles.marking, styles.markingFour])}></div>

                    <div className={styles.innerClockFace}>
                        <span className={styles.brand}>RAMAND</span>
                    </div>

                    <div ref={hourRef} className={clsx([styles.hand, styles.hourHand])}></div>
                    <div ref={minRef} className={clsx([styles.hand, styles.minHand])}></div>
                    <div ref={secRef} className={clsx([styles.hand, styles.secondHand])}></div>
                </div>
            </div>

            <div className="flex w-full mt-6 relative items-center justify-evenly">
                <input className={styles.numberInput} type="number" value={value.second} onChange={onSecondChange} />
                <span>:</span>
                <input className={styles.numberInput} type="number" value={value.minute} onChange={onMinuteChange} />
                <span>:</span>
                <input className={styles.numberInput} type="number" value={value.hour} onChange={onHourChange} />
            </div>
        </div>
    );
});
DialogBox.displayName = 'DialogBox';
