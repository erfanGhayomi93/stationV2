import { ColDef } from '@ag-grid-community/core';
import { useQuerySameGroupSymbol } from '@api/Symbol';
import AgGridTable from '@components/Table/AgGrid';
import UseDebounceOutput from '@hooks/useDebounceOutput';
import { pushEngine, UpdatedFieldsType } from '@LS/pushEngine';
import { subscribeSymbolGeneral } from '@LS/subscribes';
import { sepNumbers } from '@methods/helper';
import { useSymbolStore } from '@store/symbol';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import LastPriceRenderer from './LastPriceRenderer';
import SupplyAndDemandRenderer from './SupplyAndDemandRenderer';

const SameGroups = () => {
     const { selectedSymbol } = useSymbolStore();

     const { t } = useTranslation();

     const queryClient = useQueryClient();

     const { data: sameGroupsData, isSuccess, isFetching } = useQuerySameGroupSymbol({ SymbolISIN: selectedSymbol });

     const refData = useRef<ISameGroupsRes[]>();

     const { setDebounce } = UseDebounceOutput();

     const columnDefs = useMemo<ColDef<ISameGroupsRes>[]>(
          () => [
               {
                    field: 'symbolTitle',
                    headerName: t('sameGroups.symbolTitleColumn'),
               },
               {
                    field: 'totalNumberOfSharesTraded',
                    headerName: t('sameGroups.totalNumberOfSharesTradedColumn'),
                    valueGetter: ({ data }) => sepNumbers(data?.totalNumberOfSharesTraded),
               },
               {
                    field: 'lastTradedPrice',
                    headerName: t('sameGroups.lastPriceColumn'),
                    cellRenderer: LastPriceRenderer,
               },
               {
                    field: 'bestBuyLimitPrice_1',
                    headerName: t('sameGroups.demandAndSupplyColumn'),
                    cellRenderer: SupplyAndDemandRenderer,
               },
          ],
          []
     );

     const updateSameGroup = ({ itemName, changedFields }: UpdatedFieldsType<ISameGroupsSub>) => {
          const sameGroupsDataSnapshot: ISameGroupsRes[] = JSON.parse(JSON.stringify(refData.current));

          const findSymbolOld = sameGroupsDataSnapshot.find(item => item.symbolISIN === itemName);

          if (findSymbolOld) {
               const updatedSymbol = {
                    ...findSymbolOld,
                    bestBuyLimitPrice_1: changedFields.bestBuyLimitPrice_1
                         ? changedFields.bestBuyLimitPrice_1
                         : findSymbolOld.bestBuyLimitPrice_1,
                    bestSellLimitPrice_1: changedFields.bestSellLimitPrice_1
                         ? changedFields.bestSellLimitPrice_1
                         : findSymbolOld.bestSellLimitPrice_1,
                    lastTradedPriceVarPercent: changedFields.lastTradedPriceVarPercent
                         ? changedFields.lastTradedPriceVarPercent
                         : findSymbolOld.lastTradedPriceVarPercent,
                    lastTradedPrice: changedFields.lastTradedPrice
                         ? changedFields.lastTradedPrice
                         : findSymbolOld.lastTradedPrice,
                    totalNumberOfSharesTraded: changedFields.totalNumberOfSharesTraded
                         ? changedFields.totalNumberOfSharesTraded
                         : findSymbolOld.totalNumberOfSharesTraded,
               };

               const findIndexSymbol = sameGroupsDataSnapshot.findIndex(item => item.symbolISIN === itemName);

               sameGroupsDataSnapshot[findIndexSymbol] = updatedSymbol;

               refData.current = sameGroupsDataSnapshot;

               setDebounce(() => {
                    queryClient.setQueryData(['GetSameGroupsSymbol', selectedSymbol], () => {
                         if (refData.current) return [...refData.current];
                    });
               });
          }
     };

     const rowData = useMemo(() => {
          return sameGroupsData ?? [];
     }, [sameGroupsData]);

     useEffect(() => {
          if (!isFetching && rowData.length !== 0 && isSuccess) {
               refData.current = rowData;

               const id = 'sameGroups';
               const items = rowData?.map(item => item.symbolISIN);
               const fields = [
                    'totalNumberOfSharesTraded',
                    'lastTradedPrice',
                    'lastTradedPriceVarPercent',
                    'bestBuyLimitPrice_1',
                    'bestSellLimitPrice_1',
               ];

               subscribeSymbolGeneral<ISameGroupsRes>({
                    id,
                    items,
                    fields,
                    onItemUpdate: updatedFields => {
                         updateSameGroup(updatedFields);
                    },
               });
          }

          return () => {
               pushEngine.disConnect();
          };
     }, [isFetching]);

     return (
          <div className="relative h-full w-full flex-1">
               <AgGridTable
                    columnDefs={columnDefs}
                    rowData={rowData}
                    loading={isFetching}
                    rowHeight={48}
                    headerHeight={48}
                    getRowId={({ data }) => data.symbolISIN}
               />
          </div>
     );
};

export default SameGroups;
