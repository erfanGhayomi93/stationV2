import { useCreateNewCustomerGroup } from '@api/customer';
import Divider from '@components/Divider';
import { useModalStore } from '@store/modal';
import { useQueryClient } from '@tanstack/react-query';
import Button from '@uiKit/Button';
import FieldInputText from '@uiKit/Inputs/FieldInputText';
import { FormEvent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal from '..';

const CreateNewCustomerGroupModal = () => {
     const { t } = useTranslation();

     const queryClient = useQueryClient();

     const { setCreateNewCustomerGroupModal } = useModalStore();

     const [customerGroupName, setCustomerGroupName] = useState('');

     const { mutate: createCustomerGroupMutate, reset: createCustomerGroupReset } = useCreateNewCustomerGroup();

     const onCloseModal = () => {
          setCreateNewCustomerGroupModal(false);
     };

     const isAllowConfirmButton = customerGroupName.length >= 2;

     const onSubmitCreateGroup = (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();

          if (!isAllowConfirmButton) {
               return;
          }

          createCustomerGroupMutate(
               { groupName: customerGroupName },
               {
                    onSuccess: () => {
                         toast.success(t('alerts.createNewCustomerGroupSuccessful'));

                         queryClient.refetchQueries({ queryKey: ['getMyGroupDefault'] });
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

     useEffect(() => {
          return () => {
               createCustomerGroupReset();
               setCustomerGroupName('');
          };
     }, []);

     return (
          <Modal size="xs" title={t('createNewCustomerGroupModal.title')} onCloseModal={onCloseModal}>
               <form onSubmit={onSubmitCreateGroup} className="flex flex-col gap-6">
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
                         <Button disabled={!isAllowConfirmButton} type="submit" variant="primary-darkness">
                              {t('createNewCustomerGroupModal.changeConfirmButton')}
                         </Button>
                    </div>
               </form>
          </Modal>
     );
};

export default CreateNewCustomerGroupModal;
