interface ICustomerState {
     selectedCustomers: ICustomerAdvancedSearchRes[];
}

type ICustomerAction =
     | { type: 'SET_SELECTED_CUSTOMERS'; payload: ICustomerAdvancedSearchRes[] }
     | { type: 'ADD_SELECTED_CUSTOMERS'; payload: ICustomerAdvancedSearchRes[] }
     | { type: 'ADD_PART_SELECTED_CUSTOMER'; payload: ICustomerAdvancedSearchRes }
     | { type: 'REMOVE_SELECTED_CUSTOMER'; payload: string }
     | { type: 'REMOVE_ALL_SELECTED_CUSTOMERS' };
