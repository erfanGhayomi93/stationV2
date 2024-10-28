import { isObjectNotNull } from '@methods/helper';
import { useModalStore } from 'store/modal';
import ConfirmLogoutModal from './ConfirmLogoutModal';
import CustomersSearchModal from './CustomersSearch';
import DeleteOrdersGroupModal from './DeleteOrdersGroupModal';
import EditOrdersGroupModal from './EditOrdersGroupModal';
import PercentQuantityOrderModal from './PercentQuantityOrderModal';

const Modals = () => {
     const { editOrdersGroupModalSheet, confirmLogoutModal, deleteOrdersGroupModalSheet, customersSearchModalSheet, isPercentQuantityOrderModal } =
          useModalStore();

     if (isObjectNotNull(editOrdersGroupModalSheet)) return <EditOrdersGroupModal />;
     else if (isObjectNotNull(customersSearchModalSheet)) return <CustomersSearchModal />;
     else if (isObjectNotNull(deleteOrdersGroupModalSheet)) return <DeleteOrdersGroupModal />;
     else if (isPercentQuantityOrderModal) return <PercentQuantityOrderModal />;
     else if (confirmLogoutModal) return <ConfirmLogoutModal />;
     else return null;
};

export default Modals;