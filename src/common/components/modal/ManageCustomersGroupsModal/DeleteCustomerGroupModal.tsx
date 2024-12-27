import { useDeleteCustomerGroup } from '@api/customer';
import Divider from '@components/Divider';
import { useModalStore } from '@store/modal';
import { useQueryClient } from '@tanstack/react-query';
import Button from '@uiKit/Button';
import { useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal from '..';

const DeleteCustomerGroupModal = () => {
     const { t } = useTranslation();

     const queryClient = useQueryClient();

     const { deleteCustomerGroupModal, setDeleteCustomerGroupModal } = useModalStore();

     const { mutate: deleteCustomerGroupMutate, reset: deleteCustomerGroupReset, isPending } = useDeleteCustomerGroup();

     const onCloseModal = () => {
          setDeleteCustomerGroupModal(null);
     };

     const handleCancelDeleteCustomerGroup = () => {
          onCloseModal();
     };

     const handleDeleteCustomerGroup = () => {
          deleteCustomerGroupMutate(
               { groupId: deleteCustomerGroupModal?.customer.id ?? 0 },
               {
                    onSuccess: () => {
                         queryClient.refetchQueries({ queryKey: ['getMyGroupDefault'] });

                         toast.success(t('alerts.deleteCustomerGroupSuccessful'));
                    },
                    onError: () => {
                         toast.error(t('alerts.deleteCustomerGroupError'));
                    },
                    onSettled: () => {
                         onCloseModal();
                    },
               }
          );
     };

     useEffect(() => {
          return () => {
               deleteCustomerGroupReset();
          };
     }, []);

     return (
          <Modal
               size="xs"
               title={
                    <Trans
                         i18nKey="manageCustomersGroupsModal.deleteCustomerGroupModalTitle"
                         values={{
                              name: deleteCustomerGroupModal?.customer.groupName,
                         }}
                         components={{
                              span: <span className="text-content-selected" />,
                         }}
                    />
               }
               onCloseModal={onCloseModal}
          >
               <div className="flex flex-col gap-6">
                    <span className="text-sm text-content-title">
                         <Trans
                              i18nKey="manageCustomersGroupsModal.confirmDeleteCustomerGroupQuestion"
                              values={{
                                   name: deleteCustomerGroupModal?.customer.groupName,
                              }}
                              components={{
                                   span: <span className="font-medium" />,
                              }}
                         />
                    </span>

                    <Divider />

                    <div className="flex items-center gap-2">
                         <Button onClick={handleCancelDeleteCustomerGroup} variant="danger-outline">
                              {t('manageCustomersGroupsModal.cancelButton')}
                         </Button>
                         <Button isLoading={isPending} onClick={handleDeleteCustomerGroup} variant="danger">
                              {t('manageCustomersGroupsModal.deleteButton')}
                         </Button>
                    </div>
               </div>
          </Modal>
     );
};

export default DeleteCustomerGroupModal;
