import { ColDef } from '@ag-grid-community/core';
import { useQueryOptionContracts } from '@api/Symbol';
import AgGrid from '@components/Table/AgGrid';
import { dateFormatter, sepNumbers } from '@methods/helper';
import { useSymbolStore } from '@store/symbol';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import LastPriceRenderer from './LastPriceRenderer';

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
                    field: 'strikePrice',
                    headerName: t('optionContracts.strikePrice'),
                    valueGetter: ({ data }) => sepNumbers(data?.strikePrice),
               },
               {
                    field: 'contractEndDate',
                    headerName: t('optionContracts.contractDate'),
                    valueGetter: ({ data }) => (data?.contractEndDate ? dateFormatter(data?.contractEndDate, 'date') : '-'),
               },
               {
                    field: 'lastTradedPrice',
                    headerName: t('optionContracts.lastPrice'),
                    cellRenderer: LastPriceRenderer,
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
