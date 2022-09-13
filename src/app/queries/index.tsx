import { InfiniteData, QueryObserverOptions, UseBaseQueryOptions, useInfiniteQuery, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosPromise, AxiosResponse } from 'axios';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS from 'src/api/axiosInstance';

const getSymbolGeneralInfo = async (symbolISIN: string) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<SymbolGeneralInfoType>>(apiRoutes.Symbol.SymbolGeneralInformation, {
        params: { symbolISIN },
    });
    return data?.result;
};

export const useSymbolGeneralInfo = <T,>(
    symbolISIN: string,
    options?: { select?: (data: SymbolGeneralInfoType) => T; onSuccess?: (data: T) => void },
) => {
    return useQuery(['SymbolGeneralInfo', symbolISIN], ({ queryKey }) => getSymbolGeneralInfo(queryKey[1]), {
        enabled: !!symbolISIN,
        staleTime: Infinity,
        cacheTime: Infinity,
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
        keepPreviousData: true,
        select: (data) => data,
    });
};

interface IParamType {
    queryKey: IGoCustomerRequest;
    pageParam: number;
}

export const useCustomerListInfinit = (
    params: IGoCustomerRequest,
    options?: {
        select?: (data: InfiniteData<IGoCustomerResult>) => InfiniteData<IGoCustomerResult>;
        onSuccess?: (data: InfiniteData<IGoCustomerResult>) => void;
    },
) => {
    return useInfiniteQuery(
        ['searchCustomer', params],
        ({ queryKey, pageParam = 1 }) => searchCustomer(typeof queryKey[1] !== 'string' ? { ...queryKey[1], pageNumber: pageParam } : {}),
        {
            enabled: !!params,
            getNextPageParam: (data) => (data.searchResult.hasNextPage ? data.searchResult.pageNumber + 1 : undefined),
            ...options,
        },
    );
};

const GetCustomerInformation = async (params: IGetCustomerInformationRequestType) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<ICustomerInformationResultType>>(apiRoutes.Customer.GetCustomerInformation, { params });
    return data.result || [];
};

const GetGroupInformation = async (params: IGetGroupInformationRequestType) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IGroupInformationResultType>>(apiRoutes.Customer.GetGroupInformation, { params });
    return data.result || [];
};

export const useCustomerInformation = (param: IGetCustomerInformationRequestType) => {
    return useQuery(['getCustomerInformation', param], ({ queryKey }) => GetCustomerInformation(queryKey[1] as IGetCustomerInformationRequestType), {
        enabled: !!param.customerISIN,
    });
};

export const useGroupInformation = (param: IGetGroupInformationRequestType) => {
    return useQuery(['GetGroupInformation', param], ({ queryKey }) => GetGroupInformation(queryKey[1] as IGetGroupInformationRequestType), {
        enabled: !!param.groupId,
    });
};
