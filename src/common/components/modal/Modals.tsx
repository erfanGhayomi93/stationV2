import { isObjectNotNull } from '@methods/helper';
import { useModalStore } from 'store/modal';
import EditOrdersGroupModal from './EditOrdersGroupModal';
import CustomersSearchModal from './CustomersSearch';

const Modals = () => {
     const { editOrdersGroupModalSheet, customersSearchModalSheet } = useModalStore();


     if (isObjectNotNull(editOrdersGroupModalSheet)) return <EditOrdersGroupModal />

     else if (isObjectNotNull(customersSearchModalSheet)) return <CustomersSearchModal />

     else return null
};

export default Modals;
