import { ChangeEvent, useEffect, useRef } from 'react';
import { ClearInputIcon } from 'src/common/icons';
import { seprateNumber } from 'src/utils/helpers';

type Props = {
    value?: number;
    onBlur: () => void;
    onClear: () => void;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onFinish: () => void;
};

const HeaderInput = ({ onBlur, onClear, onChange, onFinish, value }: Props) => {
    const ref = useRef<HTMLFormElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOutSideClick = (event: MouseEvent) => {
        if (ref?.current && !ref?.current?.contains(event.target as Node)) {
            onBlur();
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
        document.addEventListener('click', handleOutSideClick, true);
        return () => {
            onClear();
            document.removeEventListener('click', handleOutSideClick, true);
        };
    }, []);

    return (
        <form
            ref={ref}
            onSubmit={(e) => {
                e.preventDefault();
                onFinish();
                onBlur();
            }}
            className="w-full h-full border border-L-info-100 rounded-[6px] flex bg-white items-center pr-1"
        >
            <button type="button" onClick={onClear} className={value ? 'visible' : 'invisible'}>
                <ClearInputIcon height={15} width={15} />
            </button>

            <input
                ref={inputRef}
                className="w-full h-full rounded-[6px] outline-none px-1 ltr"
                value={value ? seprateNumber(value) : ''}
                onChange={onChange}
            />
        </form>
    );
};

export default HeaderInput;
