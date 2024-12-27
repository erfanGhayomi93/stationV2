import { useMemo } from 'react';
import { ColDef } from '@ag-grid-community/core';
import { useTranslation } from 'react-i18next';
import { dateFormatter, sepNumbers } from '@methods/helper.ts';
import AgGridTable from '@components/Table/AgGrid.tsx';
import Pagination from '@components/Pagination';

import detailsCellRenderer from '@pages/Reports/TradesReports/components/detailsCellRenderer.tsx';

interface ITradesReportsTableProps {
     data: GlobalPaginatedApiResponse<ITradesReportsRes[]> | undefined;
     loading: boolean;
     filters: ITradesReportsFilters;
     setFieldFilters: <K extends keyof ITradesReportsFilters>(name: K, value: ITradesReportsFilters[K]) => void;
}

const TradesReportsTable = ({ data, loading, filters, setFieldFilters }: ITradesReportsTableProps) => {
     const { t } = useTranslation();

     const COLUMNS_DEFS = useMemo<ColDef<ITradesReportsRes>[]>(
          () => [
               {
                    headerName: t('tradesReports.rowNumberCol'),
                    valueGetter: params => (params.node?.rowIndex ?? 0) + 1,
                    minWidth: 60,
                    maxWidth: 60,
               },
               {
                    field: 'customerTitle',
                    headerName: t('tradesReports.customerNameCol'),
               },
               {
                    field: 'bourseCode',
                    headerName: t('tradesReports.bourseCodeCol'),
               },
               { field: 'customerISIN', headerName: t('tradesReports.customerCodeCol'), minWidth: 150 },

               {
                    field: 'tradeQuantity',
                    headerName: t('tradesReports.volumeCol'),
                    valueFormatter: ({ data }) => sepNumbers(data?.tradeQuantity),
               },
               {
                    field: 'tradePrice',
                    headerName: t('tradesReports.priceCol'),
                    valueFormatter: ({ data }) => sepNumbers(data?.tradePrice),
               },
               {
                    field: 'totalPrice',
                    headerName: t('tradesReports.finalPriceCol'),
                    valueFormatter: ({ data }) => sepNumbers(data?.totalPrice),
               },
               {
                    field: 'totalCommission',
                    headerName: t('tradesReports.commissionCol'),
                    valueFormatter: ({ data }) => sepNumbers(data?.totalCommission),
               },
               {
                    field: 'orderSide',
                    headerName: t('tradesReports.sideCol'),
                    cellClassRules: {
                         'text-content-success-buy': ({ data }) => data?.orderSide === 'Buy',
                         'text-content-error-sell': ({ data }) => data?.orderSide === 'Sell',
                    },
                    valueGetter: ({ data }) => t(`tradesReports.side${data?.orderSide ?? 'Buy'}`),
               },
               {
                    field: 'customerType',
                    headerName: t('tradesReports.customerTypeCol'),
                    valueFormatter: ({ data }) => t(`tradesReports.customerType${data?.customerType ?? 'Natural'}`),
               },
               {
                    headerName: t('tradesReports.sourceCol'),
                    valueGetter: () => t('tradesReports.sourceOnline'),
               },
               {
                    field: 'tradeDate',
                    headerName: t('tradesReports.dateCol'),
                    valueFormatter: ({ data }) => dateFormatter(data?.tradeDate ?? 0, 'date'),
                    cellClass: 'trl',
               },
               {
                    headerName: t('tradesReports.detailsCol'),
                    cellRenderer: 'agGroupCellRenderer',
                    cellClass: '[&_.ag-cell-expandable]:flex [&_.ag-cell-expandable]:justify-center',
               },
          ],
          []
     );

     return (
          <div className="flex h-full flex-col justify-between gap-6">
               <AgGridTable
                    columnDefs={COLUMNS_DEFS}
                    rowData={data?.result}
                    masterDetail={true}
                    detailCellRenderer={detailsCellRenderer}
                    defaultColDef={{
                         flex: 1,
                    }}
                    groupDefaultExpanded={0}
                    loading={loading}
                    detailRowAutoHeight
                    keepDetailRows={true}
               />

               <div className="flex justify-end">
                    <Pagination
                         hasNextPage={data?.hasNextPage ?? false}
                         hasPreviousPage={data?.hasPreviousPage ?? false}
                         onPageChange={pn => setFieldFilters('pageNumber', pn)}
                         onPageSizeChange={ps => setFieldFilters('pageSize', ps)}
                         currentPage={data?.pageNumber ?? 1}
                         pageNumber={data?.pageSize ?? 1}
                         totalPages={data?.totalPages ?? 1}
                         pageSize={filters.pageSize ?? 1}
                         totalCount={data?.totalCount ?? 1}
                    />
               </div>
          </div>
     );
};

export default TradesReportsTable;
