import { GridReadyEvent, ICellRendererParams, ValueFormatterFunc, ValueFormatterParams } from 'ag-grid-community';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import AGTable, { ColDefType } from 'src/common/components/AGTable';
import WidgetLoading from 'src/common/components/WidgetLoading';
import { abbreviateNumber } from 'src/utils/helpers';
import { ActionsCell } from './actionsCell';
import { Paginator } from 'src/common/components/Paginator/Paginator';
import { HistoryPortfolioModal } from '../modal/historyPortfolioModal';
import { CellLostProfit } from './CellLostProfit';

type TPortfolioTableType = {
    loading: boolean;
    data?: GlobalPaginatedApiResponse<IGTPortfolioResultType[]>;
    PaginatorHandler: (action: 'PageNumber' | 'PageSize', value: number) => void;
    setGridApi: (x: GridReadyEvent) => void;
};

export const PortfolioTable: FC<TPortfolioTableType> = ({ loading, data, PaginatorHandler, setGridApi }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dataModal, setDataModal] = useState<IGTPortfolioResultType | undefined>();

    // const [gridApi, setGridApi] = useState<GridReadyEvent<IGetWatchlistSymbol>>();

    const { t } = useTranslation();
    const { pageNumber, pageSize, result, hasNextPage, hasPreviousPage, totalPages } = data || {};

    const historyModalAction = () => {
        setIsOpen((prev) => !prev);
    };

    const calcDayValue = (data?: IGTPortfolioResultType) => {
        if (!data) return '';

        const { lastTradedPrice, asset, commissionPrice } = data;
        const res = lastTradedPrice * asset - commissionPrice;
        return String(abbreviateNumber(res));
    };

    const columns = useMemo(
        (): ColDefType<IGTPortfolioResultType>[] => [
            {
                headerName: t('ag_columns_headerName.row'),
                minWidth: 60,
                maxWidth: 80,
                valueFormatter: ({ node }) => String(((pageNumber || 0) - 1) * (pageSize || 0) + node?.rowIndex! + 1),
                lockVisible: true,
                sortable: false,
                pinned: 'right',
            },
            // { headerName: t('ag_columns_headerName.lastTradedPrice'), field: 'lastTradedPrice', cellClass: 'font-bold' },

            {
                headerName: t('ag_columns_headerName.customer'),
                field: 'customerTitle',
            },
            {
                headerName: t('ag_columns_headerName.symbol'),
                field: 'symbolTitle',
                maxWidth: 120,
            },
            {
                headerName: t('ag_columns_headerName.count'),
                field: 'asset',
                type: 'sepratedNumber',
            },
            {
                headerName: t('ag_columns_headerName.bep'),
                field: 'averagePrice',
                type: 'sepratedNumber',
            },
            {
                headerName: t('ag_columns_headerName.lastTradedPrice'),
                field: 'lastTradedPrice',
                type: 'sepratedNumber',
            },
            {
                headerName: t('ag_columns_headerName.totalValue'),
                field: 'totalValue',
                type: 'abbreviatedNumber',
            },

            {
                headerName: t('ag_columns_headerName.dayValue'),
                field: 'dayValue',
                type: 'abbreviatedNumber',
                valueFormatter: ({ data }) => calcDayValue(data),
            },
            {
                headerName: t('ag_columns_headerName.lostProfitValue'),
                field: 'lostProfitValue',
                cellRenderer: CellLostProfit,
                // type: "abbreviatedNumber",
                // valueFormatter: ({ value }) => "\u200E" + abbreviateNumber(value),
                // valueFormatter: ({ data }) => "\u200E" + abbreviateNumber(Number(calcLostProfitValue(data))),
                // cellClass: ({ data }) => Number(calcLostProfitValue(data)) > 0 ? 'text-L-success-200' : 'text-L-error-200',
                // cellClass: (data) => (Number(calcLostProfitValue(data)) > 0 ? 'text-L-success-200' : 'text-L-error-200'),
            },
            {
                headerName: t('ag_columns_headerName.actions'),
                field: 'symbolISIN',
                cellRenderer: ({ data }: ICellRendererParams<IGTPortfolioResultType>) => (
                    <ActionsCell data={data} historyModalAction={historyModalAction} setDataModal={setDataModal} />
                ),
                lockVisible: true,
                pinned: 'left',
                sortable: false,
            },
        ],
        [pageNumber, pageSize],
    );

    return (
        <>
            <WidgetLoading spining={loading}>
                <AGTable
                    rowModelType="clientSide"
                    rowData={data?.result}
                    columnDefs={columns}
                    rowSelection="single"
                    asyncTransactionWaitMillis={4000}
                    animateRows={true}
                    rowDragManaged
                    suppressScrollOnNewData={true}
                    suppressRowVirtualisation={true}
                    suppressColumnVirtualisation={true}
                    suppressLoadingOverlay={true}
                    suppressCellFocus={true}
                    stopEditingWhenCellsLoseFocus={true}
                    suppressNoRowsOverlay={true}
                    suppressColumnMoveAnimation={true}
                    suppressDragLeaveHidesColumns={true}
                    getRowId={({ data }) => data.symbolISIN + data.customerIsin}
                    onGridReady={(p) => setGridApi(p)}
                    onGridSizeChanged={({ api }) => api.sizeColumnsToFit()}
                    onFirstDataRendered={({ api }) => api.sizeColumnsToFit()}
                    onRowDataUpdated={({ api }) => api.sizeColumnsToFit()}
                />
            </WidgetLoading>
            <div className="border-t flex justify-end items-center pt-4">
                <Paginator
                    loading={loading}
                    pageNumber={pageNumber || 0}
                    pageSize={pageSize || 0}
                    totalPages={totalPages}
                    hasNextPage={hasNextPage}
                    hasPreviousPage={hasPreviousPage}
                    PaginatorHandler={PaginatorHandler}
                />
            </div>

            {isOpen && <HistoryPortfolioModal isOpen={isOpen} setClose={setIsOpen} dataModal={dataModal} setDataModal={setDataModal} />}
        </>
    );
};
