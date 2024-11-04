import { ColDef } from '@ag-grid-community/core';
import { useQueryDoneOrders } from '@api/order';
import { ExcelIcon } from '@assets/icons';
import AgGridTable from '@components/Table/AgGrid';
import AGHeaderSearchInput from '@components/Table/AGHeaderSearchInput';
import { sepNumbers } from '@methods/helper';
import Button from '@uiKit/Button';
import ToggleSwitch from '@uiKit/ToggleSwitch';
import ipcMain from 'common/classes/IpcMain';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSymbolStore } from 'store/symbol';
// import { Actions } from './actions';

interface ITodayTradesWidgetProps {}

const TodayTradesWidget: FC<ITodayTradesWidgetProps> = () => {
     const { t } = useTranslation();

     const onOMSMessageHandlerRef = useRef<(message: Record<number, string>) => void>(() => {});

     const timeout = useRef<NodeJS.Timeout | undefined>();

     const [isAggregate, setIsAggregate] = useState(true);

     const selectedSymbol = useSymbolStore(state => state.selectedSymbol);

     const { data, refetch } = useQueryDoneOrders({
          symbolISIN: selectedSymbol,
          ...(isAggregate && { aggregateType: 'both' }),
     });

     const columnDefs = useMemo<ColDef<IDoneOrdersRes>[]>(
          () => [
               {
                    field: 'customerTitle',
                    headerName: t('todayTrades.customerColumn'),
                    headerComponent: AGHeaderSearchInput,
                    filter: 'text',
               },
               {
                    field: 'bourseCode',
                    headerName: t('todayTrades.bourseCodeColumn'),
                    headerComponent: AGHeaderSearchInput,
                    filter: 'text',
               },
               {
                    field: 'orderSide',
                    headerName: t('todayTrades.sideColumn'),
                    valueGetter: ({ data }) => t(`common.${data?.orderSide.toLowerCase()}`, '-'),
                    cellClassRules: {
                         'text-content-success-buy': ({ data }) => data?.orderSide === 'Buy',
                         'text-content-error-sell': ({ data }) => data?.orderSide === 'Sell',
                    },
               },
               {
                    field: 'quantity',
                    headerName: t('todayTrades.volumeColumn'),
                    valueGetter: ({ data }) => (data?.quantity ? sepNumbers(data?.quantity) : '-'),
               },
               {
                    field: 'totalPrice',
                    headerName: t('todayTrades.averagePriceColumn'),
                    valueGetter: ({ data }) => (data?.totalPrice ? sepNumbers(data?.totalPrice) : '-'),
               },
               {
                    field: 'totalPrice',
                    headerName: t('todayTrades.valueTradeColumn'),
                    valueGetter: ({ data }) => (data?.totalPrice ? sepNumbers(data?.totalPrice) : '-'),
               },
               {
                    field: 'orderFrom',
                    headerName: t('todayTrades.sourceColumn'),
               },
          ],
          []
     );

     const refetchDoneOrder = () => {
          timeout.current = setTimeout(() => {
               refetch();
               clearTimeout(timeout.current);
          }, 2000);
     };

     onOMSMessageHandlerRef.current = useMemo(
          () => message => {
               const omsOrderStatus = message[22] as TStatus;

               if (['DeleteByEngine', 'PartOfTheOrderDone', 'OrderDone', 'OnCancelingWithBroker'].includes(omsOrderStatus)) {
                    clearTimeout(timeout.current);
                    refetchDoneOrder();
               }
          },
          []
     );

     useEffect(() => {
          ipcMain.handle('onOMSMessageReceived', onOMSMessageHandlerRef.current);

          return () => {
               ipcMain.removeAllHandlers('onOMSMessageReceived');
          };
     }, []);

     return (
          <div className="flex h-full flex-1 flex-col gap-2">
               <div className="flex justify-between">
                    <div className="flex items-center gap-6">
                         <Button variant="label" className="h-10 w-[147px] font-bold">
                              {t('todayTrades.tradesTab')}
                         </Button>
                         <ToggleSwitch
                              label={t('todayTrades.displayBasedOnAggregate')}
                              checked={isAggregate}
                              onChange={() => setIsAggregate(prev => !prev)}
                         />
                    </div>

                    <div className="flex items-center gap-x-6">
                         <ExcelIcon className="size-6 text-icon-success" />
                    </div>
               </div>

               <div className="flex-1">
                    <AgGridTable rowData={data ?? []} columnDefs={columnDefs} />
               </div>
          </div>
     );
};

export default TodayTradesWidget;
