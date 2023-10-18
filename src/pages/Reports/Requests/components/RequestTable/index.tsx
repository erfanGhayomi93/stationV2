import { GridReadyEvent } from 'ag-grid-community';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { valueFormatterSide } from 'src/utils/helpers';
import RequestActionCell from './RequestActionCell';

interface IProps {
    setGridApi: (x: GridReadyEvent) => void;
    data?: IGTOfflineTradesResponse;
    pageNumber: number;
    pagesize: number;
    loading: boolean;
    PaginatorHandler: (action: 'PageNumber' | 'PageSize', value: number) => void;
}

const RequestTable = ({ setGridApi, data, pageNumber, pagesize, PaginatorHandler, loading }: IProps) => {
    //
    const { t } = useTranslation();
    const { result: rowData, totalPages, hasNextPage, hasPreviousPage } = data || {};

    const Columns = useMemo(
        (): ColDefType<IGTOfflineTradesResult>[] => [
            {
                headerName: t('ag_columns_headerName.row'),
                field: 'agTableIndex',
                valueFormatter: ({ node }) => String((pageNumber - 1) * pagesize + node?.rowIndex! + 1),
                sortable: false,
                checkboxSelection: true,
                minWidth: 60,
                maxWidth: 80,
                lockVisible: true,
                pinned: 'right',
            },
            { headerName: t('ag_columns_headerName.requestNumber'), field: 'requestNo' },
            { headerName: t('ag_columns_headerName.customer'), field: 'customerTitle', type: 'sepratedNumber' },
            { headerName: t('ag_columns_headerName.bourseCode'), field: 'bourseCode' },
            {
                headerName: t('ag_columns_headerName.side'),
                field: 'side',
                valueFormatter: valueFormatterSide,
                cellClassRules: {
                    'text-L-success-200': ({ value }) => value === 'Buy',
                    'text-L-error-200': ({ value }) => value === 'Sell',
                },
            },
            { headerName: t('ag_columns_headerName.station'), field: 'executingStationName' },
            { headerName: t('ag_columns_headerName.symbol'), field: 'symbolTitle' },
            {
                headerName: t('ag_columns_headerName.price'),
                field: 'price',
                type: 'sepratedNumber',
            },
            { headerName: t('ag_columns_headerName.volume'), field: 'volume' },
            { headerName: t('ag_columns_headerName.fund'), field: 'fund' },
            { headerName: t('ag_columns_headerName.requestValidity'), field: 'requestExpiration', type: 'date' },
            {
                headerName: t('ag_columns_headerName.status'),
                field: 'state',
                valueFormatter: ({ value }) => (value ? t('BuySellRequestState.' + value) : '-'),
            },
            {
                headerName: t('ag_columns_headerName.actions'),
                field: 'agTableAction',
                lockVisible: true,
                minWidth: 150,
                pinned: 'left',
                cellRenderer: RequestActionCell,
            },
        ],
        [],
    );

    return (
        <>
            <WidgetLoading spining={loading}>
                <AGTable rowSelection="multiple" rowData={rowData || []} columnDefs={Columns} onGridReady={(grid) => setGridApi(grid)} />
            </WidgetLoading>
            <div className="border-t flex justify-end items-center  pt-4 ">
                <Paginator
                    loading={loading}
                    pageNumber={pageNumber}
                    pageSize={pagesize}
                    totalPages={totalPages}
                    hasNextPage={hasNextPage}
                    hasPreviousPage={hasPreviousPage}
                    PaginatorHandler={PaginatorHandler}
                />
            </div>
        </>
    );
};

export default RequestTable;
