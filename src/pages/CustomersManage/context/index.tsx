import { createContext, Dispatch, SetStateAction, useState } from 'react';

const initialCustomerContextValue: {
     customers: ICustomerAdvancedSearchRes[];
     setCustomers: Dispatch<SetStateAction<ICustomerAdvancedSearchRes[]>>;

     customerGroup: ICustomerAdvancedSearchRes[];
     setCustomerGroup: Dispatch<SetStateAction<ICustomerAdvancedSearchRes[]>>;

     myGroups: IMyGroupsCustomerInformation[];
     setMyGroups: Dispatch<SetStateAction<IMyGroupsCustomerInformation[]>>;

     resetCustomersState: () => void;
} = {
     customers: [],
     setCustomers: () => null,

     customerGroup: [],
     setCustomerGroup: () => null,

     myGroups: [],
     setMyGroups: () => null,

     resetCustomersState: () => null,
};

export const CustomersContext = createContext(initialCustomerContextValue);

interface ICustomerContextProviderProps {
     children: React.ReactElement;
}

const CustomerContextProvider = ({ children }: ICustomerContextProviderProps) => {
     const [customers, setCustomers] = useState<ICustomerAdvancedSearchRes[]>([]);

     const [customerGroup, setCustomerGroup] = useState<ICustomerAdvancedSearchRes[]>([]);

     const [myGroups, setMyGroups] = useState<IMyGroupsCustomerInformation[]>([]);

     const resetCustomersState = () => {
          setCustomers([]);
          setCustomerGroup([]);
          setMyGroups([]);
     };

     return (
          <CustomersContext.Provider
               value={{ customers, setCustomers, customerGroup, setCustomerGroup, myGroups, setMyGroups, resetCustomersState }}
          >
               {children}
          </CustomersContext.Provider>
     );
};

export default CustomerContextProvider;
