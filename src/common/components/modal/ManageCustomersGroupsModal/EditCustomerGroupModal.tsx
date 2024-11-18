import { useEditCustomerGroupName } from '@api/customer';
import Divider from '@components/Divider';
import { useModalStore } from '@store/modal';
import { useQueryClient } from '@tanstack/react-query';
import Button from '@uiKit/Button';
import FieldInputText from '@uiKit/Inputs/FieldInputText';
import { FormEvent, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal from '..';

const EditCustomerGroupModal = () => {
     const { t } = useTranslation();

     const queryClient = useQueryClient();

     const { editCustomerGroupModal, setEditCustomerGroupModal } = useModalStore();

     const [newGroupName, setNewGroupName] = useState('');

     const { mutate: editCustomerGroupNameMutate, reset: resetEditCustomerGroupName } = useEditCustomerGroupName();

     const onCloseModal = () => {
          setEditCustomerGroupModal(null);
     };

     const isAllowConfirmButton = newGroupName.length >= 2;

     const onSubmitEditGroupName = (e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();

          if (!isAllowConfirmButton) {
               return;
          }

          editCustomerGroupNameMutate(
               { id: editCustomerGroupModal?.customer.id ?? 0, groupName: newGroupName },
               {
                    onSuccess: () => {
                         queryClient.refetchQueries({ queryKey: ['getMyGroupDefault'] });

                         toast.success(t('alerts.editCustomerGroupNameSuccessful'));
                    },
                    onError: () => {
                         toast.error(t('alerts.editCustomerGroupNameError'));
                    },

                    onSettled: () => {
                         onCloseModal();
                    },
               }
          );
     };

     useEffect(() => {
          return () => {
               resetEditCustomerGroupName();
               setNewGroupName('');
          };
     }, []);

     return (
          <Modal
               title={
                    <Trans
                         i18nKey="manageCustomersGroupsModal.editGroupModalTitle"
                         values={{
                              name: editCustomerGroupModal?.customer.groupName,
                         }}
                         components={{
                              span: <span className="text-content-selected" />,
                         }}
                    />
               }
               size="sm"
               onCloseModal={onCloseModal}
          >
               <form onSubmit={onSubmitEditGroupName} className="flex flex-col gap-6">
                    <span className="text-xs text-content-title">{t('manageCustomersGroupsModal.editGroupNewNameHelper')}</span>

                    <div>
                         <FieldInputText
                              onChange={value => setNewGroupName(value)}
                              placeholder={t('manageCustomersGroupsModal.editGroupNewNamePlaceholder')}
                         />
                    </div>

                    <Divider />

                    <Button disabled={!isAllowConfirmButton} variant="primary-darkness" type="submit">
                         {t('manageCustomersGroupsModal.confirmChangeButton')}
                    </Button>
               </form>
          </Modal>
     );
};

export default EditCustomerGroupModal;
