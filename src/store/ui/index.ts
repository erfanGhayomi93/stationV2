import { create } from 'zustand';

export const useUIStore = create<IUIStore>(set => ({
     isExpandSymbolDetails: true,
     setExpandSymbolDetails: value => set(() => ({ isExpandSymbolDetails: value })),

     isExpandSidebar: false,
     setIsExpandSidebar: value => set(() => ({ isExpandSidebar: value })),
}));
