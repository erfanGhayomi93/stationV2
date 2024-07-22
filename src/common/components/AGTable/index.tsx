import {
    ColDef,
    ColGroupDef,
    ColTypeDef,
    ColumnVisibleEvent,
    FirstDataRenderedEvent,
    GridSizeChangedEvent,
    RowValueChangedEvent,
} from 'ag-grid-community';
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
    type?: 'rowSelect' | 'sepratedNumber' | 'abbreviatedNumber' | 'date' | 'agTableIndex' | 'dateWithoutTime';
}

export interface ColGroupDefType<TData> extends Omit<ColGroupDef<TData>, 'children'> {
    children: (ColDefType<TData> | ColGroupDefType<TData>)[];
}

interface Props<TData> extends AgGridReactProps<TData> {
    agGridTheme?: 'balham' | 'alpine';
}

const AGTable = forwardRef<AgGridReact, Props<unknown>>(
    ({ defaultColDef = {}, rowData = [], agGridTheme = 'alpine', ...rest }, ref) => {
        const { t } = useTranslation();
        const theme = useAppSelector(getTheme);

        const containerStyle = useMemo((): React.CSSProperties => ({ height: '100%', width: '100%', position: 'relative'}), []);
        const containerClassName = useMemo(
            (): string => `app-ag-table ag-theme-${agGridTheme}${theme === 'dark' ? '-dark' : ''}`,
            [theme]
        );

        const ColumnTypes = useMemo((): { [key: string]: ColTypeDef<unknown> } => {
            return {
                rowSelect: {
                    sortable: false,
                    checkboxSelection: true,
                    headerCheckboxSelection: true,
                    minWidth: 35,
                    maxWidth: 35,
                },
                sepratedNumber: {
                    valueFormatter: ({ value }) => seprateNumber(value),
                    cellStyle: { direction: 'ltr' },
                },
                abbreviatedNumber: {
                    valueFormatter: ({ value }) => (value ? abbreviateNumber(value) : value),
                },
                date: {
                    valueFormatter: ({ value }) =>
                        dayjs(value).isValid()
                            ? dayjs(value).calendar('jalali').format('HH:mm:ss   YYYY-MM-DD')
                            : value,
                },
                dateWithoutTime: {
                    valueFormatter: ({ value }) =>
                        dayjs(value).isValid() ? dayjs(value).calendar('jalali').format('YYYY-MM-DD') : value,
                },
                agTableIndex: {
                    valueGetter: 'node.rowIndex + 1',
                    cellRenderer: 'agGroupCellRenderer',
                }
            };
        }, []);

        const DefaultColDef = useMemo((): ColDef => {
            return {
                minWidth: 100,
                suppressMovable: false,
                sortable: true,
                flex: 1,
                resizable: false,
                tooltipValueGetter: ({ value, valueFormatted, colDef }) => {
                    if (colDef && colDef.hasOwnProperty('cellRenderer')) return '';
                    return valueFormatted || value;
                },
                ...defaultColDef,
            };
        }, [defaultColDef]);

        // const onGridSizeChanged = useCallback(({ api }: GridSizeChangedEvent) => api?.sizeColumnsToFit(), []);
        const onRowDataUpdated = useCallback(({ api }: GridSizeChangedEvent) => api?.sizeColumnsToFit(), []);
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

     const getHeightsForTables = (): Record<'rowHeight' | 'headerHeight', number> => {
            try {
                const rowHeight = 40;
                const headerHeight = 32;
        
                return { rowHeight, headerHeight };
            } catch (e) {
                return { rowHeight: 40, headerHeight: 32 };
            }
        };

        const { rowHeight, headerHeight } = useMemo(() => getHeightsForTables(), []);


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
                    // suppressDragLeaveHidesColumns
                    rowBuffer={5}
                    localeText={AgGridLocalization}
                    animateRows
                    enableBrowserTooltips
                    scrollbarWidth={5}
                    suppressColumnVirtualisation
                    rowHeight={rowHeight}
                    headerHeight={headerHeight}


                    // onGridSizeChanged={onGridSizeChanged}
                    onRowDataUpdated={onRowDataUpdated}
                    // onRowDataChanged={onRowDataChanged} // Deprecated
                    // onRowValueChanged={onRowValueChanged}
                    // onFirstDataRendered={onFirstDataRendered}
                    onColumnVisible={onColumnVisible}
                    //
                    columnTypes={ColumnTypes}
                    defaultColDef={DefaultColDef}
                    //
                    rowData={rowData}
                    // icons={{
                    //     rowDrag: ReactDOMServer.renderToString(<DragIcon />),
                    // }}
                    {...rest}
                />
            </div>
        );
    }
);

AGTable.displayName = 'AGTable';

export default AGTable as <TData extends unknown>(props: Props<TData> & { ref?: Ref<AgGridReact<TData>> }) => JSX.Element;
