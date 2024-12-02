import AXIOS from '@config/axios';
import { routeApi } from '@router/routeApi';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useQueryCustomerSearch = (term: string, customerType?: 'Natural' | 'Legal' | 'All') => {
     const url = routeApi().Customer.AdvancedSearch;

     return useQuery({
          queryKey: ['AdvancedSearch', term, customerType],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<ICustomerAdvancedSearchRes[]>>(url, {
                    params: customerType ? { term, customerType } : { term },
               });
               return response.data.result;
          },
          gcTime: 0,
          staleTime: 0,
          enabled: term?.length > 2,
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useQueryCustomerSearchGroup = (term: string, customerType?: TCustomerType) => {
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

export const useMyGroupsDefault = () => {
     const url = routeApi().Customer.GetMyGroup;

     return useQuery({
          queryKey: ['getMyGroupDefault'],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<IMyGroupsInformationRes[]>>(url);

               return response.data.result;
          },
     });
};

export const useMyGroupsAdvanced = (term: string, customerType?: TCustomerType) => {
     const url = routeApi().Customer.MyGroupAdvancedSearch;

     return useQuery({
          queryKey: ['getMyGroupAdvanced', term],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<IMyGroupsInformationRes[]>>(url);

               return response.data.result;
          },
     });
};

export const useCreateNewCustomerGroup = () => {
     const url = routeApi().Customer.CreateNewCustomerGroup;

     return useMutation({
          mutationFn: async (params: ICreateCustomerGroupReq) => {
               const response = await AXIOS.post<GlobalApiResponseType<boolean>>(url, {
                    customerISINs: params.customerISINs ?? [],
                    groupName: params.groupName,
               });

               return response.data.result;
          },
     });
};

export const useAddCustomersToGroups = () => {
     const url = routeApi().Customer.AddCustomersToGroups;

     return useMutation({
          mutationFn: async (params: IAddCustomersToGroupsReq) => {
               const response = await AXIOS.post<GlobalApiResponseType<boolean>>(url, params);

               return response.data.result;
          },
     });
};

export const useEditCustomerGroupName = () => {
     const url = routeApi().Customer.EditCustomerGroupName;

     return useMutation({
          mutationFn: async (params: IEditCustomerGroupNameReq) => {
               const response = await AXIOS.post<GlobalApiResponseType<boolean>>(url, params);

               return response.data.result;
          },
     });
};

export const useDeleteCustomerGroup = () => {
     const url = routeApi().Customer.deleteCustomerGroup;

     return useMutation({
          mutationFn: async (params: IDeleteCustomerGroupReq) => {
               const formData = new FormData();

               formData.append('groupId', String(params.groupId));

               const response = await AXIOS.post<GlobalApiResponseType<boolean>>(url, formData);

               return response.data.result;
          },
     });
};

export const useDeleteCustomerFromGroup = () => {
     const url = routeApi().Customer.deleteCustomerFromGroup;

     return useMutation({
          mutationFn: async (params: IDeleteCustomerFromGroupReq) => {
               const response = await AXIOS.post<GlobalApiResponseType<boolean>>(url, params);

               return response.data.result;
          },
     });
};
