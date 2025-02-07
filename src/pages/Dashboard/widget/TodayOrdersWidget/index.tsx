import { ColDef, SelectionChangedEvent } from '@ag-grid-community/core';
import { useQueryTodayOrders } from '@api/order';
import { DeleteIcon, EditIcon, ExcelIcon } from '@assets/icons';
import AgGridTable from '@components/Table/AgGrid';
import AGHeaderSearchInput from '@components/Table/AGHeaderSearchInput';
import { Tab, TabGroup, TabList } from '@headlessui/react';
import { dateFormatter, sepNumbers, zeroPad } from '@methods/helper';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import ipcMain from 'common/classes/IpcMain';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useModalStore } from 'store/modal';
import { useSymbolStore } from 'store/symbol';
import OrderStateRenderer from './OrderStateRenderer';
import { subscribeOrderInPrice } from '@LS/subscribes';
import { pushEngine } from '@LS/pushEngine';
import UseDebounceOutput from '@hooks/useDebounceOutput';
import HostOrderNumberRenderer from './hostOrderNumber';

interface ITodayOrdersWidgetProps {
     side: TSide;
}

const TodayOrdersWidget: FC<ITodayOrdersWidgetProps> = ({ side }) => {
     const { t } = useTranslation();

     const onOMSMessageHandlerRef = useRef<(message: Record<number, string>) => void>(() => { });

     const queryClient = useQueryClient();

     const [tabSelected, setTabSelected] = useState<TOrderStateRequestType>('OnBoard');

     const { setEditOrdersGroupModalSheet, setDeleteOrdersGroupModalSheet } = useModalStore();

     const ordersGroupSelectData = useRef<IOpenOrder[] | null>(null);

     const { selectedSymbol } = useSymbolStore();

     const refData = useRef<IOpenOrder[]>()

     const { setDebounce } = UseDebounceOutput();

     const { data: todayOrdersData, refetch: refetchTodayOrders, isSuccess } = useQueryTodayOrders({
          GtOrderStateRequestType: tabSelected,
          side: side,
          symbolISIN: selectedSymbol,
     });

     const getSymbolGeneralInformationCache = () => {
          return JSON.parse(
               JSON.stringify(queryClient.getQueryData(['SymbolGeneralInformation', selectedSymbol]) ?? [])
          ) as ISymbolGeneralInformationRes;
     };

     const orderStatusIsntModify = ['OrderDone', 'Canceled', 'DeleteByEngine', 'Error', 'Expired', 'InOMSQueue', 'OnSending'];

     const refreshStatus = [
          'OnBoard',
          'OrderDone',
          'Canceled',
          'DeleteByEngine',
          'Error',
          'Expired',
          'InOMSQueue',
          'OnBoardModify',
          'PartOfTheOrderDone',
          'OnModifyError',
          'OnCancelError',
          'OnCancelingWithBroker',
          'RejectByGAP',
          'TradeCancel',
     ];

     onOMSMessageHandlerRef.current = useMemo(
          () => (message: Record<number, string>) => {
               const omsOrderStatus = message[22] as TStatus;

               if (refreshStatus.includes(omsOrderStatus)) {
                    setDebounce(() => {
                         refetchTodayOrders();
                    }, 200)
               }
          },
          []
     );

     const columnDefs = useMemo<ColDef<IOpenOrder>[]>(
          () => [
               {
                    field: 'orderPlaceInPrice',
                    headerName: 'جایگاه لحظه‌ای',
                    valueGetter: ({ data }) => data?.orderPlaceInPrice ? sepNumbers(data?.orderPlaceInPrice) : '-',
                    cellRenderer: HostOrderNumberRenderer,
                    hide: tabSelected !== 'OnBoard'
               },
               // {
               //      field: 'orderVolumeInPrice',
               //      headerName: 'حجم پیش‌رو',
               //      valueGetter: ({ data }) => data?.orderVolumeInPrice ? sepNumbers(data?.orderVolumeInPrice) : "-",
               // },
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
                    hide: tabSelected !== 'All',
                    cellRenderer: OrderStateRenderer,
               },
          ],
          [tabSelected]
     );

     const onRowSelected = (event: SelectionChangedEvent<IOpenOrder>) => {
          ordersGroupSelectData.current = event.api.getSelectedRows();
     };

     const updateOnHostOrderNumber = ({ itemName, changedFields }: { itemName: string, changedFields: IhostOrderNumberSub }) => {
          if (itemName) {
               const symbolISINItem = itemName.split('_')[1];
               const sideItem = itemName.split('_')[2];
               const hostOrderNumberItem = itemName.split('_')[3];

               queryClient.setQueryData([
                    'openOrders' + tabSelected + selectedSymbol + side,
               ], (oldData: IOpenOrder[] | undefined) => {
                    if (oldData) {
                         const orders = JSON.parse(JSON.stringify(oldData)) as IOpenOrder[];
                         const updatedOrder = orders.find((data) => data.symbolISIN === symbolISINItem && data.orderSide === sideItem && data.hostOrderNumber === hostOrderNumberItem) as IOpenOrder
                         const index = orders.findIndex((data) => data.symbolISIN === symbolISINItem && data.orderSide === sideItem && data.hostOrderNumber === hostOrderNumberItem);

                         if (index >= 0) {
                              orders[index] = {
                                   ...updatedOrder,
                                   orderPlaceInPrice: changedFields?.orderPlaceInPrice ? changedFields.orderPlaceInPrice : updatedOrder.orderPlaceInPrice,
                                   orderVolumeInPrice: changedFields?.orderVolumeInPrice ? changedFields.orderVolumeInPrice : updatedOrder.orderVolumeInPrice,
                              };

                              return [...orders];
                         }
                    }
               })
          }
     }

     useEffect(() => {
          refData.current = todayOrdersData
     }, [todayOrdersData])


     useEffect(() => {
          ipcMain.handle('onOMSMessageReceived', onOMSMessageHandlerRef.current);
     }, []);

     useEffect(() => {
          if (isSuccess && !!todayOrdersData?.length) {

               const id = 'subscribeOrderInPrice'
               const items: string[] = [];

               for (const order of todayOrdersData) {
                    const { symbolISIN, orderSide, hostOrderNumber, orderDateTime } = order;
                    const d = new Date(orderDateTime)
                    const msDate = `${d.getFullYear()}${zeroPad(String(d.getMonth() + 1))}${zeroPad(String(d.getDate()))}`;

                    const item = "ms_" + symbolISIN + "_" + orderSide + "_" + hostOrderNumber + "_" + msDate;
                    if (orderSide && hostOrderNumber && orderDateTime) items.push(item);
               }


               if (items.length === 0) return;

               subscribeOrderInPrice<IhostOrderNumberSub>({
                    id,
                    items,
                    onItemUpdate(updatedFields) {
                         updateOnHostOrderNumber(updatedFields)
                    },
               })

               return () => {
                    pushEngine.unSubscribe(id)
               }
          }
     }, [isSuccess, todayOrdersData?.length])

     return (
          <div className="grid h-full grid-rows-min-one">
               <div className="flex justify-between pb-2">
                    <TabGroup>
                         <TabList className="flex gap-x-4">
                              <Tab
                                   onClick={() => {
                                        setTabSelected('OnBoard');
                                   }}
                                   className={clsx(
                                        'h-10 w-[147px] rounded-lg text-sm font-medium transition-colors focus:outline-none data-[focus]:outline-none',
                                        {
                                             'bg-button-tab-deactive text-content-deselecttab data-[selected]:bg-back-green data-[selected]:font-bold data-[selected]:text-content-success-buy':
                                                  side === 'Buy',
                                             'bg-button-tab-deactive text-content-deselecttab data-[selected]:bg-back-red data-[selected]:font-bold data-[selected]:text-content-error-sell':
                                                  side === 'Sell',
                                        }
                                   )}
                              >
                                   {side === 'Buy' && t('orders.openTodayOrdersBuy')}
                                   {side === 'Sell' && t('orders.openTodayOrdersSell')}
                              </Tab>
                              <Tab
                                   onClick={() => {
                                        setTabSelected('All');
                                   }}
                                   className={clsx(
                                        'h-10 w-[147px] rounded-lg text-sm font-medium transition-colors focus:outline-none data-[focus]:outline-none',
                                        {
                                             'bg-button-tab-deactive text-content-deselecttab data-[selected]:bg-back-green data-[selected]:font-bold data-[selected]:text-content-success-buy':
                                                  side === 'Buy',
                                             'bg-button-tab-deactive text-content-deselecttab data-[selected]:bg-back-red data-[selected]:font-bold data-[selected]:text-content-error-sell':
                                                  side === 'Sell',
                                        }
                                   )}
                              >
                                   {side === 'Buy' && t('orders.AllTodayOrdersBuy')}
                                   {side === 'Sell' && t('orders.AllTodayOrdersSell')}
                              </Tab>
                         </TabList>
                    </TabGroup>

                    <div className="flex items-center gap-x-6">
                         <button
                              onClick={() => {
                                   if (
                                        (ordersGroupSelectData.current?.length === 0 || !ordersGroupSelectData.current) &&
                                        side === side
                                   )
                                        return;
                                   setEditOrdersGroupModalSheet({
                                        side: side,
                                        symbolTitle: getSymbolGeneralInformationCache?.().symbolData.symbolTitle ?? '',
                                        data: ordersGroupSelectData?.current ?? [],
                                   });
                              }}
                         >
                              <EditIcon className="size-6 text-icon-success" />
                         </button>

                         <button
                              onClick={() => {
                                   if (
                                        (ordersGroupSelectData.current?.length === 0 || !ordersGroupSelectData.current) &&
                                        side === side
                                   )
                                        return;

                                   setDeleteOrdersGroupModalSheet({
                                        side: side,
                                        symbolTitle: getSymbolGeneralInformationCache?.().symbolData.symbolTitle ?? '',
                                        data: ordersGroupSelectData?.current ?? [],
                                   });
                              }}
                         >
                              <DeleteIcon className="size-6 text-icon-success" />
                         </button>

                         <button disabled className="disabled:opacity-60">
                              <ExcelIcon className="size-6 text-icon-success" />
                         </button>
                    </div>
               </div>

               <div className="h-full flex-1">
                    <AgGridTable
                         rowSelection={{
                              mode: 'multiRow',
                              isRowSelectable: data => !orderStatusIsntModify.includes(data.data?.orderState ?? ''),
                              enableClickSelection: true,
                         }}
                         selectionColumnDef={{}}
                         rowData={todayOrdersData ?? []}
                         columnDefs={columnDefs}
                         onSelectionChanged={onRowSelected}
                    />
               </div>
          </div>
     );
};

export default TodayOrdersWidget;
