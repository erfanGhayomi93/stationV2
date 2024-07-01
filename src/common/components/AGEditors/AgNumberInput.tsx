import { ICellEditorParams } from 'ag-grid-community';
import { KeyboardEvent, forwardRef, useEffect, useRef, useState } from 'react';
import { seprateNumber, validNumber } from 'src/utils/helpers';
import { IData } from '../BuySellGroupModal';


interface IProps extends ICellEditorParams<IData> {
    onChangeCustomerData: (value: number, orderId: number) => void
}

const AgNumberInput = forwardRef(({ parseValue, stopEditing, onChangeCustomerData, data, value: oldValue }: IProps, ref) => {
    //
    const [value, setValue] = useState<number>(oldValue ?? 0);

    const containerRef = useRef<HTMLDivElement>(null);

    const inputRef = useRef<HTMLInputElement>(null);

    // useImperativeHandle(ref, () => {
    //     return {
    //         getValue() {
    //             return parseValue(value);
    //         },
    //     };
    // });

    const handleOnKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            inputRef.current?.blur()
        }
    }

    const handleOnBlur = () => {
        onChangeCustomerData ? onChangeCustomerData(value, data.orderId) : null
    }



    const handleClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
            stopEditing();
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
        document.addEventListener('click', handleClick, true);

        containerRef.current?.addEventListener('keydown', handleOnKeyDown as unknown as EventListener);
        return () => {
            document.addEventListener('click', handleClick, true);
            containerRef.current?.removeEventListener('keydown', handleOnKeyDown as unknown as EventListener);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-full flex flex-col overflow-visible">
            <input
                ref={inputRef}
                className="rounded-[6px] outline-none px-1 ltr"
                onChange={(e) => setValue(validNumber(e.target.value))}
                value={seprateNumber(value)}
                onBlur={handleOnBlur}
            />
        </div>
    );
});

AgNumberInput.displayName = 'AgNumberInput';

export default AgNumberInput;
