import AXIOS from '@config/axios';
import { routeApi } from '@router/routeApi';
import { useMutation, useQuery } from '@tanstack/react-query';

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
               const response = await AXIOS.get<GlobalApiResponseType<SearchSymbol[]>>(url, {
                    params: { type: 'GeneralSearch' },
               });
               return response.data.result;
          },
          staleTime: 10 * 60 * 1000,
     });
};

export const useQuerySymbolGeneralInformation = <T = ISymbolGeneralInformationRes>(
     symbolISIN: string,
     select?: (data: ISymbolGeneralInformationRes) => T
) => {
     const url = routeApi().Symbol.SymbolGeneralInformation;

     return useQuery({
          queryKey: ['SymbolGeneralInformation', symbolISIN],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<ISymbolGeneralInformationRes>>(url, {
                    params: { symbolISIN },
               });
               return response.data.result;
          },
          enabled: !!symbolISIN,
          ...(!!select && { select }),
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
     });
};

export const useMutationDeleteSymbolTab = () => {
     const url = routeApi().Symbol.RemoveTabByTraderUserIdAndSymbolISIN;

     return useMutation({
          mutationFn: (symbolISIN: string) => AXIOS.post(url, null, { params: { symbolISIN } }),
     });
};

export const useMutationUpdateCreateDateTimeTab = () => {
     const url = routeApi().Symbol.UpdateTheCurrentTab;

     return useMutation({
          mutationFn: (symbolISIN: string) => AXIOS.post(url, null, { params: { symbolISIN } }),
     });
};

export const useMutationUpdateCurrentTab = () => {
     const url = routeApi().Symbol.UpdateTheCurrentTab;

     return useMutation({
          mutationFn: ({ currentSymbolISIN, newSymbolISIN }: { currentSymbolISIN: string; newSymbolISIN: string }) =>
               AXIOS.post(url, null, { params: { currentSymbolISIN, newSymbolISIN } }),
     });
};

export const useMutationClearSymbolTab = () => {
     const url = routeApi().Symbol.CleareSymbolTabAfterLogOut;

     return useMutation({
          mutationFn: () => AXIOS.post(url),
     });
};

export const useQuerySameGroupSymbol = ({ SymbolISIN }: { SymbolISIN: string }) => {
     const url = routeApi().Symbol.sameGroupsSymbol;

     return useQuery({
          queryKey: ['GetSameGroupsSymbol', SymbolISIN],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<ISameGroupsRes[]>>(url, { params: { SymbolISIN } });

               return response.data.result ?? [];
          },
     });
};

export const useQueryOptionContracts = ({ symbolISIN }: { symbolISIN: string }) => {
     const url = routeApi().Symbol.optionContracts;

     return useQuery({
          queryKey: ['GetOptionContract', symbolISIN],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<IOptionContractsRes[]>>(url, { params: { symbolISIN } });
               return response.data.result;
          },
     });
};
