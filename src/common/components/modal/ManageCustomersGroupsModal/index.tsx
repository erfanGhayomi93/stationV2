import { ColDef } from '@ag-grid-community/core';
import { useMyGroupsDefault } from '@api/customer';
import Divider from '@components/Divider';
import PlaceholderButton from '@components/PlaceholderButton';
import AgGridTable from '@components/Table/AgGrid';
import { useModalStore } from '@store/modal';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '..';
import ActionRenderer from './ActionRenderer';
import TitleRenderer from './TitleRenderer';

const ManageCustomersGroupsModal = () => {
     const { t } = useTranslation();

     const {
          setCreateNewCustomerGroupModal,
          setManageCustomerGroupModal,
          setEditCustomerGroupModal,
          setDeleteCustomerGroupModal,
     } = useModalStore();

     const { data: myGroupsDefaultData, isLoading, isFetching } = useMyGroupsDefault();

     const onDeleteGroup = (data: IMyGroupsInformationRes) => {
          setDeleteCustomerGroupModal({ customer: data });
     };

     const onEditGroup = (data: IMyGroupsInformationRes) => {
          setEditCustomerGroupModal({ customer: data });
     };

     const COLUMNS_DEFS = useMemo<ColDef<IMyGroupsInformationRes>[]>(
          () => [
               {
                    field: 'groupName',
                    headerName: t('manageCustomersGroupsModal.groupNameCol'),
                    cellRenderer: TitleRenderer,
               },
               {
                    field: 'id',
                    headerName: t('manageCustomersGroupsModal.actionCol'),
                    cellRenderer: ActionRenderer,
                    cellRendererParams: {
                         onDeleteGroup,
                         onEditGroup,
                    },
               },
          ],
          []
     );

     const onCloseModal = () => {
          setManageCustomerGroupModal(false);
     };

     const onClickCreateGroup = () => {
          setCreateNewCustomerGroupModal(true);
     };

     return (
          <Modal
               title={t('manageCustomersGroupsModal.title')}
               size="sm"
               loading={isLoading || isFetching}
               onCloseModal={onCloseModal}
          >
               <div className="flex flex-1 flex-col gap-6">
                    <div className="h-full flex-1">
                         <AgGridTable tableHeight="20rem" columnDefs={COLUMNS_DEFS} rowData={myGroupsDefaultData} />
                    </div>

                    <Divider />

                    <PlaceholderButton
                         title={t('manageCustomersGroupsModal.createNewGroupButton')}
                         onClick={onClickCreateGroup}
                    />
               </div>
          </Modal>
     );
};

export default ManageCustomersGroupsModal;
