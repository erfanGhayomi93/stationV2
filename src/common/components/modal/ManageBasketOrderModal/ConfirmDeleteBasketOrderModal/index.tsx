import Modal from '@components/modal';
import { Trans, useTranslation } from 'react-i18next';
import { useModalStore } from '@store/modal';
import Divider from '@components/Divider.tsx';
import Button from '@uiKit/Button';
import { useDeleteCart } from '@api/basket';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import { FormEvent } from 'react';

const ConfirmDeleteBasketOrderModal = () => {
     const { t } = useTranslation();

     const queryClient = useQueryClient();

     const { confirmDeleteBasketOrderModal, setConfirmDeleteBasketOrderModal } = useModalStore();

     const { mutate } = useDeleteCart();

     const onSubmitConfirmDeleteBasketOrder = (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          try {
               mutate(
                    { id: confirmDeleteBasketOrderModal?.basket.id as number },
                    {
                         onSuccess: () => {
                              toast.success(t('alerts.deleteBasketSuccessFull'));

                              queryClient.refetchQueries({ queryKey: ['cartList'] });
                         },
                         onError: () => {
                              toast.error(t('alerts.deleteBasketError'));
                         },

                         onSettled: () => {
                              onCloseModal();
                         },
                    }
               );
          } catch (error) {
               console.error(error);
          }
     };

     const onCancelBasketOrder = () => {
          onCloseModal();
     };

     const onCloseModal = () => {
          setConfirmDeleteBasketOrderModal(null);
     };

     return (
          <Modal
               size="sm"
               title={
                    <Trans
                         i18nKey="confirmDeleteBasketOrderModal.title"
                         values={{ name: confirmDeleteBasketOrderModal?.basket.name }}
                         components={{
                              span: <span className="text-content-selected" />,
                         }}
                    />
               }
               onCloseModal={onCloseModal}
          >
               <form className="flex flex-col gap-6" onSubmit={onSubmitConfirmDeleteBasketOrder}>
                    <span className="text-sm text-content-title">
                         <Trans
                              i18nKey="confirmDeleteBasketOrderModal.confirmDeleteBasketOrderQuestion"
                              values={{ name: confirmDeleteBasketOrderModal?.basket.name }}
                              components={{
                                   span: <span className="font-bold" />,
                              }}
                         />
                    </span>

                    <Divider />

                    <div className="flex items-center gap-2">
                         <Button variant="danger-outline" className="basis-4/12" onClick={onCancelBasketOrder}>
                              {t('confirmDeleteBasketOrderModal.cancelBtn')}
                         </Button>
                         <Button variant="danger" className="basis-8/12" type="submit">
                              {t('confirmDeleteBasketOrderModal.deleteBtn')}
                         </Button>
                    </div>
               </form>
          </Modal>
     );
};

export default ConfirmDeleteBasketOrderModal;
