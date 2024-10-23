import { isObjectNotNull } from '@methods/helper';
import { useModalStore } from 'store/modal';
import CustomersSearchModal from './CustomersSearch';
import DeleteOrdersGroupModal from './DeleteOrdersGroupModal';
import EditOrdersGroupModal from './EditOrdersGroupModal';

const Modals = () => {
     const { editOrdersGroupModalSheet, deleteOrdersGroupModalSheet, customersSearchModalSheet } = useModalStore();

     if (isObjectNotNull(editOrdersGroupModalSheet)) return <EditOrdersGroupModal />;
     else if (isObjectNotNull(customersSearchModalSheet)) return <CustomersSearchModal />;
     else if (isObjectNotNull(deleteOrdersGroupModalSheet)) return <DeleteOrdersGroupModal />;
     else return null;
};

export default Modals;
