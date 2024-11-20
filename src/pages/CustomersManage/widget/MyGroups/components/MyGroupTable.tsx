import { ColDef, GetDetailRowDataParams, IDetailCellRendererParams } from '@ag-grid-community/core';
import AgGridTable from '@components/Table/AgGrid';
import { CustomersContext } from '@pages/CustomersManage/context';
import { useContext, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ActionRenderer from './ActionRender';
// import ActionRenderer from '../ActionRenderer';

type TMyGroupTableProps = {
     data: IMyGroupsInformationRes[];
     loading?: boolean;
};

const MyGroupTable = ({ data, loading }: TMyGroupTableProps) => {
     const { t } = useTranslation();

     const { setMyGroups } = useContext(CustomersContext);

     const myGroupsSelectData = useRef<IMyGroupsCustomerInformation[] | null>(null);

     const COLUMNS_DEFS = useMemo<ColDef<IMyGroupsInformationRes>[]>(
          () => [
               {
                    field: 'groupName',
                    headerName: t('customersManage.groupCustomerNameCol'),
                    valueGetter: ({ data }) => data?.groupName,
                    cellRenderer: 'agGroupCellRenderer',
               },
               {
                    field: 'id',
                    headerName: t('customersManage.bourseCodeCol'),
               },
               {
                    field: 'id',
                    headerName: t('customersManage.nationalCodeCol'),
               },
               {
                    field: 'id',
                    headerName: t('customersManage.purchasePowerCol'),
               },
               {
                    field: 'id',
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
                    // onRowSelected: onRowSelected,
                    onRowSelected(event) {
                         myGroupsSelectData.current = event.api.getSelectedRows();

                         setMyGroups(myGroupsSelectData.current);
                    },
                    rowHeight: 48,
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
                    loading={loading}
               />
          </div>
     );
};

export default MyGroupTable;