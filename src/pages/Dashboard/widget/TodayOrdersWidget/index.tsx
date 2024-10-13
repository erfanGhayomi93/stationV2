import { ColDef, RowSelectedEvent } from '@ag-grid-community/core';
import { useGroupDeleteOrders, useQueryTodayOrders } from '@api/order';
import { DeleteIcon, EditIcon, ExcelIcon } from '@assets/icons';
import AgGridTable from '@components/Table/AgGrid';
import AGHeaderSearchInput from '@components/Table/AGHeaderSearchInput';
import { dateFormatter, sepNumbers } from '@methods/helper';
import Button from '@uiKit/Button';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ITodayOrdersWidgetProps {
     side: TSide;
}

const TodayOrdersWidget: FC<ITodayOrdersWidgetProps> = ({ side }) => {
     const { t } = useTranslation();

     const [tabSelected, setTabSelected] = useState<TOrderStateRequestType>('OnBoard');

     const { data } = useQueryTodayOrders({
          GtOrderStateRequestType: tabSelected,
          side: side,
     });

     const [ordersId, setOrdersId] = useState<number[]>([]);

     const handleEditOnce = (row: IOpenOrder) => {
          // console.log('row', row)
     };

     const ordersGroupDeleteResult = useGroupDeleteOrders({ ordersId });

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
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-expect-error
                    valueGetter: ({ data }) => (data?.orderState ? t(`orderStatus.${data?.orderState}`) : '-'),
                    hide: tabSelected !== 'All' && true,
               },
          ],
          [tabSelected]
     );

     const onRowSelected = (event: RowSelectedEvent<IOpenOrder>) => {
          if (!event.node.data) return;

          const orderId = event.node.data?.orderId;

          if (event.node.isSelected()) {
               setOrdersId(prev => [...prev, orderId]);
          } else {
               const filterOrdersId = ordersId.filter(order => order !== orderId);
               setOrdersId(filterOrdersId);
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
                         <EditIcon className="size-6 text-icon-success" />

                         <button
                              onClick={() => {
                                   ordersGroupDeleteResult.mutate();
                              }}
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
                              isRowSelectable: data => !orderStatusIsntModify.includes(data.data?.orderState ?? ''),
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
