import { ColDef } from '@ag-grid-community/core';
import AgGrid from '@components/Table/AgGrid';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ActionRenderer from '@pages/Basket/components/ActionRenderer.tsx';
import { useDeleteDetails } from '@api/basket';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import useSendOrders from '@hooks/useSendOrders';
import { uid } from '@methods/helper';

interface IMainContentProps {
     data?: IDetailsCartRes[];
}

interface Customer {
     customerTitle: string;
}

interface Data {
     value: Customer[];
}

export const valueFormatterCustomerTitle = (data: Data): string => {
     const customerTitles = data.value.map(item => item.customerTitle);
     return customerTitles.join(', ');
};

const MainContent: FC<IMainContentProps> = ({ data }) => {
     const { t } = useTranslation();

     const queryClient = useQueryClient();

     const { mutate, isPending } = useDeleteDetails();

     const { sendOrders, ordersLoading } = useSendOrders()

     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     const onSendOrder = (data: IDetailsCartRes) => {
          if (data) {
               const order: ICreateOrderReq =
               {
                    id: uid(),
                    customerISIN: [data.customerISIN],
                    customerTitle: [data.customers[0].customerTitle],
                    CustomerTagId: [],
                    GTTraderGroupId: [],
                    orderSide: data.side,
                    orderDraftId: undefined,
                    orderStrategy: data.orderStrategy,
                    orderType: 'LimitOrder',
                    percent: 0,
                    price: data.price,
                    quantity: data.quantity,
                    symbolISIN: data.symbolISIN,
                    validity: data.validity,
                    validityDate: data.validityDate
               }

               sendOrders([order])
          }
     };

     const onDeleteOrder = (data: IDetailsCartRes) => {
          mutate(
               { cartDetailId: data.id },
               {
                    onSuccess: () => {
                         toast.success(t('alerts.deleteOrderToBasketOrderSuccessful'));

                         queryClient.refetchQueries({ queryKey: ['detailsCard'] });
                    },

                    onError: () => {
                         toast.error(t('alerts.deleteOrderToBasketOrderError'));
                    },
               }
          );
     };

     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     const onEditOrder = (data: IDetailsCartRes) => {
          //
     };

     const columns = useMemo(
          (): ColDef<IDetailsCartRes>[] => [
               { headerName: t('basketOrder.customerNameCol'), field: 'customers', valueFormatter: valueFormatterCustomerTitle },
               { headerName: t('basketOrder.bourseCode'), field: 'bourseCode' },
               { headerName: t('basketOrder.symbolTitleCol'), field: 'symbolTitle' },
               {
                    headerName: t('basketOrder.sideCol'),
                    field: 'side',
                    valueFormatter: ({ value }) => t(`common.${value as TSide}`),
               },
               { headerName: t('basketOrder.priceCol'), field: 'price', type: 'sepratedNumber' },
               { headerName: t('basketOrder.quantityCol'), field: 'quantity', type: 'sepratedNumber' },
               {
                    headerName: t('basketOrder.lastPriceCol'),
                    field: 'lastTradedPrice',
                    // cellRenderer: LastTradedPrice,
                    type: 'sepratedNumber',
                    maxWidth: 140,
               },
               {
                    headerName: t('basketOrder.actionCol'),
                    field: 'cartID',
                    sortable: false,
                    lockVisible: true,
                    pinned: 'left',
                    cellRenderer: ActionRenderer,
                    cellRendererParams: {
                         onSendOrder,
                         onEditOrder,
                         onDeleteOrder,
                         ordersLoading,
                         isLoadingDelete: isPending
                    },
               },
          ],
          [ordersLoading, isPending]
     );

     return (
          <div className="h-full">
               <AgGrid columnDefs={columns} rowData={data} />
          </div>
     );
};

export default MainContent;
