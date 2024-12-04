import AgGridTable from '@components/Table/AgGrid.tsx';
import { useMemo } from 'react';
import { ColDef } from '@ag-grid-community/core';
import { useTranslation } from 'react-i18next';
import { dateFormatter } from '@methods/helper.ts';
import ActionRenderer from './ActionRenderer.tsx';
import { useModalStore } from '@store/modal';
import { useCreateBulkCartDetail } from '@api/basket/index.ts';
import useBuySellStore from 'common/widget/buySellWidget/context/buySellContext.tsx';
import { useCustomerStore } from '@store/customer/index.ts';
import { onErrorNotif, onSuccessNotif } from '@config/toastify/index.tsx';
import { useSymbolStore } from '@store/symbol/index.ts';

interface IManageBasketOrderModalProps {
     data: ICartListRes[] | undefined;
     loading: boolean;
}

const ManageBasketOrderModal = ({ data, loading }: IManageBasketOrderModalProps) => {
     const { t } = useTranslation();

     const { setEditBasketOrderModal, setConfirmDeleteBasketOrderModal, manageBasketOrderModal } = useModalStore();

     const { price, quantity, strategy, validity, validityDate, side } = useBuySellStore()

     const { selectedSymbol } = useSymbolStore()

     const { selectedCustomers } = useCustomerStore()

     const { mutate: mutateCreateBulk , isPending : loadingCreate } = useCreateBulkCartDetail()


     const onDeleteBasket = (data: ICartListRes) => {
          setConfirmDeleteBasketOrderModal({ basket: data });
     };

     const onEditBasket = (data: ICartListRes) => {
          setEditBasketOrderModal({ basket: data });
     };

     const onAddBasket = (data: ICartListRes) => {
          const res: ICreateBulkCartDetailReq[] = selectedCustomers.map(customer => ({
               cartID: data.id,
               customerISIN: customer.customerISIN,
               customerTitle: customer.title,
               symbolISIN: selectedSymbol,
               orderStrategy: strategy,
               price,
               quantity,
               side,
               validity,
               validityDate
          }))

          mutateCreateBulk(res, {
               onSuccess: () => {
                    onSuccessNotif({ title: `با موفقیت در ${data?.name} اضافه شد` })
               },
               onError: (e) => {
                    console.log({ e })
                    onErrorNotif({ title: 'انجام نشد' });
               }
          })
     }



     const COLUMNS_DEFS = useMemo<ColDef<ICartListRes>[]>(
          () => [
               {
                    headerName: t('manageBasketOrderModal.basketOrderNameCol'),
                    field: 'name',
               },
               {
                    headerName: t('manageBasketOrderModal.sendTimeCol'),
                    field: 'createDate',
                    valueGetter: ({ data }) => '\u200e' + dateFormatter(data?.createDate ?? 0, 'datetime'),
               },
               {
                    headerName: t('manageBasketOrderModal.actionCol'),
                    field: 'id',
                    cellRenderer: ActionRenderer,
                    cellRendererParams: {
                         onDeleteBasket,
                         onEditBasket,
                         onAddBasket,
                         isAdd: !!manageBasketOrderModal?.isAdd ,
                         loadingCreate : loadingCreate
                    },
               },
          ],
          [manageBasketOrderModal?.isAdd , loadingCreate]
     );

     return <AgGridTable
          tableHeight="20rem"
          columnDefs={COLUMNS_DEFS}
          loading={loading} 
          rowData={data}
     />;
};

export default ManageBasketOrderModal;
