import { removeDuplicatesCustomerISINs } from '@methods/helper';

export const initState = [];

export const customerReducer = (state: ICustomerState, action: ICustomerAction): ICustomerState => {
     switch (action.type) {
          case 'SET_SELECTED_CUSTOMERS':
               return { selectedCustomers: action.payload };
          case 'ADD_SELECTED_CUSTOMERS':
               return {
                    selectedCustomers: removeDuplicatesCustomerISINs([...state.selectedCustomers, ...action.payload]),
               };
          case 'ADD_PART_SELECTED_CUSTOMER':
               return { selectedCustomers: [...state.selectedCustomers, action.payload] };
          case 'REMOVE_SELECTED_CUSTOMER':
               return {
                    selectedCustomers: state.selectedCustomers.filter(customer => customer.customerISIN !== action.payload),
               };
          case 'REMOVE_ALL_SELECTED_CUSTOMERS':
               return { selectedCustomers: [] };
          default:
               return state;
     }
};
