import { isObjectNotNull } from '@methods/helper';
import { useModalStore } from 'store/modal';
import AddCustomersToGroupModal from './AddCustomersToGroupModal';
import AddSymbolToWatchlistModal from './AddSymbolToWatchlistModal';
import ConfirmLogoutModal from './ConfirmLogoutModal';
import CreateNewCustomerGroupModal from './CreateNewCustomerGroupModal';
import CreateNewWatchlistModal from './CreateNewWatchlistModal';
import CustomersSearchModal from './CustomersSearch';
import DeleteOrdersGroupModal from './DeleteOrdersGroupModal';
import EditOrdersGroupModal from './EditOrdersGroupModal';
import ManageCustomersGroupsModal from './ManageCustomersGroupsModal';
import DeleteCustomerGroupModal from './ManageCustomersGroupsModal/DeleteCustomerGroupModal';
import EditCustomerGroupModal from './ManageCustomersGroupsModal/EditCustomerGroupModal';
import PercentQuantityOrderModal from './PercentQuantityOrderModal';

const Modals = () => {
     const {
          editOrdersGroupModalSheet,
          confirmLogoutModal,
          deleteOrdersGroupModalSheet,
          customersSearchModalSheet,
          isPercentQuantityOrderModal,
          addSymbolToWatchlistModal,
          createNewWatchlistModal,
          createNewCustomerGroupModal,
          addCustomersToGroupModal,
          manageCustomerGroupModal,
          editCustomerGroupModal,
          deleteCustomerGroupModal,
     } = useModalStore();

     if (isObjectNotNull(editOrdersGroupModalSheet)) return <EditOrdersGroupModal />;
     if (isObjectNotNull(customersSearchModalSheet)) return <CustomersSearchModal />;
     if (isObjectNotNull(deleteOrdersGroupModalSheet)) return <DeleteOrdersGroupModal />;
     if (isPercentQuantityOrderModal) return <PercentQuantityOrderModal />;
     if (confirmLogoutModal) return <ConfirmLogoutModal />;
     if (createNewWatchlistModal) return <CreateNewWatchlistModal />;
     if (addSymbolToWatchlistModal) return <AddSymbolToWatchlistModal />;
     if (createNewCustomerGroupModal) return <CreateNewCustomerGroupModal />;
     if (isObjectNotNull(addCustomersToGroupModal)) return <AddCustomersToGroupModal />;
     if (isObjectNotNull(editCustomerGroupModal)) return <EditCustomerGroupModal />;
     if (isObjectNotNull(deleteCustomerGroupModal)) return <DeleteCustomerGroupModal />;
     if (manageCustomerGroupModal) return <ManageCustomersGroupsModal />;
     else return null;
};

export default Modals;
