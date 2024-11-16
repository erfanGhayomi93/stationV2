import { createContext, Dispatch, SetStateAction, useState } from 'react';

const initialCustomerContextValue: {
     customers: ICustomerAdvancedSearchRes[];
     setCustomers: Dispatch<SetStateAction<ICustomerAdvancedSearchRes[]>>;
} = {
     customers: [],
     setCustomers: () => null,
};

export const CustomersContext = createContext(initialCustomerContextValue);

interface ICustomerContextProviderProps {
     children: React.ReactElement;
}

const CustomerContextProvider = ({ children }: ICustomerContextProviderProps) => {
     const [customers, setCustomers] = useState<ICustomerAdvancedSearchRes[]>([]);

     return <CustomersContext.Provider value={{ customers, setCustomers }}>{children}</CustomersContext.Provider>;
};

export default CustomerContextProvider;
