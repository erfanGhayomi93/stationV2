import AgGridTable from '@components/Table/AgGrid.tsx';
import { useMemo } from 'react';
import { ColDef } from '@ag-grid-community/core';
import { useTranslation } from 'react-i18next';
import { dateFormatter } from '@methods/helper.ts';
import ActionRenderer from './ActionRenderer.tsx';
import { useDeleteCart } from '@api/basket';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useModalStore } from '@store/modal';

interface IManageBasketOrderModalProps {
     data: ICartListRes[] | undefined;
     loading: boolean;
}

const ManageBasketOrderModal = ({ data, loading }: IManageBasketOrderModalProps) => {
     const { t } = useTranslation();

     const queryClient = useQueryClient();

     const { mutate } = useDeleteCart();

     const { setEditBasketOrderModal, setConfirmDeleteBasketOrderModal } = useModalStore();

     const onDeleteBasket = (data: ICartListRes) => {
          setConfirmDeleteBasketOrderModal({ basket: data });
     };

     const onEditBasket = (data: ICartListRes) => {
          setEditBasketOrderModal({ basket: data });
     };

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
                    },
               },
          ],
          []
     );

     return <AgGridTable tableHeight="20rem" columnDefs={COLUMNS_DEFS} loading={loading} rowData={data} />;
};

export default ManageBasketOrderModal;
