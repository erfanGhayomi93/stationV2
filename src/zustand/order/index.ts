import { create } from 'zustand';

interface IOrderManager {
     selectedBuyOrders: number[];
     setSelectedBuyOrders: (state: number[]) => void;
}

export const useOrderManager = create<IOrderManager>(set => ({
     selectedBuyOrders: [],
     setSelectedBuyOrders: value => set(() => ({ selectedBuyOrders: value })),
}));
