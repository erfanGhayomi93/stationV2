import { ICellEditorParams } from 'ag-grid-community';
import React, { Dispatch, SetStateAction, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import CustomerMiniSelect from '../CustomerMiniSelect';

const AgCustomerSelect: React.FC<ICellEditorParams> = forwardRef((props, ref) => {
    //
    const [value, setValue] = useState<IGoMultiCustomerType[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(ref, () => {
        return {
            getValue() {
                return props.parseValue(value[0]);
            },
        };
    });
    const handleClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
            props.stopEditing();
        }
    };

    useEffect(() => {
        // document.addEventListener('click', handleClick, true);

        // return () => {
        //     document.addEventListener('click', handleClick, true);
        // };
    }, []);

    return (
        <div ref={containerRef} className="flex justify-center items-center">
            <CustomerMiniSelect selected={value} setSelected={(value) => setValue(value)} filterCustomerType={false} />
        </div>
    );
});

AgCustomerSelect.displayName = 'AgCustomerSelect';

export default AgCustomerSelect;
