import { create } from 'zustand';

export const useUIStore = create<IUIStore>(set => ({
     isExpandSymbolDetails: true,
     setExpandSymbolDetails: value => set(() => ({ isExpandSymbolDetails: value })),
}));
