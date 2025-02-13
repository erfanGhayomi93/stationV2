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
import PortfolioCustomerModal from './PortfolioCustomerModal';
import DividedOrdersModal from './DividedOrdersModal';
import ManageBasketOrderModal from '@components/modal/ManageBasketOrderModal';
import CreateNewBasketModal from 'common/components/modal/ManageBasketOrderModal/CreateNewBasketModal';
import EditBasketOrderModal from '@components/modal/ManageBasketOrderModal/EditBasketOrderModal';
import AddOrderToBasketOrderModal from '@components/modal/AddOrderToBasketOrderModal';
import ConfirmDeleteBasketOrderModal from '@components/modal/ManageBasketOrderModal/ConfirmDeleteBasketOrderModal';

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
          portfolioCustomerModal,
          dividedOrdersModal,
          manageBasketOrderModal,
          createNewBasketModal,
          editBasketOrderModal,
          addOrderToBasketModal,
          confirmDeleteBasketOrderModal,
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
     if (isObjectNotNull(portfolioCustomerModal)) return <PortfolioCustomerModal />;
     if (dividedOrdersModal) return <DividedOrdersModal />;
     if (createNewBasketModal) return <CreateNewBasketModal />;
     if (isObjectNotNull(editBasketOrderModal)) return <EditBasketOrderModal />;
     if (isObjectNotNull(confirmDeleteBasketOrderModal)) return <ConfirmDeleteBasketOrderModal />;
     if (manageBasketOrderModal.isShow) return <ManageBasketOrderModal />;
     if (isObjectNotNull(addOrderToBasketModal)) return <AddOrderToBasketOrderModal />;
     else return null;
};

export default Modals;
