import { ColDef } from '@ag-grid-community/core';
import AgGrid from '@components/Table/AgGrid';
import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import ActionRenderer from '@pages/Basket/components/ActionRenderer.tsx';
import { useDeleteDetails } from '@api/basket';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

interface IMainContentProps {
     data?: IDetailsCartRes[];
}

export const valueFormatterCustomerTitle = (data: any) => {
     const customerTitle = data.value.map((item: any) => item.customerTitle);

     return String(customerTitle);
};

const MainContent: FC<IMainContentProps> = ({ data }) => {
     const { t } = useTranslation();

     const queryClient = useQueryClient();

     const { mutate } = useDeleteDetails();

     const onSendOrder = (data: IDetailsCartRes) => {
          //
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

     const onEditOrder = (data: IDetailsCartRes) => {
          //
     };

     const columns = useMemo(
          (): ColDef<IDetailsCartRes>[] => [
               { headerName: t('basketOrder.customerNameCol'), field: 'customers', valueFormatter: valueFormatterCustomerTitle },
               { headerName: t('basketOrder.symbolTitleCol'), field: 'symbolTitle' },
               {
                    headerName: t('basketOrder.sideCol'),
                    field: 'side',
                    valueFormatter: ({ value }) => t(`common.${value as TSide}`),
               },
               { headerName: t('basketOrder.priceCol'), field: 'price', type: 'sepratedNumber' },
               {
                    headerName: t('basketOrder.lastPriceCol'),
                    field: 'lastTradedPrice',
                    // cellRenderer: LastTradedPrice,
                    type: 'sepratedNumber',
                    maxWidth: 140,
               },
               { headerName: t('basketOrder.percentCol'), field: 'percent' },
               { headerName: t('basketOrder.quantityCol'), field: 'quantity', type: 'sepratedNumber' },
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
                    },
               },
          ],
          []
     );

     return (
          <div className="h-full">
               <AgGrid columnDefs={columns} rowData={data} />
          </div>
     );
};

export default MainContent;
