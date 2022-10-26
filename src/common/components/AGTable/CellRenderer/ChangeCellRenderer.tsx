import { ICellRendererParams } from 'ag-grid-community';
import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

type ChangeCellRendererProps = ICellRendererParams<unknown, string | number> & { tooltip: boolean };

const ChangeCellRenderer = ({ value, valueFormatted, tooltip = false }: ChangeCellRendererProps) => {
    const cellValue = Number(value || 0);

    const timer = useRef<NodeJS.Timeout | undefined>(undefined);
    const [changedValue, setChangedValue] = useState<number>(cellValue);

    useEffect(() => {
        console.log({ changedValue, cellValue });
        if (changedValue === cellValue) return;

        timer.current = setTimeout(() => setChangedValue(cellValue || 0), 2000);
    }, [cellValue, changedValue]);

    useEffect(
        () => () => {
            clearTimeout(timer.current);
        },
        [],
    );

    const iconRenderer = () => {
        if (cellValue > changedValue)
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="48"
                        d="M112 244l144-144 144 144M256 120v292"
                    />
                </svg>
            );
        if (cellValue < changedValue)
            return (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="48"
                        d="M112 268l144 144 144-144M256 392V100"
                    />
                </svg>
            );

        return null;
    };

    return (
        <div
            className={clsx('flex justify-center items-center dir-ltr w-full gap-8', {
                'text-L-success-150 dark:text-D-success-150': cellValue > changedValue,
                'text-L-error-150 dark:text-D-error-150': cellValue < changedValue,
            })}
        >
            <span
                className={clsx('text-center whitespace-nowrap  max-w-full', {
                    'font-extrabold': cellValue !== changedValue,
                })}
                style={{ width: 'calc(100% - 28px)' }}
            >
                {valueFormatted ?? 0}
            </span>

            <span style={{ width: '12px' }} className=" absolute right-8">
                {iconRenderer()}
            </span>
        </div>
    );
};

export default ChangeCellRenderer;
