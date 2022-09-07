import { QueryObserverOptions, UseBaseQueryOptions, useInfiniteQuery, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosPromise, AxiosResponse } from 'axios';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS from 'src/api/axiosInstance';

const getSymbolGeneralInfo = async (symbolISIN: string) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<SymbolGeneralInfoType>>(apiRoutes.Symbol.SymbolGeneralInformation, {
        params: { symbolISIN },
    });
    return data?.result;
};

export const useSymbolGeneralInfo = <T,>(symbolISIN: string, options?: { select: (data: SymbolGeneralInfoType) => T }) => {
    return useQuery(['SymbolGeneralInfo', symbolISIN], ({ queryKey }) => getSymbolGeneralInfo(queryKey[1]), {
        enabled: !!symbolISIN,
        staleTime: Infinity,
        cacheTime: Infinity,
        // keepPreviousData: true,
        ...options,
    });
};

const searchSymbol = async (term: string) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<SymbolSearchResult[]>>(apiRoutes.Symbol.Search, { params: { term } });
    return Array.isArray(data?.result) ? data.result.slice(0, 10) : [];
};

export const useSymbolSearch = (term: string) => {
    return useQuery(['SymbolSearch', term], ({ queryKey }) => searchSymbol(queryKey[1]), {
        enabled: !!term,
        staleTime: 0,
        cacheTime: 0,
    });
};

const searchCustomer = async (params: IGoCustomerRequest) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IGoCustomerResult>>(apiRoutes.Customer.Search, { params });
    return data.result || [];
};

export const useCustomerList = (params: IGoCustomerRequest) => {
    return useQuery(['searchCustomer', params], ({ queryKey }) => searchCustomer(queryKey[1] as IGoCustomerRequest), {
        enabled: !!params,
        staleTime: 0,
        cacheTime: 0,
        select: (data) => data,
    });
};

interface IParamType {
    queryKey: IGoCustomerRequest;
    pageParam: number;
}

export const useCustomerListInfinit = (params: IGoCustomerRequest) => {
    return useInfiniteQuery(
        ['searchCustomer', params],
        ({ queryKey, pageParam = { pageNumber: 1 } }) => searchCustomer(typeof queryKey[1] !== 'string' ? { ...queryKey[1], ...pageParam } : {}),
        {
            enabled: !!params,
            getNextPageParam: (data) => {
                return { pageNumber: data.searchResult.pageNumber + 1, hasNextPage: data.searchResult.hasNextPage };
            },
        },
    );
};
