import { InfiniteData, useInfiniteQuery, useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS from 'src/api/axiosInstance';
import { getApiPath } from 'src/common/hooks/useApiRoutes/useApiRoutes';

const searchCustomer = async (params: IGoCustomerRequest) => {
    const apiRoutes = getApiPath();

    const { data } = await AXIOS.get<GlobalApiResponseType<IGoCustomerResult>>(apiRoutes?.Customer.Search as string, { params });

    return data.result || [];
};
const searchMultiCustomer = async (params: IGoCustomerRequestType) => {
    const apiRoutes = getApiPath();

    const { data } = await AXIOS.get<GlobalApiResponseType<IGoMultiCustomerType>>(apiRoutes?.Customer.MultiSearch as string, {
        params: { ...params, type: params.type?.join() },
    });
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

export const useMultiCustomerListQuery = <T,>(
    params: IGoCustomerRequestType,
    options?: Omit<UseQueryOptions<IGoMultiCustomerType, unknown, T, (string | IGoCustomerRequestType)[]>, 'initialData' | 'queryKey'> | undefined,
) => {
    return useQuery(['searchCustomer', params], ({ queryKey }) => searchMultiCustomer(typeof queryKey[1] !== 'string' ? { ...queryKey[1] } : {}), {
        enabled: !!params,
        staleTime: 0,
        cacheTime: 0,
        ...options,
    });
};

const GetCustomerInformation = async (params: IGetCustomerInformationRequestType) => {
    const apiRoutes = getApiPath();

    const { data } = await AXIOS.get<GlobalApiResponseType<ICustomerInformationResultType>>(apiRoutes?.Customer.GetCustomerInformation as string, {
        params,
    });
    return data.result || [];
};

export const useCustomerInformation = (param: IGetCustomerInformationRequestType) => {
    return useQuery(['getCustomerInformation', param], ({ queryKey }) => GetCustomerInformation(queryKey[1] as IGetCustomerInformationRequestType), {
        enabled: !!param.customerISIN,
    });
};
