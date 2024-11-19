import { ColDef } from '@ag-grid-community/core';
import { useQueryCommission } from '@api/commission';
import { usePositionsCustomer } from '@api/option';
import AgGridTable from '@components/Table/AgGrid';
import { dateFormatter, sepNumbers } from '@methods/helper';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ActionCellRenderer from './ActionCellRenderer';

interface IPositionsTableProps {
     customer: ICustomerAdvancedSearchRes;
}

const PositionsTable = ({ customer }: IPositionsTableProps) => {
     const { t } = useTranslation();

     const { data: positionsCustomerData, isLoading, isFetching } = usePositionsCustomer({ customerISIN: customer.customerISIN });

     const { data: commissionData } = useQueryCommission();

     const optionCommission = useMemo(() => {
          const commission = commissionData?.find(c => c.marketUnitTitle === 'OptionToBuyInBourse' && c.marketTitle === 'Option');

          return commission?.buyCommission || commission?.sellCommission || 0;
     }, [commissionData]);

     const COLUMNS_DEFS = useMemo<ColDef<IPositionsCustomerRes>[]>(
          () => [
               {
                    field: 'symbolTitle',
                    headerName: t('portfolioCustomerModal.positionsSymbolTitleCol'),
               },
               {
                    field: 'positionSide',
                    headerName: t('portfolioCustomerModal.positionsPositionCol'),
                    valueFormatter: ({ data }) => t(`portfolioCustomerModal.positionsPositionSide${data?.positionSide ?? 'Buy'}`),
                    cellClass: ({ data }) => {
                         if (!data) return '';
                         return data.positionSide === 'Buy' ? 'text-content-success-buy' : 'text-content-error-sell';
                    },
                    comparator: (valueA, valueB) => valueA.localeCompare(valueB),
               },
               {
                    field: 'positionCount',
                    headerName: t('portfolioCustomerModal.positionsCountCol'),
                    cellClass: ({ data }) => {
                         if (!data) return '';
                         return data?.positionSide === 'Buy' ? 'text-content-success-buy' : 'text-content-error-sell';
                    },
               },
               {
                    field: 'blockType',
                    headerName: t('portfolioCustomerModal.positionsGuaranteePlaceCol'),
                    valueGetter: ({ data }) => {
                         if (data?.positionSide === 'Buy') return '-';
                         if (data?.blockType) return t(`portfolioCustomerModal.positionsBlockType${data?.blockType ?? 'All'}`);
                         return '-';
                    },
               },
               {
                    field: 'physicalSettlementDate',
                    headerName: t('portfolioCustomerModal.positionsPhysicalSettlementCol'),
                    valueGetter: ({ data }) => dateFormatter(data?.physicalSettlementDate ?? '', 'date'),
               },
               {
                    field: 'remainDays',
                    headerName: t('portfolioCustomerModal.positionsRemainToDueCol'),
                    valueGetter: ({ data }) => `${data?.remainDays} ${t('dates.day')}`,
               },
               {
                    field: 'strikePrice',
                    headerName: t('portfolioCustomerModal.positionsStrikePriceCol'),
                    valueFormatter: ({ data }) => sepNumbers(data?.strikePrice) ?? '-',
               },
               {
                    headerName: t('portfolioCustomerModal.positionsValueClosePositionCol'),
                    valueGetter: ({ data }) => {
                         if (!data) return 0;

                         const price = data?.lastTradedPrice || 0;

                         const value = price * data.contractSize * data.positionCount;
                         const valueWithCommission =
                              data.positionSide === 'Buy'
                                   ? Math.round(value * (1 + optionCommission))
                                   : Math.round(value * (1 - optionCommission));

                         return (data.positionSide === 'Sell' ? -1 : 1) * Math.abs(valueWithCommission);
                    },
                    valueFormatter: ({ value }) => sepNumbers(Math.abs(value)) ?? '-',
                    cellClassRules: {
                         'ltr text-center text-content-paragraph ': ({ value }) => value === 0,
                         'ltr text-center text-content-success-buy': ({ value }) => value > 0,
                         'ltr text-center text-content-error-sell': ({ value }) => value < 2000,
                    },
               },
               {
                    headerName: t('portfolioCustomerModal.positionsAverageBuySellCol'),
                    valueGetter: ({ data }) =>
                         data?.positionSide === 'Buy'
                              ? data?.avgBuyPrice
                              : data?.positionSide === 'Sell'
                                ? data?.avgSellPrice
                                : 0,
                    valueFormatter: ({ value }) => sepNumbers(value) ?? '-',
               },
               {
                    field: 'lastTradedPrice',
                    headerName: t('portfolioCustomerModal.positionsLastPriceCol'),
                    valueFormatter: ({ data }) => sepNumbers(data?.lastTradedPrice) ?? '-',
               },
               {
                    headerName: t('portfolioCustomerModal.positionsActionCol'),
                    cellRenderer: ActionCellRenderer,
               },
          ],
          []
     );
     return (
          <div className="h-full flex-1">
               <AgGridTable
                    tableHeight="30rem"
                    loading={isLoading || isFetching}
                    columnDefs={COLUMNS_DEFS}
                    rowData={positionsCustomerData}
               />
          </div>
     );
};

export default PositionsTable;
