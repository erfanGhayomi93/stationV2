import { createContext, ReactNode, useContext } from 'react';
import { create } from 'zustand';

export const useBuySellStore = create<IBuySellState>(set => ({
     side: 'Buy',
     price: 0,
     quantity: 0,
     validity: 'Day',
     strategy: 'normal',
     validityDate: null,
     source: 'Account',
     setSide: (side: TSide) => set(() => ({ side })),
     setPrice: (price: number) => set(() => ({ price })),
     setQuantity: (quantity: number) => set(() => ({ quantity })),
     setValidity: (validity: TValidity) => set(() => ({ validity })),
     setStrategy: (strategy: TStrategy) => set(() => ({ strategy })),
     setValidityDate: (validityDate: string | null) => set(() => ({ validityDate })),
     setSource: (source: string) => set(() => ({ source })),
}));

// Create the context
const BuySellContext = createContext<IBuySellState | null>(null);

// Create a provider component
export const BuySellProviderContext = ({ children }: { children: ReactNode }) => {
     const store = useBuySellStore();

     return <BuySellContext.Provider value={store}>{children}</BuySellContext.Provider>;
};

// Create a hook to use the BuySellContext
export const useBuySellContext = () => {
     const context = useContext(BuySellContext);
     if (!context) {
          throw new Error('useBuySellContext must be used within a BuySellProvider');
     }
     return context;
};
