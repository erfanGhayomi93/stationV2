import { ColDef } from '@ag-grid-community/core';
import { useDeleteGroupOrder } from '@api/order';
import { DeleteIcon } from '@assets/icons';
import AgGridTable from '@components/Table/AgGrid';
import { dateFormatter, sepNumbers } from '@methods/helper';
import { useModalStore } from '@store/modal';
import Button from '@uiKit/Button';
import clsx from 'clsx';
import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import Modal from '..';

const DeleteOrdersGroupModal = () => {
     const { t } = useTranslation();

     const { deleteOrdersGroupModalSheet, setDeleteOrdersGroupModalSheet } = useModalStore();

     const onCloseModal = () => {
          setDeleteOrdersGroupModalSheet(null);
     };

     const { mutate: mutateDeleteGroupOrder } = useDeleteGroupOrder();

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
               },
               {
                    field: 'bourseCode',
                    headerName: t('todayOrders.bourseCodeColumn'),
                    valueGetter: ({ data }) => data?.bourseCode ?? '-',
               },
               {
                    field: 'remainingQuantity',
                    headerName: t('todayOrders.volumeColumn'),
                    valueGetter: ({ data }) => sepNumbers(data?.remainingQuantity),
               },
               {
                    field: 'price',
                    headerName: t('todayOrders.priceColumn'),
                    valueGetter: ({ data }) => sepNumbers(data?.price),
               },
               {
                    field: 'requestDate',
                    headerName: t('todayOrders.requestDateColumn'),
                    valueGetter: ({ data }) => (data?.requestDate ? dateFormatter(data?.requestDate, 'date') : '-'),
                    cellClass: 'ltr',
               },
          ],
          []
     );

     const history = useMemo(() => {
          if (!deleteOrdersGroupModalSheet) return [];

          return deleteOrdersGroupModalSheet.data;
     }, [deleteOrdersGroupModalSheet]);

     const handleDeleteSelected = () => {
          if (!deleteOrdersGroupModalSheet) return;

          const payload = deleteOrdersGroupModalSheet?.data?.map(item => item.orderId);

          mutateDeleteGroupOrder(payload);

          onCloseModal();
     };

     return (
          <Modal
               title={
                    <Trans
                         i18nKey="todayOrders.delete_order_group"
                         components={{
                              span1: (
                                   <span
                                        className={clsx('font-bold', {
                                             'text-content-success-buy': deleteOrdersGroupModalSheet?.side === 'Buy',
                                             'text-content-error-sell': deleteOrdersGroupModalSheet?.side === 'Sell',
                                        })}
                                   />
                              ),
                              span2: <span className="font-bold" />,
                         }}
                         values={{
                              side: t(`common.${deleteOrdersGroupModalSheet?.side ?? 'Buy'}`),
                              symbol: deleteOrdersGroupModalSheet?.symbolTitle,
                         }}
                    />
               }
               onCloseModal={onCloseModal}
               size="md"
          >
               <div className="flex h-full flex-col gap-10">
                    <div className="flex-1">
                         <AgGridTable
                              readOnlyEdit={false}
                              tableHeight="10rem"
                              columnDefs={columnDefs}
                              rowData={history}
                              getRowId={params => String(params.data.orderId)}
                         />
                    </div>

                    <div className="flex items-center justify-end text-content-white">
                         <Button
                              className="h-10 basis-6/12"
                              variant="danger"
                              icon={<DeleteIcon className="text-content-white" />}
                              onClick={handleDeleteSelected}
                         >
                              حذف کن
                         </Button>
                    </div>
               </div>
          </Modal>
     );
};

export default DeleteOrdersGroupModal;
