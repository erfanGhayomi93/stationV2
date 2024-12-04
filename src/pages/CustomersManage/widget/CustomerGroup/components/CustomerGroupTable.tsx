import {
     ColDef,
     FirstDataRenderedEvent,
     GetDetailRowDataParams,
     GetRowIdParams,
     IDetailCellRendererParams,
} from '@ag-grid-community/core';
import AgGridTable from '@components/Table/AgGrid';
import useDarkMode from '@hooks/useDarkMode';
import { numFormatter } from '@methods/helper';
import { CustomersContext } from '@pages/CustomersManage/context';
import { useModalStore } from '@store/modal';
import { useCallback, useContext, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ActionRenderer from './ActionRenderer';
import { AgGridReact } from '@ag-grid-community/react';

type TCustomerGroupTableProps = {
     data: ICustomerAdvancedSearchRes[];
     loading: boolean;
};

const CustomerGroupTable = ({ data, loading }: TCustomerGroupTableProps) => {
     const { t } = useTranslation();

     const gridRef = useRef<AgGridReact<ICustomerAdvancedSearchRes>>(null);

     const isDarkMode = useDarkMode();

     const { setCustomerGroup } = useContext(CustomersContext);

     const { setPortfolioCustomerModal, setAddCustomersToGroupModal } = useModalStore();

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

     const getAllSelectedRows = useCallback(() => {
          const allSelectedRowsMap = new Map<string, ICustomerAdvancedSearchRes>();

          gridRef.current?.api.forEachNode(node => {
               if (node.master) {
                    const detailGridInfo = gridRef.current?.api.getDetailGridInfo(`detail_${node.id}`);

                    if (detailGridInfo) {
                         const selectedDetailRows = detailGridInfo.api?.getSelectedRows();

                         console.log(selectedDetailRows, 'selectedDetailRows');

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
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    onRowSelected(event) {
                         const selectedRows = getAllSelectedRows();

                         setCustomerGroup(selectedRows);
                    },

                    rowHeight: 40,
               },

               getDetailRowData: (params: GetDetailRowDataParams) => {
                    params.successCallback(params.data.children);
               },
          } as IDetailCellRendererParams<ICustomerAdvancedSearchRes, ICustomerAdvancedSearchRes>;
     }, [isDarkMode]);

     const isRowMaster = useCallback((dataItem: ICustomerAdvancedSearchRes) => {
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
          <div className="col-span-2 h-full w-full">
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
                    // isRowMaster={isRowMaster}
                    onFirstDataRendered={onFirstDataRendered}
               />
          </div>
     );
};

export default CustomerGroupTable;
