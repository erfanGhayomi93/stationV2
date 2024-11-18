import { useAddCustomersToGroups, useMyGroupsDefault } from '@api/customer';
import Divider from '@components/Divider';
import PlaceholderButton from '@components/PlaceholderButton';
import { useModalStore } from '@store/modal';
import { useQueryClient } from '@tanstack/react-query';
import Button from '@uiKit/Button';
import CheckboxButton from '@uiKit/CheckboxButton';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Modal from '..';

const AddCustomersToGroupModal = () => {
     const { t } = useTranslation();

     const queryClient = useQueryClient();

     const { addCustomersToGroupModal, setAddCustomersToGroupModal, setCreateNewCustomerGroupModal } = useModalStore();

     const [selectGroup, setSelectGroup] = useState<number[]>([]);

     const { data: defaultMyGroupData, isLoading, isFetching } = useMyGroupsDefault();

     const { mutate: AddCustomersToGroupMutate, reset } = useAddCustomersToGroups();

     const onCloseModal = () => {
          setAddCustomersToGroupModal(null);
     };

     const handleAddToGroup = () => {
          AddCustomersToGroupMutate(
               {
                    groupId: selectGroup,
                    customerISINs: addCustomersToGroupModal?.customers ?? [],
               },
               {
                    onSuccess: () => {
                         toast.success(t('alerts.addCustomersToGroupsSuccessful'));

                         queryClient.refetchQueries({ queryKey: ['getMyGroupAdvanced'] });

                         onCloseModal();
                    },

                    onError: () => {
                         toast.error(t('alerts.addCustomersToGroupsError'));

                         onCloseModal();
                    },
               }
          );
     };

     const onChangeSelectGroup = (id: number) => {
          const isSelected = selectGroup.includes(id);

          if (isSelected) {
               setSelectGroup(prev => prev.filter(item => item !== id));
          } else {
               setSelectGroup(prev => [...prev, id]);
          }
     };

     const onClickCreateGroup = () => {
          setCreateNewCustomerGroupModal(true);
     };

     useEffect(() => {
          return () => {
               reset();
               setSelectGroup([]);
          };
     }, []);

     return (
          <Modal
               loading={isLoading || isFetching}
               title={t('addCustomersToGroupModal.title')}
               size="sm"
               onCloseModal={onCloseModal}
          >
               <div className="flex flex-col gap-6 overflow-hidden">
                    <PlaceholderButton onClick={onClickCreateGroup} title={t('addCustomersToGroupModal.newGroupButton')} />

                    <ul className="flex max-h-96 flex-1 flex-col gap-6 overflow-y-auto">
                         {defaultMyGroupData?.map(({ id, groupName, children }) => (
                              <li key={id} className="flex items-center justify-between">
                                   <div className="flex items-center gap-2">
                                        <CheckboxButton
                                             onChange={() => onChangeSelectGroup(id)}
                                             checked={selectGroup.includes(id)}
                                             label={groupName}
                                        />
                                   </div>

                                   <span className="pl-2 text-content-paragraph">{children.length}</span>
                              </li>
                         ))}
                    </ul>

                    <Divider />

                    <Button onClick={handleAddToGroup} variant="primary-darkness">
                         {t('addCustomersToGroupModal.addToGroupButton')}
                    </Button>
               </div>
          </Modal>
     );
};

export default AddCustomersToGroupModal;
