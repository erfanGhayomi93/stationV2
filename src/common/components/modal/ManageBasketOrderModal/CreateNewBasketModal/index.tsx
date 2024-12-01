import Modal from '@components/modal';
import { useTranslation } from 'react-i18next';
import { useModalStore } from '@store/modal';
import FieldInputText from '@uiKit/Inputs/FieldInputText.tsx';
import { FormEvent, useMemo, useState } from 'react';
import Divider from '@components/Divider.tsx';
import Button from '@uiKit/Button';
import { useCreateCart } from '@api/basket';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

const CreateNewBasketModal = () => {
     const { t } = useTranslation();

     const queryClient = useQueryClient();

     const { setCreateNewBasketModal } = useModalStore();

     const [basketName, setBasketName] = useState('');

     const { mutate } = useCreateCart();

     const isAllowConfirmButton = useMemo(() => {
          return basketName.length > 0;
     }, [basketName]);

     const onChangeBasketName = (name: string) => {
          setBasketName(name);
     };

     const onSubmitCreateNewBasket = (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          mutate(
               { name: basketName },
               {
                    onSuccess: () => {
                         toast.success(t('alerts.createNewBasketSuccessFull'));

                         queryClient.refetchQueries({ queryKey: ['cartList'] });
                    },

                    onError: () => {
                         toast.error(t('alerts.createNewCustomerGroupError'));
                    },

                    onSettled: () => {
                         onCloseModal();
                    },
               }
          );
     };

     const onCloseModal = () => {
          setCreateNewBasketModal(false);
     };
     return (
          <Modal size="xs" title={t('createNewBasketModal.title')} onCloseModal={onCloseModal}>
               <form className="flex flex-col gap-6" onSubmit={onSubmitCreateNewBasket}>
                    <div>
                         <FieldInputText
                              onChange={onChangeBasketName}
                              placeholder={t('createNewBasketModal.basketNameInputLabel')}
                         />
                    </div>

                    <Divider />

                    <Button disabled={!isAllowConfirmButton} type="submit" variant="primary-darkness">
                         {t('createNewBasketModal.title')}
                    </Button>
               </form>
          </Modal>
     );
};

export default CreateNewBasketModal;
