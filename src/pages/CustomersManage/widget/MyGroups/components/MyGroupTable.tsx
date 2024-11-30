import {
     ColDef,
     FirstDataRenderedEvent,
     GetDetailRowDataParams,
     GetRowIdParams,
     IDetailCellRendererParams,
} from '@ag-grid-community/core';
import { useDeleteCustomerFromGroup } from '@api/customer';
import AgGridTable from '@components/Table/AgGrid';
import useDarkMode from '@hooks/useDarkMode';
import { numFormatter } from '@methods/helper';
import { CustomersContext } from '@pages/CustomersManage/context';
import { useModalStore } from '@store/modal';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useContext, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import ActionRenderer from './ActionRender';
import { AgGridReact } from '@ag-grid-community/react';
// import ActionRenderer from '../ActionRenderer';

type TMyGroupTableProps = {
     data: IMyGroupsInformationRes[];
     loading?: boolean;
};

const MyGroupTable = ({ data, loading }: TMyGroupTableProps) => {
     const { t } = useTranslation();

     const gridRef = useRef<AgGridReact<IMyGroupsInformationRes>>(null);

     const queryClient = useQueryClient();

     const isDarkMode = useDarkMode();

     const { setMyGroups } = useContext(CustomersContext);

     const { setPortfolioCustomerModal, setAddCustomersToGroupModal } = useModalStore();

     const { mutate: deleteCustomerFromGroupMutate } = useDeleteCustomerFromGroup();

     const onPortfolioCustomers = (data: ICustomerAdvancedSearchRes) => {
          setPortfolioCustomerModal({ customer: data });
     };

     const onAddCustomerToGroups = (data: IMyGroupsCustomerInformation) => {
          setAddCustomersToGroupModal({ customers: [data?.customerISIN] });
     };

     const onDeleteCustomerToGroups = (data: IMyGroupsCustomerInformation) => {
          deleteCustomerFromGroupMutate(
               { groupId: data?.groupId, customerISINs: [data?.customerISIN] },
               {
                    onSuccess: () => {
                         queryClient.invalidateQueries({ queryKey: ['getMyGroupDefault'] });

                         toast.success(t('alerts.deleteCustomerFromGroupSuccessful'));
                    },

                    onError: () => {
                         toast.error(t('alerts.deleteCustomerFromGroupError'));
                    },
               }
          );
     };

     const getAllSelectedRows = useCallback(() => {
          const allSelectedRowsMap = new Map<string, IMyGroupsCustomerInformation>();

          gridRef.current?.api.forEachNode(node => {
               if (node.master && node.expanded) {
                    const detailGridInfo = gridRef.current?.api.getDetailGridInfo(`detail_${node.id}`);

                    if (detailGridInfo) {
                         const selectedDetailRows = detailGridInfo.api?.getSelectedRows();

                         selectedDetailRows?.forEach(row => {
                              if (row.customerISIN && !allSelectedRowsMap.has(row.customerISIN)) {
                                   allSelectedRowsMap.set(row.customerISIN, row);
                              }
                         });
                    }
               }
          });

          return Array.from(allSelectedRowsMap.values());
     }, []);

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
                                   onPortfolioCustomers,
                                   onAddCustomerToGroups,
                                   onDeleteCustomerToGroups,
                              },
                         },
                    ],
                    defaultColDef: {
                         flex: 1,
                    },
                    enableRtl: true,

                    onRowSelected(event) {
                         const selectedRows = getAllSelectedRows();

                         setMyGroups(selectedRows);
                    },
                    detailRowAutoHeight: true,

                    rowHeight: 40,
               },
               getDetailRowData: (params: GetDetailRowDataParams) => {
                    params.successCallback(params.data.children);
               },
          } as IDetailCellRendererParams<ICustomerAdvancedSearchRes, IMyGroupsCustomerInformation>;
     }, [isDarkMode, loading]);

     const isRowMaster = useCallback((dataItem: IMyGroupsInformationRes) => {
          return dataItem ? dataItem.children.length > 0 : false;
     }, []);

     const onFirstDataRendered = useCallback((params: FirstDataRenderedEvent) => {
          setTimeout(() => {
               params.api.getDisplayedRowAtIndex(0)!.setExpanded(true);
          }, 0);
     }, []);

     const getRowId = useCallback((params: GetRowIdParams) => {
          return String(params.data.id);
     }, []);

     return (
          <div className="col-span-2">
               <AgGridTable
                    ref={gridRef}
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
                    getRowId={getRowId}
                    keepDetailRows={true}
                    isRowMaster={isRowMaster}
                    onFirstDataRendered={onFirstDataRendered}
               />
          </div>
     );
};

export default MyGroupTable;
