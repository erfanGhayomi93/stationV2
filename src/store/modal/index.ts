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
}));
