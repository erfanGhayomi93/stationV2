import { ColDef, GetDetailRowDataParams, IDetailCellRendererParams } from '@ag-grid-community/core';
import AgGridTable from '@components/Table/AgGrid';
import useDarkMode from '@hooks/useDarkMode';
import { numFormatter } from '@methods/helper';
import { CustomersContext } from '@pages/CustomersManage/context';
import { useModalStore } from '@store/modal';
import { useContext, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ActionRenderer from './ActionRenderer';

type TCustomerGroupTableProps = {
     data: ICustomerAdvancedSearchRes[];
     loading: boolean;
};

const CustomerGroupTable = ({ data, loading }: TCustomerGroupTableProps) => {
     const { t } = useTranslation();

     const isDarkMode = useDarkMode();

     const { customerGroup, setCustomerGroup } = useContext(CustomersContext);

     const { setPortfolioCustomerModal, setAddCustomersToGroupModal } = useModalStore();

     const customerGroupSelectData = useRef<ICustomerAdvancedSearchRes[] | null>(null);

     const onPortfolioCustomer = (data: ICustomerAdvancedSearchRes) => {
          setPortfolioCustomerModal({ customer: data });
     };

     const onAddCustomerToGroups = (data: ICustomerAdvancedSearchRes) => {
          setAddCustomersToGroupModal({ customers: [data.customerISIN] });
     };

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
                              field: 'customerRemainAndOptionRemainDto.purchasePower',
                              headerName: t('customersManage.purchasePowerCol'),
                              valueFormatter: ({ data }) =>
                                   '\u200e' +
                                   numFormatter(data?.customerRemainAndOptionRemainDto.purchasePower ?? 0, true, false),
                              cellClassRules: {
                                   'text-content-error-sell': ({ data }) =>
                                        (data?.customerRemainAndOptionRemainDto.purchasePower ?? 0) < 0,
                              },
                         },
                         {
                              field: 'customerRemainAndOptionRemainDto.purchaseOptionPower',
                              headerName: t('customersManage.purchasePowerOptionCol'),
                              valueFormatter: ({ data }) =>
                                   '\u200e' +
                                   numFormatter(data?.customerRemainAndOptionRemainDto.purchaseOptionPower ?? 0, true, false),
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

                    defaultColDef: {
                         flex: 1,
                    },
                    enableRtl: true,
                    onRowSelected(event) {
                         const selectedRows = event.api.getSelectedRows();

                         customerGroupSelectData.current = [...(customerGroupSelectData.current ?? []), ...selectedRows];

                         const uniqueItems = Array.from(
                              new Map(customerGroupSelectData.current.map(item => [item.customerISIN, item])).values()
                         );

                         setCustomerGroup(uniqueItems);

                         customerGroupSelectData.current = uniqueItems;
                    },

                    rowHeight: 40,
                    detailRowAutoHeight: true,
               },

               getDetailRowData: (params: GetDetailRowDataParams) => {
                    params.successCallback(params.data.children);
               },
          } as IDetailCellRendererParams<ICustomerAdvancedSearchRes, ICustomerAdvancedSearchRes>;
     }, [isDarkMode]);

     return (
          <div className="col-span-2">
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
                    detailRowAutoHeight
               />
          </div>
     );
};

export default CustomerGroupTable;
