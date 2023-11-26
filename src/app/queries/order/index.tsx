import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';

export const setOrder = async (params: IOrderRequestType) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<IOrderResponseType>>(Apis().Orders.Create as string, { ...params });
    return (
        data.result || {
            successClientKeys: [],
            errorNumbers: 0,
        }
    );
};

//////////////getOrder////////////////////
const getOrderFn = async (params: ITodayOpenOrderType) => {
    let { data } = await AXIOS.get<GlobalApiResponseType<IOrderGetType[]>>(Apis().Orders.Get as string, { params });

    return data.result || [];
};

export const useGetOrders = (params: ITodayOpenOrderType, options?: UseQueryOptions<IOrderGetType[]>) => {
    return useQuery<IOrderGetType[]>(['orderList', params.GtOrderStateRequestType], () => getOrderFn(params), options);
};

//////////////delete Order////////////////////
const singleDeleteOrderFn = async (orderId: number) => {
    let { data } = await AXIOS.post<GlobalApiResponseType<ISingleDeleteOrderResult>>(Apis().Orders.Delete as string, {}, { params: { orderId } });
    return data.result || [];
};

export const useSingleDeleteOrders = (
    options?: Omit<UseMutationOptions<ISingleDeleteOrderResult, unknown, number, unknown>, 'mutationFn'> | undefined,
) => {
    return useMutation(singleDeleteOrderFn, options);
};

// Get Order List

export const getOrderLists = async (params: IGTOrderListRequest) => {
    console.log('params', params);
    const { data } = await AXIOS.get<GlobalPaginatedApiResponse<IGTOrderListResultType[]>>(Apis().Orders.Lists, {
        params,
    });
    return data;
};
//prettier-ignore
export const useOrderLists = <T = GlobalPaginatedApiResponse<IGTOrderListResultType[]>>(param: IGTOrderListRequest,
    options?: (Omit<UseQueryOptions<GlobalPaginatedApiResponse<IGTOrderListResultType[]>, unknown, GlobalPaginatedApiResponse<IGTOrderListResultType[]>, any[]>, "initialData" | "queryFn" | "queryKey">) | undefined) => {
    return useQuery(['getOrderLists'], ({ queryKey }) => getOrderLists(param as IGTOrderListRequest), { ...options });
};

//////////////Modify////////////////////

const updateOrderFn = async (params: any) => {
    let { data } = await AXIOS.post(Apis().Orders.Modify as string, params);
    return data.result || [];
};

export const useUpdateOrders = (options?: Omit<UseMutationOptions<number[], Error, any, unknown>, 'mutationKey' | 'mutationFn'>) => {
    return useMutation(updateOrderFn, options);
};

////////////Offline Requests///////////

export const getOfflineRequests = async (params: IGTOfflineTradesRequests) => {
    const { data } = await AXIOS.get<IGTOfflineTradesResponse>(Apis().Orders.OfflineRequests, { params });
    return data || {};
};

export const useGetOfflineRequests = (params: IGTOfflineTradesRequests, options?: UseQueryOptions<IGTOfflineTradesResponse>) =>
    useQuery<IGTOfflineTradesResponse>(['getOfflineTrades'], () => getOfflineRequests(params as IGTOfflineTradesRequests), { ...options });

export const getOfflineRequestHistory = async (id: number) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IGTOfflineRequestHistoryResult[]>>(Apis().Orders.OfflineRequestHistory, {
        params: { id },
    });
    return data?.result || {};
};

///////////Trades//////////

export const getTradesLists = async (params: IGTTradesListRequest) => {
    const { data } = await AXIOS.get<GlobalPaginatedApiResponse<IGTTradesListResultType[]>>(Apis().Orders.Trades, {
        params,
    });
    return data;
};

export const useTradesLists = <T = IGTTradesResponseType,>(
    param: IGTTradesListRequest,
    options?: Omit<UseQueryOptions<IGTTradesResponseType, unknown, IGTTradesResponseType, any[]>, 'initialData' | 'queryFn' | 'queryKey'> | undefined,
) => {
    return useQuery(['getTradesLists'], ({ queryKey }) => getTradesLists(param as IGTTradesListRequest), { ...options });
};
