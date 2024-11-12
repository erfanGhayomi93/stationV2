import AXIOS from '@config/axios';
import { routeApi } from '@router/routeApi';
import { useQuery } from '@tanstack/react-query';

export const useQueryCustomerSearch = (term: string) => {
     const url = routeApi().Customer.AdvancedSearch;

     return useQuery({
          queryKey: ['AdvancedSearch' + term],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<ICustomerAdvancedSearchRes[]>>(url, { params: { term } });
               return response.data.result;
          },
          gcTime: 0,
          staleTime: 0,
          enabled: term.length > 2,
     });
};

export const useQueryDefaultCustomer = () => {
     const url = routeApi().Customer.GetCustomers;

     return useQuery({
          queryKey: ['getDefaultCustomer'],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<ICustomerAdvancedSearchRes[]>>(url);
               return response.data.result;
          },
          gcTime: 0,
          staleTime: 0,
     });
};

export const useQueryCustomerSearchGroup = (term: string) => {
     const url = routeApi().Customer.GroupAdvancedSearch;

     return useQuery({
          queryKey: ['groupCustomer' + term],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<ICustomerAdvancedSearchRes[]>>(url, { params: { term } });
               return response.data.result;
          },
          gcTime: 0,
          staleTime: 0,
          enabled: term.length > 2,
     });
};

export const useQueryDefaultGroup = () => {
     const url = routeApi().Customer.GetGroups;

     return useQuery({
          queryKey: ['getGroupDefault'],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<ICustomerAdvancedSearchRes[]>>(url);
               return response.data.result;
          },
          gcTime: 0,
          staleTime: 0,
     });
};

export const useCustomerInformation = ({ customerISIN }: ICustomerInformationReq) => {
     const url = routeApi().Customer.GetCustomerInformation;

     return useQuery({
          queryKey: ['getCustomerInformation', customerISIN],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<ICustomerInformationRes>>(url, {
                    params: { customerISIN },
               });

               return response.data.result;
          },
     });
};

export const useCustomerFinancialStatus = ({ customerISIN }: ICustomerFinancialReq) => {
     const url = routeApi().Customer.GetCustomerFinancialStatus;

     return useQuery({
          queryKey: ['getCustomerFinancial', customerISIN],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<ICustomerFinancialRes>>(url, {
                    params: {
                         customerISIN,
                    },
               });

               return response.data.result;
          },
     });
};

export const useCustomerContracts = ({ customerISIN }: ICustomerContractsReq) => {
     const url = routeApi().Customer.GetCustomerContract;

     return useQuery({
          queryKey: ['getCustomerContracts', customerISIN],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<ICustomerContractsRes[]>>(url, {
                    params: {
                         customerISIN,
                    },
               });
               return response.data.result;
          },
     });
};
