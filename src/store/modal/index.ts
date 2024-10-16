import { create } from 'zustand';

export const useModalStore = create<IModalStore>(set => ({
     editOrdersGroupModalSheet: null,
     setEditOrdersGroupModalSheet: value => set(() => ({ editOrdersGroupModalSheet: value })),

     customersSearchModalSheet: null,
     setCustomersSearchModalSheet: value => set(() => ({ customersSearchModalSheet: value })),
}));
