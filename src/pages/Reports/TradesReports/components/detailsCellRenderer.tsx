import React, { useMemo } from 'react';
import { CustomCellRendererProps } from '@ag-grid-community/react';
import { useDetailsTradesReports } from '@api/order';
import AgGridTable from '@components/Table/AgGrid.tsx';
import { ColDef } from '@ag-grid-community/core';
import { useTranslation } from 'react-i18next';
import { dateFormatter, sepNumbers } from '@methods/helper.ts';

const DetailCellRenderer = ({ data }: CustomCellRendererProps<ITradesReportsRes>) => {
     const { t } = useTranslation();

     const { data: detailsTradesReportsData } = useDetailsTradesReports(data);

     console.log({ detailsTradesReportsData });

     const COLUMNS_DEFS = useMemo<ColDef<IDetailsTradesReportsRes>[]>(
          () => [
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
          ],
          []
     );

     return (
          <div className="bg-back-surface px-20 pt-8">
               <AgGridTable domLayout="autoHeight" columnDefs={COLUMNS_DEFS} rowData={detailsTradesReportsData ?? []} />
          </div>
     );
};

export default DetailCellRenderer;
