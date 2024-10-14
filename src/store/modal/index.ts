import { create } from 'zustand';

export const useModalStore = create<IModalStore>(set => ({
     editOrdersGroupModalSheet: null,
     setEditOrdersGroupModalSheet: value => set(() => ({ editOrdersGroupModalSheet: value })),
}));
