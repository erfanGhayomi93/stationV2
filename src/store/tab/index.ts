import { create } from 'zustand';

export const useTabSlice = create<ITabSlice>(set => ({
     customersManageTab: 'customers',
     setCustomersManageTab: value => set(() => ({ customersManageTab: value })),
}));
