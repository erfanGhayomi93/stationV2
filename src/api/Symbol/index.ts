import { useQuery } from '@tanstack/react-query';
import AXIOS from '@config/axios';
import { routeApi } from '@router/routeApi';

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
