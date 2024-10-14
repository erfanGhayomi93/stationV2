import { ColDef, RowSelectedEvent } from '@ag-grid-community/core';
import { useQueryTodayOrders } from '@api/order';
import { DeleteIcon, EditIcon, ExcelIcon } from '@assets/icons';
import AgGridTable from '@components/Table/AgGrid';
import AGHeaderSearchInput from '@components/Table/AGHeaderSearchInput';
import { dateFormatter, sepNumbers } from '@methods/helper';
import { useQueryClient } from '@tanstack/react-query';
import Button from '@uiKit/Button';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useModalStore } from 'store/modal';
import { useSymbolStore } from 'store/symbol';

interface ITodayOrdersWidgetProps {
     side: TSide;
}

const TodayOrdersWidget: FC<ITodayOrdersWidgetProps> = ({ side }) => {
     const { t } = useTranslation();

     const queryClient = useQueryClient();

     const [tabSelected, setTabSelected] = useState<TOrderStateRequestType>('OnBoard');

     const { setEditOrdersGroupModalSheet } = useModalStore();

     const { selectedSymbol } = useSymbolStore();

     const { data } = useQueryTodayOrders({
          GtOrderStateRequestType: tabSelected,
          side: side,
          symbolISIN: selectedSymbol,
     });

     const [selectedOrders, setSelectedOrder] = useState<IOpenOrder[]>([]);

     const handleEditOnce = (row: IOpenOrder) => {
          // console.log('row', row)
     };

     //  const getSymbolGeneralInformation = queryClient.getQueriesData(['SymbolGeneralInformation']);

     const getSymbolGeneralInformationCache = () => {
          return JSON.parse(
               JSON.stringify(queryClient.getQueryData(['SymbolGeneralInformation', selectedSymbol]) ?? [])
          ) as ISymbolGeneralInformationRes;
     };

     //  const ordersGroupDeleteResult = useGroupDeleteOrders({ ordersId });

     const columnDefs = useMemo<ColDef<IOpenOrder>[]>(
          () => [
               {
                    field: 'position',
                    headerName: t('todayOrders.orderPlaceInPriceColumn'),
                    valueGetter: ({ data }) => sepNumbers(data?.position),
               },
               {
                    field: 'customerTitle',
                    headerName: t('todayOrders.customerTitleColumn'),
                    valueGetter: ({ data }) => data?.customerTitle ?? '-',
                    headerComponent: AGHeaderSearchInput,
                    filter: 'text',
               },
               {
                    field: 'bourseCode',
                    headerName: t('todayOrders.bourseCodeColumn'),
                    valueGetter: ({ data }) => data?.bourseCode ?? '-',
                    headerComponent: AGHeaderSearchInput,
                    filter: 'text',
               },
               {
                    field: 'quantity',
                    headerName: t('todayOrders.quantityColumn'),
                    valueGetter: ({ data }) => sepNumbers(data?.quantity),
               },
               {
                    field: 'price',
                    headerName: t('todayOrders.priceColumn'),
                    valueGetter: ({ data }) => sepNumbers(data?.price),
               },
               {
                    field: 'remainingQuantity',
                    headerName: t('todayOrders.remainingQuantityColumn'),
                    valueGetter: ({ data }) => sepNumbers(data?.remainingQuantity),
               },
               {
                    field: 'requestDate',
                    headerName: t('todayOrders.requestDateColumn'),
                    valueGetter: ({ data }) => (data?.requestDate ? dateFormatter(data?.requestDate, 'date') : '-'),
                    cellClass: 'ltr',
               },
               {
                    field: 'orderState',
                    headerName: t('todayOrders.statusColumn'),
                    // valueGetter: ({ data }) => (data?.orderState ? t(`orderStatus.${data?.orderState}`) : '-'),
                    valueGetter: ({ data }) => (data?.orderState ? t(`orderStatus.${data?.orderState as TStatus}`) : '-'),

                    hide: tabSelected !== 'All' && true,
               },
          ],
          [tabSelected]
     );
     // {data?.exchange ? t(`exchange_type.${data?.exchange as ExchangeType}`) : '-'}

     const onRowSelected = (event: RowSelectedEvent<IOpenOrder>) => {
          if (!event.node.data) return;

          const data = event.node.data;

          if (event.node.isSelected()) {
               setSelectedOrder(prev => [...prev, data]);
          } else {
               const filterSelectedOrders = selectedOrders.filter(order => order.orderId !== data.orderId);
               setSelectedOrder(filterSelectedOrders);
          }
     };

     const orderStatusIsntModify = [
          'OrderDone',
          'Canceled',
          'DeleteByEngine',
          'Error',
          'Expired',
          'InOMSQueue',
          'OnSending',
          'OnCanceling',
     ];

     return (
          <div className="flex h-full flex-1 flex-col gap-4">
               <div className="flex justify-between">
                    <div className="flex gap-x-2">
                         <Button
                              variant={
                                   tabSelected === 'OnBoard' && side === 'Buy'
                                        ? 'primary'
                                        : tabSelected === 'OnBoard' && side === 'Sell'
                                             ? 'danger'
                                             : 'secondary'
                              }
                              onClick={() => setTabSelected('OnBoard')}
                              className="text-sm font-bold"
                         >
                              {side === 'Buy' && t('orders.openTodayOrdersBuy')}
                              {side === 'Sell' && t('orders.openTodayOrdersSell')}
                         </Button>

                         <Button
                              variant={
                                   tabSelected === 'All' && side === 'Buy'
                                        ? 'primary'
                                        : tabSelected === 'All' && side === 'Sell'
                                             ? 'danger'
                                             : 'secondary'
                              }
                              onClick={() => setTabSelected('All')}
                              className="text-sm font-medium"
                         >
                              {side === 'Buy' && t('orders.AllTodayOrdersBuy')}
                              {side === 'Sell' && t('orders.AllTodayOrdersSell')}
                         </Button>
                    </div>

                    <div className="flex items-center gap-x-6">
                         <button
                              onClick={() => {
                                   setEditOrdersGroupModalSheet({
                                        side: side,
                                        symbolTitle: getSymbolGeneralInformationCache?.().symbolData.symbolTitle ?? '',
                                        data: selectedOrders,
                                   });
                              }}
                         >
                              <EditIcon className="size-6 text-icon-success" />
                         </button>

                         <button
                         //   onClick={() => {
                         //        ordersGroupDeleteResult.mutate();
                         //   }}
                         >
                              <DeleteIcon className="size-6 text-icon-success" />
                         </button>

                         <ExcelIcon className="size-6 text-icon-success" />
                    </div>
               </div>

               <div className="flex-1">
                    <AgGridTable
                         rowSelection={{
                              mode: 'multiRow',
                              //   isRowSelectable: data => !orderStatusIsntModify.includes(data.data?.orderState ?? ''),
                         }}
                         selectionColumnDef={{}}
                         rowData={data ?? []}
                         columnDefs={columnDefs}
                         onRowSelected={onRowSelected}
                    />
               </div>
          </div>
     );
};

export default TodayOrdersWidget;
