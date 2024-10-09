import { ColDef } from '@ag-grid-community/core';
import { useQueryTodayOrders } from '@api/order';
import { DeleteIcon, EditIcon, ExcelIcon } from '@assets/icons';
import AgGridTable from '@components/Table/AgGrid';
import { dateFormatter, sepNumbers } from '@methods/helper';
import Button from '@uiKit/Button';
import { FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Actions } from './actions';

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

     console.log(data, 'data');

     const handleEditOnce = (row: IOpenOrder) => {
          // console.log('row', row)
     };

     const columnDefs = useMemo<ColDef[]>(
          () => [
               {
                    field: 'orderPlaceInPrice',
                    headerName: t('todayOrders.orderPlaceInPriceColumn'),
                    valueGetter: ({ data }) => (data?.orderPlaceInPrice ? sepNumbers(data?.orderPlaceInPrice) : '-'),
               },
               {
                    field: 'customerTitle ',
                    headerName: t('todayOrders.customerTitleColumn'),
                    valueGetter: ({ data }) => (data?.customerTitle ? data?.customerTitle : '-'),
               },
               {
                    field: 'bourseCode ',
                    headerName: t('todayOrders.bourseCodeColumn'),
                    valueGetter: ({ data }) => (data?.bourseCode ? data?.bourseCode : '-'),
               },
               {
                    field: 'quantity',
                    headerName: t('todayOrders.quantityColumn'),
                    valueGetter: ({ data }) => data?.quantity,
               },
               {
                    field: 'price',
                    headerName: t('todayOrders.priceColumn'),
                    valueGetter: ({ data }) => sepNumbers(data?.price),
               },
               {
                    field: 'remainingQuantity',
                    headerName: t('todayOrders.remainingQuantityColumn'),
                    valueGetter: ({ data }) => data?.remainingQuantity,
               },
               {
                    field: 'requestDate',
                    headerName: t('todayOrders.requestDateColumn'),
                    valueGetter: ({ data }) => dateFormatter(data?.requestDate),
                    width: 100,
                    cellClass: 'ltr',
               },
               {
                    field: 'orderState',
                    headerName: t('common.actionColumn'),
                    cellClass: '!overflow-visible',
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-expect-error
                    valueGetter: ({ data }) => t(`orderStatus.${data?.orderState}`),
                    // valueGetter: ({ data }) => data?.orderId,
                    // valueFormatter: ({ data }) =>
                    //     <div className="z-50">
                    //         <Actions<IOpenOrder>
                    //             row={row}
                    //             key={row.orderId}
                    //             handleEditOnce={handleEditOnce}
                    //         />

                    //     </div>
               },
               {
                    field: 'action',
                    headerName: t('todayOrders.actionColumn'),
                    // cellClass: '!overflow-visible',

                    // valueGetter: ({ data }) => data?.orderId,
                    // valueFormatter: ({ data }) =>
                    //     <div className="z-50">
                    //         <Actions<IOpenOrder>
                    //             row={row}
                    //             key={row.orderId}
                    //             handleEditOnce={handleEditOnce}
                    //         />

                    //     </div>
                    cellRenderer: Actions,
               },
          ],
          []
     );

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
                         >
                              {side === 'Buy' && t('orders.AllTodayOrdersBuy')}
                              {side === 'Sell' && t('orders.AllTodayOrdersSell')}
                         </Button>
                    </div>

                    <div className="flex items-center gap-x-6">
                         <EditIcon className="size-6 text-icon-success" />

                         <DeleteIcon className="size-6 text-icon-success" />

                         <ExcelIcon className="size-6 text-icon-success" />
                    </div>
               </div>

               <div className="flex-1">
                    <AgGridTable rowData={data ?? []} columnDefs={columnDefs} />
               </div>
          </div>
     );
};

export default TodayOrdersWidget;

// const data = [
//     {
//         "requestDate": "2024-08-14T11:29:24.6666667",
//         "hostOrderNumber": "2239",
//         "symbolISIN": "IRO1FOLD0001",
//         "userName": "Admin",
//         "customerISIN": "18990069635676",
//         "customerTitle": "سهیل خسروی",
//         "orderSide": "Buy",
//         "quantity": 1,
//         "value": 4065,
//         "price": 4065,
//         "symbolTitle": "فولاد",
//         "bourseCode": "خسر09625",
//         "remainingQuantity": 0,
//         "orderId": 5539428,
//         "orderState": "Canceled",
//         "orderVolume": 0,
//         "orderDateTime": "2024-08-14T11:29:24.6666667",
//         "marketUnit": null,
//         "triggerPrice": 0,
//         "orderOrigin": "Client",
//         "parentOrderId": 0,
//         "orderType": "LimitOrder",
//         "validity": "Day",
//         "validityDate": "0001-01-01T00:00:00",
//         "orderFrom": "BrokerTrader",
//         "orderAction": 0,
//         "orderMinimumQuantity": 0,
//         "clientKey": "84975ae3-847c-45a8-9f2b-85e747a6ffbe",
//         "expectedRemainingQuantity": 0,
//         "sumExecuted": 0,
//         "position": 0,
//         "valuePosition": 0,
//         "lastTradePrice": 0,
//         "lastErrorCode": null,
//         "customErrorMsg": null
//     },
//     {
//         "requestDate": "2024-08-14T11:20:47.7266667",
//         "hostOrderNumber": null,
//         "symbolISIN": "IRO1FOLD0001",
//         "userName": "Admin",
//         "customerISIN": "18990069635676",
//         "customerTitle": "سهیل خسروی",
//         "orderSide": "Buy",
//         "quantity": 1,
//         "value": 4065,
//         "price": 4065,
//         "symbolTitle": "فولاد",
//         "bourseCode": "خسر09625",
//         "remainingQuantity": 0,
//         "orderId": 5539426,
//         "orderState": "Error",
//         "orderVolume": 0,
//         "orderDateTime": "2024-08-14T11:20:47.7266667",
//         "marketUnit": null,
//         "triggerPrice": 0,
//         "orderOrigin": "Client",
//         "parentOrderId": 0,
//         "orderType": "LimitOrder",
//         "validity": "Day",
//         "validityDate": "0001-01-01T00:00:00",
//         "orderFrom": "BrokerTrader",
//         "orderAction": 0,
//         "orderMinimumQuantity": 0,
//         "clientKey": "84975ae3-847c-45a8-9f2b-85e747a6ffbe",
//         "expectedRemainingQuantity": 0,
//         "sumExecuted": 0,
//         "position": 0,
//         "valuePosition": 0,
//         "lastTradePrice": 0,
//         "lastErrorCode": "Group_not_authorized_for_this_Trader",
//         "customErrorMsg": null
//     },
//     {
//         "requestDate": "2024-08-14T11:18:50.36",
//         "hostOrderNumber": null,
//         "symbolISIN": "IRO1FOLD0001",
//         "userName": "Admin",
//         "customerISIN": "18990069635676",
//         "customerTitle": "سهیل خسروی",
//         "orderSide": "Buy",
//         "quantity": 1,
//         "value": 14458,
//         "price": 14458,
//         "symbolTitle": "فولاد",
//         "bourseCode": "خسر09625",
//         "remainingQuantity": 0,
//         "orderId": 5539425,
//         "orderState": "Error",
//         "orderVolume": 0,
//         "orderDateTime": "2024-08-14T11:18:50.36",
//         "marketUnit": null,
//         "triggerPrice": 0,
//         "orderOrigin": "Client",
//         "parentOrderId": 0,
//         "orderType": "LimitOrder",
//         "validity": "Day",
//         "validityDate": "0001-01-01T00:00:00",
//         "orderFrom": "BrokerTrader",
//         "orderAction": 0,
//         "orderMinimumQuantity": 0,
//         "clientKey": "84975ae3-847c-45a8-9f2b-85e747a6ffbe",
//         "expectedRemainingQuantity": 0,
//         "sumExecuted": 0,
//         "position": 0,
//         "valuePosition": 0,
//         "lastTradePrice": 0,
//         "lastErrorCode": "Group_not_authorized_for_this_Trader",
//         "customErrorMsg": null
//     },
//     {
//         "requestDate": "2024-08-14T11:17:21.0033333",
//         "hostOrderNumber": null,
//         "symbolISIN": "IRT3LABF0001",
//         "userName": "Admin",
//         "customerISIN": "18990069635676",
//         "customerTitle": "سهیل خسروی",
//         "orderSide": "Buy",
//         "quantity": 1,
//         "value": 14460.718104000001,
//         "price": 14458,
//         "symbolTitle": "لبخند",
//         "bourseCode": "خسر09625",
//         "remainingQuantity": 0,
//         "orderId": 5539424,
//         "orderState": "Error",
//         "orderVolume": 0,
//         "orderDateTime": "2024-08-14T11:17:21.0033333",
//         "marketUnit": null,
//         "triggerPrice": 0,
//         "orderOrigin": "Client",
//         "parentOrderId": 0,
//         "orderType": "LimitOrder",
//         "validity": "Day",
//         "validityDate": "0001-01-01T00:00:00",
//         "orderFrom": "BrokerTrader",
//         "orderAction": 0,
//         "orderMinimumQuantity": 0,
//         "clientKey": "84975ae3-847c-45a8-9f2b-85e747a6ffbe",
//         "expectedRemainingQuantity": 0,
//         "sumExecuted": 0,
//         "position": 0,
//         "valuePosition": 0,
//         "lastTradePrice": 0,
//         "lastErrorCode": "Group_not_authorized_for_this_Trader",
//         "customErrorMsg": null
//     },
//     {
//         "requestDate": "2024-08-14T11:12:38.17",
//         "hostOrderNumber": null,
//         "symbolISIN": "IRT3LABF0001",
//         "userName": "Admin",
//         "customerISIN": "18990069635676",
//         "customerTitle": "سهیل خسروی",
//         "orderSide": "Buy",
//         "quantity": 1,
//         "value": 14460.718104000001,
//         "price": 14458,
//         "symbolTitle": "لبخند",
//         "bourseCode": "خسر09625",
//         "remainingQuantity": 0,
//         "orderId": 5539421,
//         "orderState": "Error",
//         "orderVolume": 0,
//         "orderDateTime": "2024-08-14T11:12:38.17",
//         "marketUnit": null,
//         "triggerPrice": 0,
//         "orderOrigin": "Client",
//         "parentOrderId": 0,
//         "orderType": "LimitOrder",
//         "validity": "Day",
//         "validityDate": "0001-01-01T00:00:00",
//         "orderFrom": "BrokerTrader",
//         "orderAction": 0,
//         "orderMinimumQuantity": 0,
//         "clientKey": "84975ae3-847c-45a8-9f2b-85e747a6ffbe",
//         "expectedRemainingQuantity": 0,
//         "sumExecuted": 0,
//         "position": 0,
//         "valuePosition": 0,
//         "lastTradePrice": 0,
//         "lastErrorCode": "Group_not_authorized_for_this_Trader",
//         "customErrorMsg": null
//     }
// ]
