import { ColDef } from '@ag-grid-community/core';
import { useQueryTodayOrders } from '@api/order';
import { DeleteIcon, EditIcon, ExcelIcon } from '@assets/icons';
import AgGridTable from '@components/Table/AgGrid';
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

     const handleEditOnce = (row: IOpenOrder) => {
          // console.log('row', row)
     };

     const columnDefs = useMemo<ColDef<IOpenOrder>[]>(
          () => [
               {
                    field: 'orderPlaceInPrice',
                    headerName: t('todayOrders.orderPlaceInPriceColumn'),
                    valueGetter: ({ data }) => (data?.orderPlaceInPrice ? sepNumbers(data?.orderPlaceInPrice) : '-'),
               },
               {
                    field: 'customerTitle',
                    headerName: t('todayOrders.customerTitleColumn'),
                    valueGetter: ({ data }) => (data?.customerTitle ? data?.customerTitle : '-'),
               },
               {
                    field: 'bourseCode',
                    headerName: t('todayOrders.bourseCodeColumn'),
                    valueGetter: ({ data }) => (data?.bourseCode ? data?.bourseCode : '-'),
               },
               {
                    field: 'quantity',
                    headerName: t('todayOrders.quantityColumn'),
                    valueGetter: ({ data }) => (data?.quantity ? sepNumbers(data?.quantity) : '-'),
               },
               {
                    field: 'price',
                    headerName: t('todayOrders.priceColumn'),
                    valueGetter: ({ data }) => (data?.price ? sepNumbers(data?.price) : '-'),
               },
               {
                    field: 'remainingQuantity',
                    headerName: t('todayOrders.remainingQuantityColumn'),
                    valueGetter: ({ data }) => (data?.remainingQuantity ? sepNumbers(data?.remainingQuantity) : '-'),
               },
               {
                    field: 'requestDate',
                    headerName: t('todayOrders.requestDateColumn'),
                    valueGetter: ({ data }) => (data?.requestDate ? dateFormatter(data?.requestDate, 'date') : '-'),
                    cellClass: 'ltr',
               },
               {
                    field: 'orderStatus',
                    headerName: t('common.actionColumn'),
                    cellClass: '!overflow-visible',
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    //@ts-expect-error
                    valueGetter: ({ data }) => (data?.orderStatus ? t(`orderStatus.${data?.orderStatus}`) : '-'),
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
