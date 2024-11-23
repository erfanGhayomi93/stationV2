import { ColDef, SelectionChangedEvent } from '@ag-grid-community/core';
import AgGrid from '@components/Table/AgGrid';
import { numFormatter } from '@methods/helper';
import { CustomersContext } from '@pages/CustomersManage/context';
import { useModalStore } from '@store/modal';
import { useContext, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ActionRenderer from './ActionRenderer';

type TCustomersTableProps = {
     data: ICustomerAdvancedSearchRes[] | undefined;
     loading?: boolean;
};

const CustomersTable = ({ data, loading }: TCustomersTableProps) => {
     const { t } = useTranslation();

     const { setCustomers } = useContext(CustomersContext);

     const { setPortfolioCustomerModal, setAddCustomersToGroupModal } = useModalStore();

     const customersSelectData = useRef<ICustomerAdvancedSearchRes[] | null>(null);

     const onRowSelected = (event: SelectionChangedEvent<ICustomerAdvancedSearchRes>) => {
          customersSelectData.current = event.api.getSelectedRows();

          setCustomers(customersSelectData.current);
     };

     const onPortfolioCustomer = (data: ICustomerAdvancedSearchRes) => {
          setPortfolioCustomerModal({ customer: data });
     };

     const onAddCustomerToGroups = (data: ICustomerAdvancedSearchRes) => {
          setAddCustomersToGroupModal({ customers: [data.customerISIN] });
     };

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
                    field: 'customerRemainAndOptionRemainDto.purchasePower',
                    headerName: t('customersManage.purchasePowerCol'),
                    valueFormatter: ({ data }) =>
                         '\u200e' + numFormatter(data?.customerRemainAndOptionRemainDto.purchasePower ?? 0, true, false),
                    cellClassRules: {
                         'text-content-error-sell': ({ data }) => (data?.customerRemainAndOptionRemainDto.purchasePower ?? 0) < 0,
                    },
               },
               {
                    field: 'customerRemainAndOptionRemainDto.purchaseOptionPower',
                    headerName: t('customersManage.purchasePowerOptionCol'),
                    valueFormatter: ({ data }) =>
                         '\u200e' + numFormatter(data?.customerRemainAndOptionRemainDto.purchaseOptionPower ?? 0, true, false),
                    cellClassRules: {
                         'text-content-error-sell': ({ data }) =>
                              (data?.customerRemainAndOptionRemainDto.purchaseOptionPower ?? 0) < 0,
                    },
               },
               {
                    field: 'id',
                    headerName: t('customersManage.actionCol'),
                    cellRenderer: ActionRenderer,
                    cellRendererParams: {
                         onPortfolioCustomer,
                         onAddCustomerToGroups,
                    },
               },
          ],
          []
     );

     return (
          <div className="col-span-2 text-content-error-sell">
               <AgGrid
                    columnDefs={COLUMN_DEFS}
                    rowData={data}
                    rowSelection={{
                         mode: 'multiRow',
                    }}
                    onSelectionChanged={onRowSelected}
                    loading={loading}
               />
          </div>
     );
};

export default CustomersTable;
