import { ColDef } from '@ag-grid-community/core';
import Divider from '@components/Divider';
import AgGridTable from '@components/Table/AgGrid';
import { CustomersContext } from '@pages/CustomersManage/context';
import { useContext, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const MultiCustomerInformation = () => {
     const { t } = useTranslation();

     const { customers } = useContext(CustomersContext);

     console.log(customers, 'customers');
     const COLUMNS_DEFS = useMemo<ColDef<ICustomerAdvancedSearchRes>[]>(
          () => [
               {
                    field: 'title',
                    headerName: t('customersManage.selectCustomersFullNameCol'),
                    flex: 1,
               },
               {
                    field: 'bourseCode',
                    headerName: t('customersManage.selectCustomersBourseCode'),
               },
               {
                    field: 'nationalCode',
                    headerName: t('customersManage.selectCustomersNationalCode'),
               },
          ],
          [customers]
     );

     return (
          <div className="flex h-full w-full flex-1 flex-col gap-4 overflow-y-auto px-6">
               <span className="text-sm font-medium text-content-title">{t('customersManage.listSelectCustomer')}</span>

               <Divider />
               <div className="h-full w-full flex-1">
                    <AgGridTable columnDefs={COLUMNS_DEFS} rowData={customers ?? []} />
               </div>
          </div>
     );
};

export default MultiCustomerInformation;
