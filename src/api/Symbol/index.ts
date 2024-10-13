import { useMutation, useQuery } from '@tanstack/react-query';
import AXIOS from '@config/axios';
import { routeApi } from '@router/routeApi';
import { queryClient } from '@config/reactQuery';

export const useQuerySymbolSearch = (term: string) => {
     const url = routeApi().Symbol.search;

     return useQuery({
          queryKey: ['symbolSearch'],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<SearchSymbol[]>>(url, {
                    params: { term },
               });
               return response.data.result;
          },
          enabled: term.length > 2,
     });
};

export const useQuerySearchHistory = () => {
     const url = routeApi().Symbol.historyRecent;

     return useQuery({
          queryKey: ['historyRecentSymbol'],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<SearchSymbol[]>>(url);
               return response.data.result;
          },
          staleTime: 10 * 60 * 1000,
     });
};

export const useQuerySymbolGeneralInformation = <T>(symbolISIN: string, select?: (data: ISymbolGeneralInformationRes) => T) => {
     const url = routeApi().Symbol.SymbolGeneralInformation;

     return useQuery({
          queryKey: ['SymbolGeneralInformation', symbolISIN],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<ISymbolGeneralInformationRes>>(url, {
                    params: { symbolISIN },
               });
               return response.data.result;
          },
          select,
     });
};

export const useQueryMarketDepthV2 = (symbolISIN: string) => {
     const url = routeApi().Symbol.GetMarketDepthV2;

     return useQuery({
          queryKey: ['GetMarketDepthV2', symbolISIN],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<IMarketDepthRes>>(url, {
                    params: { symbolISIN },
               });
               return response.data.result;
          },
     });
};

export const useQuerySymbolTab = () => {
     const url = routeApi().Symbol.GetSymbolsTab;

     return useQuery({
          queryKey: ['GetSymbolsTab'],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<ISymbolTabRes[]>>(url);
               return response.data.result || [];
          },
     });
};

export const useMutationCreateSymbolTab = () => {
     const url = routeApi().Symbol.CreateNewSymbolTab;

     return useMutation({
          mutationFn: (symbolISIN: string) => AXIOS.post(url, null, { params: { symbolISIN } }),
          onSuccess: () => {
               queryClient.invalidateQueries({
                    queryKey: ['GetSymbolsTab'],
               });
          },
     });
};

export const useMutationDeleteSymbolTab = () => {
     const url = routeApi().Symbol.RemoveTabByTraderUserIdAndSymbolISIN;

     return useMutation({
          mutationFn: (symbolISIN: string) => AXIOS.post(url, null, { params: { symbolISIN } }),
          onSuccess: () => {
               queryClient.invalidateQueries({
                    queryKey: ['GetSymbolsTab'],
               });
          },
     });
};

export const useMutationUpdateCreateDateTimeTab = () => {
     const url = routeApi().Symbol.UpdateSymbolTabCreateDateTime;

     return useMutation({
          mutationFn: (symbolISIN: string) => AXIOS.post(url, null, { params: { symbolISIN } }),
          onSuccess: () => {
               queryClient.invalidateQueries({
                    queryKey: ['GetSymbolsTab'],
               });
          },
     });
};
