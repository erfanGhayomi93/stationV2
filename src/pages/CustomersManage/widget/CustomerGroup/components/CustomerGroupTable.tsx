import { ColDef } from '@ag-grid-community/core';
import AgGridTable from '@components/Table/AgGrid';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

type TCustomerGroupTableProps = {
     data: ICustomerAdvancedSearchRes[];
};

const CustomerGroupTable = ({ data }: TCustomerGroupTableProps) => {
     const { t } = useTranslation();

     const COLUMNS_DEFS = useMemo<ColDef<ICustomerAdvancedSearchRes>[]>(
          () => [
               {
                    field: 'title',
                    headerName: t('customersManage.groupCustomerNameCol'),
                    rowGroup: true,
               },
               {
                    field: 'bourseCode',
                    headerName: t('customersManage.bourseCodeCol'),
                    valueGetter: () => null,
                    // rowGroup: true,
               },
               {
                    field: 'nationalCode',
                    headerName: t('customersManage.nationalCodeCol'),
                    valueGetter: () => null,
               },
               {
                    field: 'purchasePower',
                    headerName: t('customersManage.purchasePowerCol'),
                    valueGetter: () => null,
               },
               {
                    field: 'customerRemainAndOptionRemainDto.remain',
                    headerName: t('customersManage.purchasePowerOptionCol'),
                    valueGetter: () => null,
               },
               {
                    field: 'id',
                    headerName: t('customersManage.actionCol'),
                    valueGetter: () => null,
                    // cellRenderer: ActionRenderer,
               },
          ],
          []
     );

     //  const onGridReady = useCallback((params: GridReadyEvent) => {
     //       fetch('https://www.ag-grid.com/example-assets/olympic-winners.json')
     //            .then(resp => resp.json())
     //            .then((data: IOlympicData[]) => setRowData(data));
     //  }, []);

     return (
          <div className="col-span-2 text-content-error-sell">
               <AgGridTable
                    columnDefs={COLUMNS_DEFS}
                    rowData={data}
                    rowSelection={{
                         mode: 'multiRow',
                    }}
                    groupDefaultExpanded={1}
               />
          </div>
     );
};

export default CustomerGroupTable;
