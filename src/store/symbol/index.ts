import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ISymbolStore {
     selectedSymbol: string;
     setSelectedSymbol: (state: string) => void;
     symbolTitle: string;
     setSymbolTitle: (value: string) => void;
     marketUnit?: TMarketUnit;
     setMarketUnit: (value?: TMarketUnit) => void;
}

export const useSymbolStore = create<ISymbolStore>()(
     persist(
          set => ({
               selectedSymbol: '',
               setSelectedSymbol: value => set(() => ({ selectedSymbol: value })),

               symbolTitle: '',
               setSymbolTitle: value => set(() => ({ symbolTitle: value })),

               marketUnit: undefined,
               setMarketUnit: value => set(() => ({ marketUnit: value })),
          }),
          {
               name: 'symbol-manager',
          }
     )
);
