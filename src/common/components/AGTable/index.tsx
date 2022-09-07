import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import React, { forwardRef, Ref, useCallback, useMemo } from 'react';

import { sepNumbers, abbreviateNumber } from 'src/utils/helpers';
import { AgGridLocalization } from 'src/utils/Locale/AgGridLocalization';
import { ColGroupDef, ColDef } from 'ag-grid-community';

export interface ColDefType<TData> extends Omit<ColDef<TData>, 'type'> {
    type?: 'sepratedNumber' | 'abbreviatedNumber';
}

export interface ColGroupDefType<TData> extends Omit<ColGroupDef<TData>, 'children'> {
    children: (ColDefType<TData> | ColGroupDefType<TData>)[];
}

interface Props<TData> extends AgGridReactProps<TData> {}

const AGTable = forwardRef<AgGridReact, Props<unknown>>(({ defaultColDef = {}, rowData = [], ...rest }, ref) => {
    //
    const isDarkMode = false;
    const containerStyle = useMemo((): React.CSSProperties => ({ height: '100%', width: '100%' }), []);
    const containerClassName = useMemo((): string => `ag-theme-alpine${isDarkMode ? '-dark' : ''}`, []);

    const ColumnTypes = useMemo((): { [key: string]: ColDef } => {
        return {
            sepratedNumber: { valueFormatter: ({ value }) => sepNumbers(value), cellStyle: { direction: 'ltr' } },
            abbreviatedNumber: { valueFormatter: ({ value }) => (value ? abbreviateNumber(value) : value) },
        };
    }, []);

    const DefaultColDef = useMemo((): ColDef => {
        return {
            minWidth: 100,
            suppressMovable: true,
            sortable: true,
            tooltipValueGetter: ({ value, valueFormatted, colDef }) => {
                if (colDef && colDef.hasOwnProperty('cellRenderer')) return '';
                return valueFormatted || value;
            },
            ...defaultColDef,
        };
    }, []);

    const onGridSizeChanged = useCallback(({ api }: any) => api.sizeColumnsToFit(), []);
    const onRowDataUpdated = useCallback(({ api }: any) => api.sizeColumnsToFit(), []);
    const onRowDataChanged = useCallback(({ api }: any) => api.sizeColumnsToFit(), []);
    const onFirstDataRendered = useCallback(({ api }: any) => api.sizeColumnsToFit(), []);

    return (
        <div className={containerClassName} style={containerStyle}>
            <AgGridReact
                ref={ref}
                enableRtl
                suppressCellFocus
                suppressRowClickSelection
                localeText={AgGridLocalization}
                enableBrowserTooltips
                enableCellTextSelection={false}
                scrollbarWidth={5}
                maintainColumnOrder
                suppressColumnVirtualisation
                //
                onGridSizeChanged={onGridSizeChanged}
                onRowDataUpdated={onRowDataUpdated}
                onRowDataChanged={onRowDataChanged}
                onFirstDataRendered={onFirstDataRendered}
                //
                columnTypes={ColumnTypes}
                defaultColDef={DefaultColDef}
                //
                rowData={rowData}
                {...rest}
            />
        </div>
    );
});

AGTable.displayName = 'AGTable';

export default AGTable as <TData extends unknown>(props: Props<TData> & { ref?: Ref<AgGridReact<TData>> }) => JSX.Element;
