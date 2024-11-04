import { ColDef, RowSelectedEvent } from '@ag-grid-community/core';
import { useQueryTodayOrders } from '@api/order';
import { DeleteIcon, EditIcon, ExcelIcon } from '@assets/icons';
import AgGridTable from '@components/Table/AgGrid';
import AGHeaderSearchInput from '@components/Table/AGHeaderSearchInput';
import { Tab, TabGroup, TabList } from '@headlessui/react';
import { dateFormatter, sepNumbers } from '@methods/helper';
import { useUIStore } from '@store/ui';
import { useQueryClient } from '@tanstack/react-query';
import clsx from 'clsx';
import ipcMain from 'common/classes/IpcMain';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useModalStore } from 'store/modal';
import { useSymbolStore } from 'store/symbol';

interface ITodayOrdersWidgetProps {
     side: TSide;
}

const TodayOrdersWidget: FC<ITodayOrdersWidgetProps> = ({ side }) => {
     const { t } = useTranslation();

     const onOMSMessageHandlerRef = useRef<(message: Record<number, string>) => void>(() => {});

     const queryClient = useQueryClient();

     const [tabSelected, setTabSelected] = useState<TOrderStateRequestType>('OnBoard');

     const {
          setEditOrdersGroupModalSheet,
          setDeleteOrdersGroupModalSheet,
          editOrdersGroupModalSheet,
          deleteOrdersGroupModalSheet,
     } = useModalStore();

     const { selectedSymbol } = useSymbolStore();

     const { data: todayOrdersData, refetch: refetchTodayOrders } = useQueryTodayOrders({
          GtOrderStateRequestType: tabSelected,
          side: side,
          symbolISIN: selectedSymbol,
     });

     const { selectedOrders, setSelectedOrders } = useUIStore();

     const getSymbolGeneralInformationCache = () => {
          return JSON.parse(
               JSON.stringify(queryClient.getQueryData(['SymbolGeneralInformation', selectedSymbol]) ?? [])
          ) as ISymbolGeneralInformationRes;
     };

     const orderStatusIsntModify = ['OrderDone', 'Canceled', 'DeleteByEngine', 'Error', 'Expired', 'InOMSQueue', 'OnSending'];

     onOMSMessageHandlerRef.current = useMemo(
          () => (message: Record<number, string>) => {
               const omsClientKey = message[12];
               const omsOrderStatus = message[22] as TStatus;

               queryClient.setQueryData(['openOrders', 'OnBoard'], (oldData: IOpenOrder[] | undefined) => {
                    if (oldData) {
                         const orders = JSON.parse(JSON.stringify(oldData)) as IOpenOrder[];
                         const updatedOrder = orders.find(({ clientKey }) => clientKey === omsClientKey);

                         const index = orders.findIndex(({ clientKey }) => clientKey === omsClientKey);
                         if (index >= 0) {
                              orders[index] = { ...updatedOrder, orderState: omsOrderStatus } as IOpenOrder;
                         }

                         return [...orders];
                    }
               });

               if (orderStatusIsntModify.includes(omsOrderStatus)) {
                    const timerId = setTimeout(() => {
                         clearTimeout(timerId);
                         refetchTodayOrders();
                    }, 1000);
               }
          },
          []
     );

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

     const onRowSelected = (event: RowSelectedEvent<IOpenOrder>) => {
          if (!event.node.data) return;

          const data = event.node.data;

          if (event.node.isSelected()) {
               setSelectedOrders([...selectedOrders, data]);
          } else {
               const filterSelectedOrders = selectedOrders.filter(order => order.orderId !== data.orderId);
               setSelectedOrders(filterSelectedOrders);
          }
     };

     useEffect(() => {
          ipcMain.handle('onOMSMessageReceived', onOMSMessageHandlerRef.current);
     }, []);

     useEffect(() => {
          // Clear selected rows when `todayOrdersData` changes
          setSelectedOrders([]);
     }, [todayOrdersData]);

     return (
          <div className="grid h-full grid-rows-min-one">
               <div className="flex justify-between pb-4">
                    <TabGroup>
                         <TabList className="flex gap-x-4">
                              <Tab
                                   onClick={() => {
                                        setTabSelected('OnBoard');
                                        setSelectedOrders([]);
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
                                        setSelectedOrders([]);
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
                                   if (selectedOrders.length === 0 && side === side) return;
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
                              onClick={() => {
                                   if (selectedOrders.length === 0) return;

                                   setDeleteOrdersGroupModalSheet({
                                        side: side,
                                        symbolTitle: getSymbolGeneralInformationCache?.().symbolData.symbolTitle ?? '',
                                        data: selectedOrders,
                                   });
                              }}
                         >
                              <DeleteIcon className="size-6 text-icon-success" />
                         </button>

                         <ExcelIcon className="size-6 text-icon-success" />
                    </div>
               </div>

               <div className="h-full flex-1">
                    <AgGridTable
                         rowSelection={{
                              mode: 'multiRow',
                              isRowSelectable: data => !orderStatusIsntModify.includes(data.data?.orderState ?? ''),
                         }}
                         selectionColumnDef={{}}
                         rowData={todayOrdersData ?? []}
                         columnDefs={columnDefs}
                         onRowSelected={onRowSelected}
                         defaultColDef={{
                              flex: 1,
                         }}
                    />
               </div>
          </div>
     );
};

export default TodayOrdersWidget;
