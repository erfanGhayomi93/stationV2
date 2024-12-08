import { ColDef } from '@ag-grid-community/core';
import { useCustomerContracts } from '@api/customer';
import AgGridTable from '@components/Table/AgGrid';
import { dateFormatter } from '@methods/helper';
import { CustomersContext } from '@pages/CustomersManage/context';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const Contracts = () => {
     const { t } = useTranslation();

     const { customers } = useContext(CustomersContext);

     const { data, isLoading } = useCustomerContracts({ customerISIN: customers[0].customerISIN ?? '' });

     const COLUMNS_DEFS = useMemo<ColDef<ICustomerContractsRes>[]>(
          () => [
               {
                    field: 'title',
                    headerName: t('customersManage.contractsTitleCol'),
                    tooltipField: 'title',
               },
               {
                    field: 'status',
                    headerName: t('customersManage.contractsStatusCol'),
                    valueFormatter: ({ data }) => t(`customersManage.contractsStatus${data?.status ?? 'Null'}`),
                    cellClassRules: {
                         'text-content-success-buy': ({ data }) => data?.status === 'Active',
                         'text-content-warning': ({ data }) => data?.status === 'Suspend',
                         'text-content-error-sell': ({ data }) => data?.status === 'InActive',
                         'text-content-paragraph': ({ data }) => data?.status === null,
                    },
               },
               {
                    field: 'startDate',
                    headerName: t('customersManage.contractsDateCol'),
                    valueFormatter: ({ data }) => '\u200e' + dateFormatter(data?.startDate ?? 0, 'datetime'),
                    cellClass: 'font-normal',
               },
          ],
          []
     );

     return (
          <div className="h-full flex-1 overflow-y-auto px-20">
               <AgGridTable
                    defaultColDef={{
                         cellClass: 'text-sm font-medium',
                    }}
                    loading={isLoading}
                    rowData={data}
                    columnDefs={COLUMNS_DEFS}
               />
          </div>
     );
};

export default Contracts;
