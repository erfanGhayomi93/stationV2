import Modal from '@components/modal';
import { Trans, useTranslation } from 'react-i18next';
import { useModalStore } from '@store/modal';
import { FormEvent, useMemo, useState } from 'react';
import FieldInputText from '@uiKit/Inputs/FieldInputText.tsx';
import Divider from '@components/Divider.tsx';
import Button from '@uiKit/Button';
import { useEditCart } from '@api/basket';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

const EditBasketOrderModal = () => {
     const { t } = useTranslation();

     const queryClient = useQueryClient();

     const { editBasketOrderModal, setEditBasketOrderModal } = useModalStore();

     const [newBasketOrderName, setNewBasketOrderName] = useState('');

     const { mutate } = useEditCart();

     const onSubmitEditBasketOrder = (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          mutate(
               {
                    name: newBasketOrderName,
                    id: editBasketOrderModal?.basket.id as number,
                    isPinned: false,
                    sendDate: editBasketOrderModal?.basket.sendDate as string,
               },
               {
                    onSuccess: () => {
                         toast.success(t('alerts.editBasketOrderSuccessful'));

                         queryClient.refetchQueries({ queryKey: ['cartList'] });
                    },

                    onError: () => {
                         toast.error(t('alerts.editBasketOrderError'));
                    },
                    onSettled: () => {
                         onCloseModal();
                    },
               }
          );
     };

     const onChangeEditBasketOrderName = (newName: string) => {
          setNewBasketOrderName(newName);
     };

     const onCloseModal = () => {
          setEditBasketOrderModal(null);
     };

     const isAllowConfirmButton = useMemo(() => {
          return newBasketOrderName.length > 0;
     }, []);

     return (
          <Modal
               title={
                    <Trans
                         i18nKey="editBasketOrderModal.title"
                         values={{
                              name: editBasketOrderModal?.basket.name,
                         }}
                         components={{
                              span: <span className="text-content-selected" />,
                         }}
                    />
               }
               size="sm"
               onCloseModal={onCloseModal}
          >
               <form onSubmit={onSubmitEditBasketOrder} className="flex flex-col gap-6">
                    <span className="text-xs text-content-title">{t('editBasketOrderModal.editBasketOrderNameHelper')}</span>

                    <div>
                         <FieldInputText
                              onChange={onChangeEditBasketOrderName}
                              placeholder={t('editBasketOrderModal.basketOrderNameLabel')}
                         />
                    </div>

                    <Divider />

                    <Button disabled={isAllowConfirmButton} variant="primary-darkness" type="submit">
                         {t('editBasketOrderModal.saveChangeBtn')}
                    </Button>
               </form>
          </Modal>
     );
};

export default EditBasketOrderModal;
