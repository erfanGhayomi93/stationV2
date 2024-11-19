import { createContext, ReactNode, useContext } from 'react';
import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialStore: IBuySellState = {
     side: "Buy",
     price: 0,
     quantity: 0,
     validity: "Day",
     strategy: "normal",
     validityDate: null,
     source: "Account",
     isCalculatedQuantity: false,
     isPercentPrice: false,
     isPercentQuantity: false,
     priceWithPercent: {
          priceBasedOn: "GreaterThanClosingPrice",
          percent: 1,
     },
     quantityWithPercent: {
          quantityBasedOn: "remain",
          percent: 1,
     },
     amount: 0,
     isLockPrice: false,
     isKeepForm: false,
};

type BuySellStore = IBuySellState & IBuySellAction;


export const useBuySellStore = create(
     persist<BuySellStore, [], [], { isKeepForm: boolean }>(
          (set) => ({
               ...initialStore,
               setSide: (side: TSide) => set(() => ({ side })),
               setPrice: (price: number) => set(() => ({ price })),
               setQuantity: (quantity: number) => set(() => ({ quantity })),
               setValidity: (validity: TValidity) => set(() => ({ validity })),
               setStrategy: (strategy: TStrategy) => set(() => ({ strategy })),
               setValidityDate: (validityDate: string | null) => set(() => ({ validityDate })),
               setSource: (source: string) => set(() => ({ source })),
               setAmount: (amount: number) => set(() => ({ amount })),
               setIsCalculatedQuantity: (isCalculatedQuantity: boolean) =>
                    set(() => ({ isCalculatedQuantity })),
               setIsPercentPrice: (isPercentPrice: boolean) => set(() => ({ isPercentPrice })),
               setIsPercentQuantity: (isPercentQuantity: boolean) =>
                    set(() => ({ isPercentQuantity })),
               setPriceWithPercentBaseOn: (priceBasedOn: string) =>
                    set((state: IBuySellState) => ({
                         priceWithPercent: { ...state.priceWithPercent, priceBasedOn },
                    })),
               setPriceWithPercentValue: (percent: number) =>
                    set((state) => ({
                         priceWithPercent: { ...state.priceWithPercent, percent },
                    })),
               setQuantityWithBaseOn: (quantityBasedOn: TQuantityBasedOn) =>
                    set((state) => ({
                         quantityWithPercent: { ...state.quantityWithPercent, quantityBasedOn },
                    })),
               setQuantityWithValue: (percent: number) =>
                    set((state) => ({
                         quantityWithPercent: { ...state.quantityWithPercent, percent },
                    })),
               setIsLockPrice: (isLockPrice: boolean) => set(() => ({ isLockPrice })),
               setIsKeepForm: (isKeepForm: boolean) => set(() => ({ isKeepForm })),
               reset: () =>
                    set((state) => ({
                         ...initialStore,
                         side: state.side,
                         isKeepForm: state.isKeepForm,
                    })),
          }),
          {
               name: "buy-sell-store", // Key for localStorage
               // storage: createJSONStorage(() => localStorage), // Using localStorage for persistence
               partialize: (state) => ({ isKeepForm: state.isKeepForm }), // Persist only `isKeepForm`
          }
     )
);

export default useBuySellStore;


// Create the context
const BuySellContext = createContext<IBuySellState & IBuySellAction | null>(null);

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
