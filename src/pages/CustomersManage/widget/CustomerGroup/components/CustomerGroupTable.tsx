import { ColDef, GetDetailRowDataParams, IDetailCellRendererParams } from '@ag-grid-community/core';
import AgGridTable from '@components/Table/AgGrid';
import { CustomersContext } from '@pages/CustomersManage/context';
import { useContext, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ActionRenderer from '../ActionRenderer';

type TCustomerGroupTableProps = {
     data: ICustomerAdvancedSearchRes[];
};

const CustomerGroupTable = ({ data }: TCustomerGroupTableProps) => {
     const { t } = useTranslation();

     const { setCustomerGroup } = useContext(CustomersContext);

     const customerGroupSelectData = useRef<ICustomerAdvancedSearchRes[] | null>(null);

     const COLUMNS_DEFS = useMemo<ColDef<ICustomerAdvancedSearchRes>[]>(
          () => [
               {
                    field: 'title',
                    headerName: t('customersManage.groupCustomerNameCol'),
                    valueGetter: ({ data }) => data?.title,
                    cellRenderer: 'agGroupCellRenderer',
               },
               {
                    field: 'bourseCode',
                    headerName: t('customersManage.bourseCodeCol'),
                    headerClass: 'hidden',
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

                    // cellRenderer: ActionRenderer,
               },
          ],
          []
     );

     const detailCellRendererParams = useMemo(() => {
          return {
               detailGridOptions: {
                    rowSelection: { mode: 'multiRow', headerCheckbox: true },
                    columnDefs: [
                         {
                              field: 'title',
                              headerName: t('customersManage.customerNameCol'),
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
                    defaultColDef: {
                         flex: 1,
                    },
                    enableRtl: true,

                    onRowSelected(event) {
                         customerGroupSelectData.current = event.api.getSelectedRows();

                         setCustomerGroup(customerGroupSelectData.current);
                    },
               },
               getDetailRowData: (params: GetDetailRowDataParams) => {
                    params.successCallback(params.data.children);
               },
          } as IDetailCellRendererParams<any, any>;
     }, []);

     return (
          <div className="col-span-2 text-content-error-sell">
               <AgGridTable
                    masterDetail={true}
                    detailCellRendererParams={detailCellRendererParams}
                    rowData={data}
                    columnDefs={COLUMNS_DEFS}
                    defaultColDef={{
                         flex: 1,
                         valueGetter: () => null,
                    }}
                    groupDefaultExpanded={0}
               />
          </div>
     );
};

export default CustomerGroupTable;
