import { ICellEditorParams } from 'ag-grid-community';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { seprateNumber, validNumber } from 'src/utils/helpers';

type Props = {};

const AgNumberInput = forwardRef((props: ICellEditorParams, ref) => {
    //
    const [value, setValue] = useState<number>();
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => {
        return {
            getValue() {
                return props.parseValue(value);
            },
        };
    });

    const handleClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
            props.stopEditing();
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
        // document.addEventListener('click', handleClick, true);
        // return () => {
        //     document.addEventListener('click', handleClick, true);
        // };
    }, []);

    return (
        <div ref={containerRef} className="relative w-full h-full flex flex-col overflow-visible">
            <input
                ref={inputRef}
                className="rounded-[6px] outline-none px-1 ltr"
                onChange={(e) => setValue(validNumber(e.target.value))}
                value={seprateNumber(value)}
            />
        </div>
    );
});

AgNumberInput.displayName = 'AgNumberInput';

export default AgNumberInput;
