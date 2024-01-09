import clsx from 'clsx';
import { useCallback, useMemo } from 'react';

type Item = { key: number | string; label: string; value: string | number };

interface Props {
    items: Item[];
    cols: 2 | 3;
    applyDots?: boolean;
}

const DataDisplay = ({ cols, items, applyDots = true }: Props) => {
    //
    const rowCounts = useMemo(() => {
        return items?.length && cols ? Math.ceil(items?.length / cols) : 0;
    }, [cols, items.length]);

    const Row = useCallback(
        ({ rowItems }: { rowItems: Item[] }) => (
            <div className="w-full flex items-center px-1 py-2 odd:bg-L-gray-100 dark:odd:bg-D-gray-100 text-L-gray-700 dark:text-D-gray-700 ">
                {rowItems.map(({ key, label, value }) => (
                    <div key={key} className="flex items-center px-2 border-l last:border-none border-L-gray-400 dark:border-D-gray-400" style={{ width: `${100 / cols}%` }}>
                        <span>{label}</span>
                        {applyDots && <span>:</span>}
                        <span className="mr-auto ltr">{value}</span>
                    </div>
                ))}
            </div>
        ),
        [],
    );

    return (
        <div className="w-full rounded-md text-xs overflow-hidden">
            {Array.from({ length: rowCounts }, (_, i) => i).map((rowNum) => {
                return <Row key={rowNum} rowItems={items.slice(rowNum * cols, rowNum * cols + cols)} />;
            })}
        </div>
    );
};

export default DataDisplay;
