import { useCreateNewCustomerGroup } from '@api/customer';
import Divider from '@components/Divider';
import { useModalStore } from '@store/modal';
import { useQueryClient } from '@tanstack/react-query';
import Button from '@uiKit/Button';
import FieldInputText from '@uiKit/Inputs/FieldInputText';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal from '..';

const CreateNewCustomerGroupModal = () => {
     const { t } = useTranslation();

     const queryClient = useQueryClient();

     const { setCreateNewCustomerGroupModal } = useModalStore();

     const [customerGroupName, setCustomerGroupName] = useState('');

     const { mutate: createCustomerGroupMutate } = useCreateNewCustomerGroup();

     const onCloseModal = () => {
          setCreateNewCustomerGroupModal(false);
     };

     const reset = () => {
          setCustomerGroupName('');

          onCloseModal();
     };

     const handleCreateNewCustomerGroup = () => {
          createCustomerGroupMutate(
               { groupName: customerGroupName },
               {
                    onSuccess: () => {
                         toast.success(t('alerts.createNewCustomerGroupSuccessful'));

                         queryClient.refetchQueries({ queryKey: ['getMyGroupAdvanced'] });

                         reset();
                    },
                    onError: () => {
                         toast.error(t('alerts.createNewCustomerGroupError'));

                         reset();
                    },
               }
          );
     };

     return (
          <Modal size="xs" title={t('createNewCustomerGroupModal.title')} onCloseModal={onCloseModal}>
               <div className="flex flex-col gap-6">
                    <div>
                         <FieldInputText
                              placeholder={t('createNewCustomerGroupModal.newCustomerInputLabel')}
                              onChange={value => {
                                   setCustomerGroupName(value);
                              }}
                         />
                    </div>

                    <Divider />

                    <div className="flex items-center gap-4">
                         <Button onClick={handleCreateNewCustomerGroup} variant="primary-darkness">
                              {t('createNewCustomerGroupModal.changeConfirmButton')}
                         </Button>
                    </div>
               </div>
          </Modal>
     );
};

export default CreateNewCustomerGroupModal;
