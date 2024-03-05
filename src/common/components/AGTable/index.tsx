import { ColDef, ColGroupDef, ColumnVisibleEvent, FirstDataRenderedEvent, GridSizeChangedEvent, RowValueChangedEvent } from 'ag-grid-community';
import { AgGridReact, AgGridReactProps } from 'ag-grid-react';
import React, { forwardRef, Ref, useCallback, useMemo } from 'react';
import ReactDOMServer from 'react-dom/server';

import dayjs from 'dayjs';
import { DragIcon } from 'src/common/icons';
import { useAppSelector } from 'src/redux/hooks';
import { abbreviateNumber, seprateNumber } from 'src/utils/helpers';
import { AgGridLocalization } from 'src/utils/Locale/AgGridLocalization';
import { useTranslation } from 'react-i18next';
import { getTheme } from 'src/redux/slices/ui';

export interface ColDefType<TData> extends Omit<ColDef<TData>, 'type'> {
    type?: 'sepratedNumber' | 'abbreviatedNumber' | 'date' | 'agTableIndex' | 'dateWithoutTime';
}

export interface ColGroupDefType<TData> extends Omit<ColGroupDef<TData>, 'children'> {
    children: (ColDefType<TData> | ColGroupDefType<TData>)[];
}

interface Props<TData> extends AgGridReactProps<TData> {
    agGridTheme?: 'balham' | 'alpine';
}

const AGTable = forwardRef<AgGridReact, Props<unknown>>(({ defaultColDef = {}, rowData = [], agGridTheme = 'alpine', ...rest }, ref) => {
    //
    const { t } = useTranslation();
    const theme = useAppSelector(getTheme);

    const containerStyle = useMemo((): React.CSSProperties => ({ height: '100%', width: '100%', position: 'relative' }), []);
    const containerClassName = useMemo((): string => `ag-theme-${agGridTheme}${theme === 'dark' ? '-dark' : ''}`, [theme]);

    const ColumnTypes = useMemo((): { [key: string]: ColDef } => {
        return {
            sepratedNumber: { valueFormatter: ({ value }) => seprateNumber(value), cellStyle: { direction: 'ltr' } },
            abbreviatedNumber: { valueFormatter: ({ value }) => (value ? abbreviateNumber(value) : value) },
            date: {
                valueFormatter: ({ value }) => (dayjs(value).isValid() ? dayjs(value).calendar('jalali').format('HH:mm:ss   YYYY-MM-DD') : value),
            },
            dateWithoutTime: {
                valueFormatter: ({ value }) => (dayjs(value).isValid() ? dayjs(value).calendar('jalali').format('YYYY-MM-DD') : value),
            },
        };
    }, []);

    const DefaultColDef = useMemo((): ColDef => {
        return {
            minWidth: 100,
            suppressMovable: true,
            sortable: true,
            flex: 1,
            tooltipValueGetter: ({ value, valueFormatted, colDef }) => {
                if (colDef && colDef.hasOwnProperty('cellRenderer')) return '';
                return valueFormatted || value;
            },
            ...defaultColDef,
        };
    }, []);

    // const onGridSizeChanged = useCallback(({ api }: GridSizeChangedEvent) => api?.sizeColumnsToFit(), []);
    // const onRowDataUpdated = useCallback(({ api }: GridSizeChangedEvent) => api?.sizeColumnsToFit(), []);
    // const onRowValueChanged = useCallback(({ api }: RowValueChangedEvent<unknown>) => api?.sizeColumnsToFit(), []);
    // const onFirstDataRendered = useCallback(({ api }: FirstDataRenderedEvent) => api?.sizeColumnsToFit(), []);

    const onColumnVisible = useCallback(({ api, column }: ColumnVisibleEvent) => {
        setTimeout(() => {
            try {
                if (!column) return;
                const colId = column.getColId();
                api.flashCells({
                    columns: [colId],
                });
            } catch (e) {
                //
            }
        });
    }, []);

    return (
        <div className={containerClassName} style={containerStyle}>
            <AgGridReact
                ref={ref}
                rowModelType="clientSide"
                enableRtl
                suppressCellFocus
                suppressAnimationFrame
                suppressScrollOnNewData
                suppressRowClickSelection
                suppressDragLeaveHidesColumns
                rowBuffer={5}
                localeText={AgGridLocalization}
                animateRows
                enableBrowserTooltips
                scrollbarWidth={5}
                suppressColumnVirtualisation
                //
                // onGridSizeChanged={onGridSizeChanged}
                // onRowDataUpdated={onRowDataUpdated}
                // onRowDataChanged={onRowDataChanged}
                //'onRowDataChanged' is deprecated.
                // onRowValueChanged={onRowValueChanged}
                // onFirstDataRendered={onFirstDataRendered}
                onColumnVisible={onColumnVisible}
                //
                columnTypes={ColumnTypes}
                defaultColDef={DefaultColDef}
                //
                rowData={rowData}
                icons={{
                    rowDrag: ReactDOMServer.renderToString(<DragIcon />),
                }}
                {...rest}
            />
        </div>
    );
});

AGTable.displayName = 'AGTable';

export default AGTable as <TData extends unknown>(props: Props<TData> & { ref?: Ref<AgGridReact<TData>> }) => JSX.Element;
