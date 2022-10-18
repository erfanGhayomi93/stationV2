import React, { forwardRef, Ref, useCallback, useMemo } from 'react';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import { ColGroupDef, ColDef } from 'ag-grid-community';

import { seprateNumber, abbreviateNumber } from 'src/utils/helpers';
import { AgGridLocalization } from 'src/utils/Locale/AgGridLocalization';
import { useAppValues } from 'src/redux/hooks';
import dayjs from 'dayjs';

export interface ColDefType<TData> extends Omit<ColDef<TData>, 'type'> {
    type?: 'sepratedNumber' | 'abbreviatedNumber' | 'date';
}

export interface ColGroupDefType<TData> extends Omit<ColGroupDef<TData>, 'children'> {
    children: (ColDefType<TData> | ColGroupDefType<TData>)[];
}

interface Props<TData> extends AgGridReactProps<TData> {}

const AGTable = forwardRef<AgGridReact, Props<unknown>>(({ defaultColDef = {}, rowData = [], ...rest }, ref) => {
    //
    const {
        ui: { theme },
    } = useAppValues();

    const containerStyle = useMemo((): React.CSSProperties => ({ height: '100%', width: '100%' }), []);
    const containerClassName = useMemo((): string => `ag-theme-alpine${theme === 'dark' ? '-dark' : ''}`, [theme]);

    const ColumnTypes = useMemo((): { [key: string]: ColDef } => {
        return {
            sepratedNumber: { valueFormatter: ({ value }) => seprateNumber(value), cellStyle: { direction: 'ltr' } },
            abbreviatedNumber: { valueFormatter: ({ value }) => (value ? abbreviateNumber(value) : value) },
            date: { valueFormatter: ({ value }) => (value ? dayjs(value).calendar('jalali').format('YYYY-MM-DD   HH:mm:ss') : value) },
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
                scrollbarWidth={5}
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
