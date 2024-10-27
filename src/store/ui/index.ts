import { create } from 'zustand';

export const useUIStore = create<IUIStore>(set => ({
     isExpandSymbolDetails: false,
     setExpandSymbolDetails: value => set(() => ({ isExpandSymbolDetails: value })),
}));
