import clsx from 'clsx';
import React, { useCallback, useMemo } from 'react';

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
            <div className="w-full flex items-center px-1 py-2 odd:bg-gray-100">
                {rowItems.map(({ key, label, value }) => (
                    <div key={key} className="flex items-center px-2" style={{ width: `${100 / cols}%` }}>
                        <span>{label}</span>
                        {applyDots && <span>:</span>}
                        <span className="mr-auto">{value}</span>
                    </div>
                ))}
            </div>
        ),
        [],
    );

    return (
        <div className="w-full border rounded-md text-xs">
            {Array.from({ length: rowCounts }, (_, i) => i).map((rowNum) => {
                return <Row key={rowNum} rowItems={items.slice(rowNum * cols, rowNum * cols + cols)} />;
            })}
        </div>
    );
};

export default DataDisplay;
