import { create } from 'zustand';

export const useModalStore = create<IModalStore>(set => ({
     editOrdersGroupModalSheet: null,
     setEditOrdersGroupModalSheet: value => set(() => ({ editOrdersGroupModalSheet: value })),

     deleteOrdersGroupModalSheet: null,
     setDeleteOrdersGroupModalSheet: value => set(() => ({ deleteOrdersGroupModalSheet: value })),

     customersSearchModalSheet: null,
     setCustomersSearchModalSheet: value => set(() => ({ customersSearchModalSheet: value })),

     confirmLogoutModal: false,
     setConfirmLogoutModal: value => set(() => ({ confirmLogoutModal: value })),

     isPercentQuantityOrderModal: false,
     setIsPercentQuantityOrderModal: value => set(() => ({ isPercentQuantityOrderModal: value })),

     dividedOrdersModal: false,
     setDividedOrdersModal: value => set(() => ({ dividedOrdersModal : value })),

     addSymbolToWatchlistModal: false,
     setAddSymbolToWatchlistModal: value => set({ addSymbolToWatchlistModal: value }),

     createNewWatchlistModal: false,
     setCreateNewWatchlistModal: value => set(() => ({ createNewWatchlistModal: value })),

     createNewCustomerGroupModal: false,
     setCreateNewCustomerGroupModal: value => set(() => ({ createNewCustomerGroupModal: value })),

     addCustomersToGroupModal: null,
     setAddCustomersToGroupModal: value => set(() => ({ addCustomersToGroupModal: value })),

     manageCustomerGroupModal: false,
     setManageCustomerGroupModal: value => set(() => ({ manageCustomerGroupModal: value })),

     editCustomerGroupModal: null,
     setEditCustomerGroupModal: value => set(() => ({ editCustomerGroupModal: value })),

     deleteCustomerGroupModal: null,
     setDeleteCustomerGroupModal: value => set(() => ({ deleteCustomerGroupModal: value })),

     portfolioCustomerModal: null,
     setPortfolioCustomerModal: value => set(() => ({ portfolioCustomerModal: value })),
}));
