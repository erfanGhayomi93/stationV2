import { ColDef } from '@ag-grid-community/core';
import AgGrid from '@components/Table/AgGrid';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ActionRenderer from './ActionRenderer';

type TCustomersTableProps = {
     data: ICustomerAdvancedSearchRes[] | undefined;
};

const CustomersTable = ({ data }: TCustomersTableProps) => {
     const { t } = useTranslation();

     console.log(data, 'data');

     const COLUMN_DEFS = useMemo<ColDef<ICustomerAdvancedSearchRes>[]>(
          () => [
               {
                    field: 'title',
                    headerName: t('customersManage.customerCol'),
               },
               {
                    field: 'bourseCode',
                    headerName: t('customersManage.bourseCodeCol'),
               },
               {
                    field: 'nationalCode',
                    headerName: t('customersManage.nationalCodeCol'),
               },
               {
                    field: 'purchasePower',
                    headerName: t('customersManage.purchasePowerCol'),
               },
               {
                    field: 'customerRemainAndOptionRemainDto.remain',
                    headerName: t('customersManage.purchasePowerOptionCol'),
               },
               {
                    field: 'id',
                    headerName: t('customersManage.actionCol'),
                    cellRenderer: ActionRenderer,
               },
          ],
          []
     );

     return (
          <div className="">
               <AgGrid
                    columnDefs={COLUMN_DEFS}
                    rowData={data ?? []}
                    rowSelection={{
                         mode: 'multiRow',
                    }}
               />
          </div>
     );
};

export default CustomersTable;
