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

     const { data } = useCustomerContracts({ customerISIN: customers[0].customerISIN ?? '' });

     const COLUMNS_DEFS = useMemo<ColDef<ICustomerContractsRes>[]>(
          () => [
               {
                    field: 'title',
                    headerName: t('customersManage.contractsTitleCol'),
                    tooltipField: 'title',
               },
               {
                    field: 'state',
                    headerName: t('customersManage.contractsStatusCol'),
                    valueFormatter: ({ data }) => t(`customersManage.contractsStatus${data?.state ?? 'NotSpecified'}`),
                    cellClassRules: {
                         'text-content-success-buy': ({ data }) => data?.state === 'Accepted',
                         'text-content--buy': ({ data }) => data?.state === 'Accepted',
                         'text-content-warning': ({ data }) => data?.state === 'NotSpecified',
                         'text-content-error-sell': ({ data }) => data?.state === 'expired',
                    },
               },
               {
                    field: 'changeDate',
                    headerName: t('customersManage.contractsDateCol'),
                    valueFormatter: ({ data }) => '\u200e' + dateFormatter(data?.changeDate ?? 0, 'datetime'),
                    cellClass: 'font-normal',
               },
          ],
          [data]
     );

     return (
          <div className="h-full flex-1 overflow-y-auto px-20">
               <AgGridTable
                    defaultColDef={{
                         cellClass: 'text-sm font-medium',
                    }}
                    rowData={data}
                    columnDefs={COLUMNS_DEFS}
               />
          </div>
     );
};

export default Contracts;
