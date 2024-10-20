import { ColDef } from '@ag-grid-community/core';
import { useQueryOptionContracts } from '@api/Symbol';
import AgGrid from '@components/Table/AgGrid';
import { useSymbolStore } from '@store/symbol';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const OptionContracts = () => {
     const { t } = useTranslation();

     const { selectedSymbol } = useSymbolStore();

     const { data: optionContractsData } = useQueryOptionContracts({ symbolISIN: selectedSymbol });

     const columnsDef = useMemo<ColDef<IOptionContractsRes>[]>(
          () => [
               {
                    field: 'symbolTitle',
                    headerName: t('optionContracts.symbolTitle'),
               },
               {
                    field: 'totalNumberOfSharesTraded',
                    headerName: t('optionContracts.totalNumberOfSharesTradedColumn'),
               },
               {
                    field: 'lastTradedPrice',
                    headerName: t('optionContracts.lastPriceColumn'),
               },
               {
                    field: 'bestBuyPrice',
                    headerName: t('optionContracts.demandAndSupplyColumn'),
               },
          ],
          []
     );

     const rowData = useMemo(() => {
          return optionContractsData ?? [];
     }, [optionContractsData]);

     return (
          <div className="relative w-full flex-1">
               <AgGrid columnDefs={columnsDef} rowData={rowData} />
          </div>
     );
};

export default OptionContracts;
