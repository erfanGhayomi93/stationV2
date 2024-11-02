import { ColDef } from '@ag-grid-community/core';
import { useQuerySameGroupSymbol } from '@api/Symbol';
import AgGridTable from '@components/Table/AgGrid';
import { sepNumbers } from '@methods/helper';
import { useSymbolStore } from '@store/symbol';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import LastPriceRenderer from './LastPriceRenderer';
import SupplyAndDemandRenderer from './SupplyAndDemandRenderer';

const SameGroups = () => {
     const { selectedSymbol } = useSymbolStore();

     const { t } = useTranslation();

     const { data: sameGroupsData } = useQuerySameGroupSymbol({ SymbolISIN: selectedSymbol });

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
                    field: 'bestBuyPrice',
                    headerName: t('sameGroups.demandAndSupplyColumn'),
                    cellRenderer: SupplyAndDemandRenderer,
               },
          ],
          []
     );

     const rowData = useMemo(() => {
          return sameGroupsData ?? [];
     }, [sameGroupsData]);


     return (
          <div className="relative min-h-full w-full flex-1">
               <AgGridTable
                    columnDefs={columnDefs}
                    rowData={rowData}
                    defaultColDef={{
                         cellClass: 'text-sm',
                    }}
               />
          </div>
     );
};

export default SameGroups;
