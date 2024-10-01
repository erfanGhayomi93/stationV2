import { create } from 'zustand';

interface ISymbolManager {
     selectedSymbol: string;
     setSelectedSymbol: (state: string) => void;
     tabsSymbol: SearchSymbol[];
     setTabSymbol: (value: SearchSymbol[]) => void;
}

export const useSymbolManager = create<ISymbolManager>(set => ({
     selectedSymbol: '',
     setSelectedSymbol: value => set(() => ({ selectedSymbol: value })),

     tabsSymbol: [],
     setTabSymbol: value => set(() => ({ tabsSymbol: value })),
}));
