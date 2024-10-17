import { removeDuplicatesCustomerISINs } from '@methods/helper';
import { create } from 'zustand';

interface ICustomerStore {
     selectedCustomers: ICustomerAdvancedSearchRes[];
     setSelectedCustomers: (state: ICustomerAdvancedSearchRes[]) => void;
     setAllSelectedCustomersWithPrevious: (state: ICustomerAdvancedSearchRes[]) => void;
     setPartSelectedCustomers: (state: ICustomerAdvancedSearchRes) => void;
     removeSelectedCustomers: (customerISIN: string) => void;
}

export const useCustomerStore = create<ICustomerStore>(set => ({
     selectedCustomers: [],
     setSelectedCustomers: value => set(() => ({ selectedCustomers: value })),
     setAllSelectedCustomersWithPrevious: value =>
          set(state => ({ selectedCustomers: removeDuplicatesCustomerISINs([...state.selectedCustomers, ...value]) })),
     setPartSelectedCustomers: value => set(state => ({ selectedCustomers: [...state.selectedCustomers, value] })),
     removeSelectedCustomers: value =>
          set(state => ({ selectedCustomers: state.selectedCustomers.filter(customer => customer.customerISIN !== value) })),
}));
