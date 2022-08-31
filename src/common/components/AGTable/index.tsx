import { AgGridColumnProps, AgGridReact, AgGridReactProps } from 'ag-grid-react';
import React, { forwardRef, Ref, useCallback, useMemo } from 'react';

import { sepNumbers } from 'src/utils/helpers';
import { AgGridLocalization } from 'src/utils/Locale/AgGridLocalization';
import { ColGroupDef } from 'ag-grid-community';

export interface ColDefType extends Omit<AgGridColumnProps, 'type'> {
    type?: 'sepratedNumber';
}

export interface ColGroupDefType extends Omit<ColGroupDef, 'children'> {
    children: (ColDefType | ColGroupDefType)[];
}

interface Props extends AgGridReactProps {
    ref?: Ref<AgGridReact>;
}

const AGTable: React.FC<Props> = forwardRef(({ defaultColDef = {}, rowData = [], ...rest }, ref) => {
    //
    const isDarkMode = false;
    const containerStyle = useMemo((): React.CSSProperties => ({ height: '100%', width: '100%' }), []);
    const containerClassName = useMemo((): string => `ag-theme-alpine${isDarkMode ? '-dark' : ''}`, []);

    const ColumnTypes = useMemo((): { [key: string]: AgGridColumnProps } => {
        return {
            sepratedNumber: { valueFormatter: ({ value }) => sepNumbers(value), cellStyle: { direction: 'ltr' } },
        };
    }, []);

    const DefaultColDef = useMemo((): AgGridColumnProps => {
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
                scrollbarWidth={5}
                ref={ref}
                enableRtl
                suppressCellFocus
                suppressRowClickSelection
                localeText={AgGridLocalization}
                enableBrowserTooltips
                enableCellTextSelection={false}
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

export default React.memo(AGTable);
