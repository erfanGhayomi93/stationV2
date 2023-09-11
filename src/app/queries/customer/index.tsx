import { InfiniteData, useInfiniteQuery, useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import { stringify } from 'querystring';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';

const searchCustomer = async (params: IGoCustomerRequest) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IGoCustomerResult>>(Apis().Customer.Search as string, { params });

    return data.result || [];
};
const getDefaultCustomer = async () => {
    const { data } = await AXIOS.get<IGoMultiCustomerType[]>(Apis().Customer.Get as string);
    return data || [];
};
// prettier-ignore
export const useDefaultCustomerList = <T=IGoMultiCustomerType,>(
    options?: Omit<UseQueryOptions<IGoMultiCustomerType[], unknown, T, (string | IGoCustomerRequestType)[]>, 'initialData' | 'queryKey'> | undefined,
) => {
    return useQuery(['getDefaultCustomer'], () => getDefaultCustomer(), options);
};

const searchMultiCustomer = async (params: IGoCustomerRequestType) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IGoMultiCustomerType[]>>(Apis().Customer.MultiSearch as string, {
        params: { ...params, type: params.type?.join() },
    });
    return data.result || [];
};
const searchMultiMultiCustomer = async ({ CustomerISINs, CustomerTagTitles, GtTraderGroupId }: stateCustomer) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IGoMultiCustomerType[]>>(Apis().Customer.MultiMultiSearch as string, {
        params: { CustomerISINs, CustomerTagTitles, GtTraderGroupId },
        paramsSerializer: (params) => {
            return stringify(params);
        },
    });
    return data.result || [];
};

export const useMutationMultiMultiCustomer = (
    options: Omit<UseMutationOptions<IGoMultiCustomerType[], unknown, stateCustomer, unknown>, 'mutationFn'> | undefined,
) => {
    return useMutation(searchMultiMultiCustomer, options);
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
// prettier-ignore
export const useMultiCustomerListQuery = <T=IGoMultiCustomerType,>(
    params: IGoCustomerRequestType,
    options?: Omit<UseQueryOptions<IGoMultiCustomerType[], unknown, IGoMultiCustomerType[], (string | IGoCustomerRequestType)[]>, 'initialData' | 'queryKey'> | undefined,
) => {
    return useQuery(['searchCustomer', params], ({ queryKey }) => searchMultiCustomer(typeof queryKey[1] !== 'string' ? { ...queryKey[1] } : {}), {
        enabled: !!params.term,
        staleTime: 0,
        cacheTime: 0,
        ...options,
    });
};

const GetCustomerInformation = async (params: IGetCustomerInformationRequestType) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<ICustomerInformationResultType>>(Apis().Customer.GetCustomerInformation as string, {
        params,
    });
    return data.result || [];
};

export const useCustomerInformation = (param: IGetCustomerInformationRequestType) => {
    return useQuery(['getCustomerInformation', param], ({ queryKey }) => GetCustomerInformation(queryKey[1] as IGetCustomerInformationRequestType), {
        cacheTime: Infinity,
        staleTime: Infinity,
        enabled: !!param.customerISIN,
    });
};
