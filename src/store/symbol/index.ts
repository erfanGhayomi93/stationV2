import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ISymbolStore {
     selectedSymbol: string;
     setSelectedSymbol: (state: string) => void;
     // tabsSymbol: SearchSymbol[];
     // setTabSymbol: (value: SearchSymbol[]) => void;
}

export const useSymbolStore = create<ISymbolStore>()(
     persist(
          set => ({
               selectedSymbol: '',
               setSelectedSymbol: value => set(() => ({ selectedSymbol: value })),

               // tabsSymbol: [],
               // setTabSymbol: value => set(() => ({ tabsSymbol: value })),
          }),
          {
               name: 'symbol-manager',
          }
     )
);
