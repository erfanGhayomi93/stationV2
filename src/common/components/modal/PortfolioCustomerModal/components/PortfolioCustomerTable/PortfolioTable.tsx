import { ColDef } from '@ag-grid-community/core';
import { useQueryCommission } from '@api/commission';
import { useQueryPortfolio } from '@api/portfolio';
import AgGridTable from '@components/Table/AgGrid';
import UseDebounceOutput from '@hooks/useDebounceOutput';
import { UpdatedFieldsType } from '@LS/pushEngine';
import { subscriptionPortfolio } from '@LS/subscribes';
import { sepNumbers } from '@methods/helper';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import BuySellRenderer from './BuySellRenderer';
import SymbolTitleRenderer from './SymbolTitleRenderer';

interface IPortfolioTableProps {
     customer: ICustomerAdvancedSearchRes;
}

const PortfolioTable = ({ customer }: IPortfolioTableProps) => {
     const { t } = useTranslation();

     const queryClient = useQueryClient();

     const refData = useRef<IPortfolioRes[]>([]);

     const { setDebounce } = UseDebounceOutput();

     const {
          data: portfolioData,
          isSuccess,
          isFetching,
          isLoading,
     } = useQueryPortfolio({ CustomerISIN: customer.customerISIN }, { enabled: true });

     const { data: commission } = useQueryCommission();

     const getCommission = (marketUnit: TMarketUnit) => {
          return commission?.find(item => item.marketUnitTitle === marketUnit)?.sellCommission;
     };

     const calcProfitAndLoss = (data?: IPortfolioRes) => {
          if (!data || !data.averagePrice) return 0;
          const { asset, closingPrice, lastTradedPrice, symbolTradeState, marketUnitTypeTitle, averagePrice } = data! || {};
          const sellCommissionValue = getCommission(marketUnitTypeTitle);

          if (!sellCommissionValue) return null;

          const price = symbolTradeState === 'Open' ? lastTradedPrice : closingPrice;

          const value = (price - averagePrice) * asset;
          const valueWithCommission = Math.abs(value) - Math.ceil(price * asset * sellCommissionValue);

          return (value < 0 || valueWithCommission < 0 ? -1 : 1) * Math.abs(valueWithCommission);
     };

     const calcProfitAndLossPercent = (data?: IPortfolioRes) => {
          if (!data || !data.averagePrice) return 0;
          const { asset, closingPrice, lastTradedPrice, symbolTradeState, marketUnitTypeTitle, averagePrice } = data! || {};
          const sellCommissionValue = getCommission(marketUnitTypeTitle);

          if (!sellCommissionValue) return null;

          const price = symbolTradeState === 'Open' ? lastTradedPrice : closingPrice;

          const profitLossPercent =
               ((Math.ceil(price * asset * (1 - sellCommissionValue)) - averagePrice * asset) / (averagePrice * asset)) * 100;

          return profitLossPercent;
     };

     const COLUMNS_DEFS = useMemo<ColDef<IPortfolioRes>[]>(
          () => [
               {
                    field: 'symbolTitle',
                    headerName: t('portfolioCustomerModal.portfolioSymbolTitleCol'),
                    cellRenderer: SymbolTitleRenderer,
               },
               {
                    field: 'asset',
                    headerName: t('portfolioCustomerModal.portfolioAssetCol'),
                    valueFormatter: ({ data }) => sepNumbers(data?.asset),
               },
               {
                    field: 'averagePrice',
                    headerName: t('portfolioCustomerModal.portfolioAveragePriceCol'),
                    valueFormatter: ({ data }) => sepNumbers(data?.averagePrice),
               },
               {
                    field: 'dayValue',
                    headerName: t('portfolioCustomerModal.portfolioNetValueCol'),
                    valueFormatter: ({ data }) => sepNumbers(data?.dayValue),
               },
               {
                    field: 'lastTradedPrice',
                    headerName: t('portfolioCustomerModal.portfolioLastPriceCol'),
                    valueFormatter: ({ data }) => sepNumbers(data?.lastTradedPrice),
               },
               {
                    field: 'customerIsin',
                    headerName: t('portfolioCustomerModal.portfolioProfitLossCol'),
                    cellClass: ({ value }) => (value > 0 ? 'text-content-success-buy' : 'text-content-error-sell'),
                    valueGetter: ({ data }) => calcProfitAndLoss(data),
                    valueFormatter: ({ value }) => (value ? sepNumbers(Math.abs(value)) : '-'),
               },
               {
                    field: 'customerIsin',
                    headerName: t('portfolioCustomerModal.portfolioPercentProfitLossCol'),
                    cellClass: ({ value }) => (value > 0 ? 'text-content-success-buy' : 'text-content-error-sell'),
                    valueGetter: ({ data }) => calcProfitAndLossPercent(data),
                    valueFormatter: ({ value }) => (value ? Math.abs(value).toFixed(2) + '%' : '-'),
               },
               {
                    field: 'customerIsin',
                    headerName: t('portfolioCustomerModal.portfolioBuySellCol'),
                    cellRenderer: BuySellRenderer,
               },
          ],
          [commission]
     );

     const updatePortfolioData = ({ itemName, changedFields }: UpdatedFieldsType<IPortfolioRes>) => {
          const portfolioDataSnapshot: IPortfolioRes[] = JSON.parse(JSON.stringify(refData.current));

          const findSymbolOld = portfolioDataSnapshot.find(symbol => symbol.symbolISIN === itemName);

          if (findSymbolOld) {
               const updatedSymbol = {
                    ...findSymbolOld,
                    lastTradedPrice: changedFields.lastTradedPrice
                         ? changedFields.lastTradedPrice
                         : findSymbolOld.lastTradedPrice,
                    closingPrice: changedFields.closingPrice ? changedFields.closingPrice : findSymbolOld.closingPrice,
                    symbolState: changedFields.symbolTradeState ? changedFields.symbolTradeState : findSymbolOld.symbolTradeState,
                    lostProfitValue: changedFields.lostProfitValue
                         ? changedFields.lostProfitValue
                         : findSymbolOld.lostProfitValue,
                    dayValue: changedFields.dayValue ? changedFields.dayValue : findSymbolOld.dayValue,
               };

               const findIndexSymbol = portfolioDataSnapshot.findIndex(symbol => symbol.symbolISIN === itemName);

               portfolioDataSnapshot[findIndexSymbol] = updatedSymbol;

               refData.current = portfolioDataSnapshot;

               setDebounce(() => {
                    queryClient.setQueryData(['portfolioList'], () => {
                         if (refData.current) {
                              return [...refData.current];
                         }
                    });
               });
          }
     };

     useEffect(() => {
          if (!isFetching && isSuccess && portfolioData?.result.length !== 0) {
               refData.current = portfolioData?.result;

               const id = 'portfolioSymbols';
               const items = portfolioData?.result.map(symbol => symbol.symbolISIN);
               const fields = ['lastTradedPrice', 'closingPrice', 'symbolState', 'lostProfitValue', 'dayValue'];

               subscriptionPortfolio<IPortfolioRes>({
                    id,
                    items,
                    fields,
                    onItemUpdate: updateFields => {
                         updatePortfolioData(updateFields);
                    },
               });
          }
     }, [isFetching]);

     return (
          <div className="h-full flex-1">
               <AgGridTable
                    loading={isLoading || isFetching}
                    tableHeight="30rem"
                    columnDefs={COLUMNS_DEFS}
                    rowData={portfolioData?.result}
               />
          </div>
     );
};

export default PortfolioTable;
