import AXIOS from '@config/axios';
import { routeApi } from '@router/routeApi';
import { useQuery } from '@tanstack/react-query';

export const useQueryCustomerSearch = (term: string) => {
     const url = routeApi().Customer.AdvancedSearch;

     return useQuery({
          queryKey: ['customer' + term],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<ICustomerAdvancedSearchRes[]>>(url, { params: term });
               return response.data.result;
          },
          gcTime: 0,
          staleTime: 0,
          enabled: term.length > 2,
     });
};

export const useQueryCustomerSearchGroup = (term: string) => {
     const url = routeApi().Customer.GroupAdvancedSearch;

     return useQuery({
          queryKey: ['groupCustomer' + term],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<ICustomerAdvancedSearchRes[]>>(url, { params: term });
               return response.data.result;
          },
          gcTime: 0,
          staleTime: 0,
          enabled: term.length > 2,
     });
};
