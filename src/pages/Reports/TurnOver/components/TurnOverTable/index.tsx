import { GridApi, RowClassParams, RowDataUpdatedEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import WidgetLoading from 'src/common/components/WidgetLoading';
interface ITurnOverTableType {
    data: IGetCustomerTurnOverResponse | undefined;
    pageNumber: number;
    pagesize: number;
    loading: boolean;
    PaginatorHandler: (action: 'PageNumber' | 'PageSize', value: number) => void;
}

const TurnOverTable = ({ data, pageNumber, pagesize, PaginatorHandler, loading }: ITurnOverTableType) => {
    //
    const { t } = useTranslation();
    const gridRef = useRef<AgGridReact>(null);
    const [rowData, setRowData] = useState<IGetCustomerTurnOverResultType[]>([]);

    const Columns = useMemo(
        (): ColDefType<IGetCustomerTurnOverResultType>[] => [
            {
                headerName: t('ag_columns_headerName.row'),
                minWidth: 60,
                maxWidth: 80,
                valueFormatter: ({ node }) => (node?.isRowPinned() ? '-' : String((pageNumber - 1) * pagesize + node?.rowIndex! + 1)),
            },
            {
                headerName: t('ag_columns_headerName.date'),
                field: 'dateTime',
                type: 'date',
                valueGetter: ({ node, data }) => (node?.isRowPinned() ? '-' : data?.dateTime),
            },
            { headerName: t('ag_columns_headerName.actions'), field: 'side', valueFormatter: ({ value }) => t('TransactionTypes.' + value) },
            { headerName: t('ag_columns_headerName.transactionDesc'), field: 'description', type: 'sepratedNumber', minWidth: 350 },
            { headerName: t('ag_columns_headerName.debit'), field: 'debit', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.credit'), field: 'credit', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.remain'), field: 'remaining', type: 'sepratedNumber' },
        ],
        [pageNumber, pagesize],
    );

    useEffect(() => {
        //
        if (!gridRef.current) return;
        const { result } = data ?? {};
        if (Array.isArray(result)) {
            const sumRow = result.pop(); //جمع سطرها
            const remainRow = result.shift();

            gridRef.current.api?.setPinnedBottomRowData(result.length ? [sumRow] : []);
            gridRef.current.api?.setPinnedTopRowData(result.length ? [remainRow] : []);

            setRowData(result);
        }
    }, [data]);

    const getRowClass = ({ node }: RowClassParams) => (node.isRowPinned() ? 'bg-[#d2e3fa] dark:bg-[#474d57]' : '');

    return (
        <>
            <WidgetLoading spining={loading}>
                <AGTable ref={gridRef} rowData={rowData || []} columnDefs={Columns} getRowClass={getRowClass} />
            </WidgetLoading>
            <div className="border-t flex justify-end items-center pt-4">
                <Paginator
                    loading={loading}
                    pageNumber={pageNumber}
                    pageSize={pagesize}
                    totalPages={data?.totalPages}
                    hasNextPage={data?.hasNextPage}
                    hasPreviousPage={data?.hasPreviousPage}
                    PaginatorHandler={PaginatorHandler}
                />
            </div>
        </>
    );
};

export default TurnOverTable;
