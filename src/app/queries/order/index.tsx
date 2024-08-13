import { useInfiniteQuery, UseInfiniteQueryOptions, useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import option from 'src/redux/slices/option';
import { excelDownloader } from 'src/utils/helpers';

export const setOrder = async (params: IOrderRequestType) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<IOrderResponseType>>(Apis().Orders.Create, { ...params });
    return (
        data.result || {
            successClientKeys: [],
            errorNumbers: 0,
        }
    );
};

export const useMutationSendOrder = (
    option?: Omit<UseMutationOptions<IOrderResponseType, unknown, IOrderRequestType, unknown>, 'mutationFn'> | undefined,
) => {
    return useMutation(setOrder, option);
};

//V2

export const setOrderV2 = async (params: IIPOOrder) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<IOrderResponseType>>(Apis().Orders.CreateV2, { ...params });
    return (
        data.result || {
            successClientKeys: [],
            errorNumbers: 0,
        }
    );
};

export const useMutationSendOrderV2 = (
    option?: Omit<UseMutationOptions<IOrderResponseType, unknown, IIPOOrder, unknown>, 'mutationFn'> | undefined,
) => {
    return useMutation(setOrderV2, option);
};
////////////////////////////////////

const singleModifyOrderFn = async (params: ISingleModifyOrderReq) => {
    let { data } = await AXIOS.post<GlobalApiResponseType<ISingleDeleteOrderResult>>(Apis().Orders.ModifySingleTrade, { ...params });
    return data.result || [];
};

export const useSingleModifyOrders = (
    options?: Omit<UseMutationOptions<ISingleDeleteOrderResult, unknown, ISingleModifyOrderReq, unknown>, 'mutationFn'> | undefined,
) => {
    return useMutation(singleModifyOrderFn, options);
};


const groupModifyOrderFn = async (params: ISingleModifyOrderReq[]) => {
    let { data } = await AXIOS.post<GlobalApiResponseType<ISingleDeleteOrderResult>>(Apis().Orders.GroupOrdersModify, { items: params });
    return data.result || [];
};

export const useGroupModifyOrders = (
    options?: Omit<UseMutationOptions<ISingleDeleteOrderResult, unknown, ISingleModifyOrderReq[], unknown>, 'mutationFn'> | undefined,
) => {
    return useMutation(groupModifyOrderFn, options);
};



//////////////getOrder////////////////////
const getOrderFn = async (params: ITodayOpenOrderType) => {
    let { data } = await AXIOS.get<GlobalApiResponseType<IOrderGetType[]>>(Apis().Orders.Get, { params });

    return data.result || [];
};

export const useGetOrders = (params: ITodayOpenOrderType, options?: UseQueryOptions<IOrderGetType[]>) => {
    return useQuery<IOrderGetType[]>(['orderList', params.GtOrderStateRequestType, params.symbolISIN ?? "AllSymbolISIN", String(params.CustomerISIN || '') , params.side || "AllSide"], () => getOrderFn(params), options);
};

const getTodayDoneTradesDetails = async (params: IDoneTradesDetailsReq) => {
    let { data } = await AXIOS.get<GlobalApiResponseType<TTodayDoneTrades[]>>(Apis().Orders.TodayDoneTradeDetails, { params });
    return data.result || [];
};

export const useGetTodayDoneTradesDetails = (params: IDoneTradesDetailsReq, options?: Omit<UseQueryOptions<TTodayDoneTrades[], Error>, 'queryFn'>) =>
    useQuery<TTodayDoneTrades[], Error>(
        ['TodayDoneTradesDetails', params.customerISIN, params.symbolISIN, params.orderSide],
        () => getTodayDoneTradesDetails(params),
        options,
    );

//New Api

const getTodayDoneTrades = async (aggregateType: IAggregate) => {
    let { data } = await AXIOS.get<GlobalApiResponseType<TTodayDoneTrades[]>>(Apis().Orders.TodayDoneTrades, {
        params: { aggregateType: !!aggregateType ? aggregateType : undefined },
    });
    return data.result || [];
};

export const useGetTodayDoneTrades = (aggregateType: IAggregate, options?: Omit<UseQueryOptions<any>, 'queryFn'>) =>
    useQuery(['TodayDoneTrades', aggregateType], () => getTodayDoneTrades(aggregateType), options);

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


const GroupDeleteOrderFn = async (ordersId: number[]) => {
    let { data } = await AXIOS.post<GlobalApiResponseType<ISingleDeleteOrderResult>>(Apis().Orders.GroupOrderDelete, ordersId);
    return data.result || [];
};

export const useGroupDeleteOrders = (
    options?: Omit<UseMutationOptions<ISingleDeleteOrderResult, unknown, number[], unknown>, 'mutationFn'> | undefined,
) => {
    return useMutation(GroupDeleteOrderFn, options);
};




// Get Order List

export const getOrderLists = async (params: IGTOrderListRequest) => {
    try {
        const { data } = await AXIOS.get<GlobalPaginatedApiResponse<IGTOrderListResultType[]>>(Apis().Orders.Lists, {
            params,
        });
        return data;
    } catch (error) {
        return {} as any;
    }
};
//prettier-ignore
export const useOrderLists = <T = GlobalPaginatedApiResponse<IGTOrderListResultType[]>>(param: IGTOrderListRequest,
    options?: (Omit<UseQueryOptions<GlobalPaginatedApiResponse<IGTOrderListResultType[]>, unknown, GlobalPaginatedApiResponse<IGTOrderListResultType[]>, any[]>, "initialData" | "queryFn" | "queryKey">) | undefined) => {
    return useQuery(['getOrderLists'], ({ queryKey }) => getOrderLists(param as IGTOrderListRequest), { ...options });
};

export const getOrderListExcel = async (params: IGTOrderListRequest) => {
    const { data } = await AXIOS.get(Apis().Orders.Excel, { params });
    return data;
};

export const useOrderListExcel = (
    params: IGTOrderListRequest,
    options?: Omit<UseQueryOptions<any, unknown, any, any[]>, 'initialData' | 'queryFn' | 'queryKey'> | undefined,
) => useQuery(['getOrderListExcel'], () => getOrderListExcel(params as IGTOrderListRequest), { ...options });

//////////////Modify////////////////////

const updateOrderFn = async (params: any) => {
    let { data } = await AXIOS.post(Apis().Orders.Modify as string, params);
    return data.result || [];
};

export const useUpdateOrders = (options?: Omit<UseMutationOptions<number[], Error, any, unknown>, 'mutationKey' | 'mutationFn'>) => {
    return useMutation(updateOrderFn, options);
};

////////////Offline Requests///////////

const sendRequestFn = async (params: buySellRequestParams) => {
    let { data } = await AXIOS.post(Apis().BuySellRequest.SendRequest, params);
    return data.result || [];
};

export const useSendRequest = (options?: Omit<UseMutationOptions<number[], Error, buySellRequestParams>, 'mutationKey' | 'mutationFn'>) => {
    return useMutation(sendRequestFn, options);
};

const getOfflineRequests = async (apiParams: IGetOfflineRequestsParams) => {
    const { data } = await AXIOS.get<IGTOfflineTradesResponse>(Apis().BuySellRequest.GetOfflineRequests, {
        params: apiParams,
    });
    return data || {};
};

export const useGetOfflineRequests = (params: IGetOfflineRequestsParams, options?: UseInfiniteQueryOptions<IGTOfflineTradesResponse>) =>
    useInfiniteQuery({
        queryKey: ['GetOpenRequests'],
        queryFn: ({ pageParam = params }) => getOfflineRequests(pageParam),
        getNextPageParam: (lastPage) =>
            lastPage.totalPages === lastPage.pageNumber ? undefined : { ...params, PageNumber: lastPage.pageNumber + 1 },
        ...options,
    });

const getOfflineRequestsHistory = async (Id: number) => {
    const { data } = await AXIOS.get<{ result: OpentRequestsHistory[] }>(Apis().BuySellRequest.GetOfflineRequestsHistory, { params: { Id } });
    return data?.result || [];
};

export const useOfflineRequestsHistory = (Id: number, options?: UseQueryOptions<OpentRequestsHistory[]>) =>
    useQuery<OpentRequestsHistory[]>({
        queryKey: ['GetOpenRequestsHistory', Id],
        queryFn: ({ queryKey }) => getOfflineRequestsHistory(queryKey[1] as number),
        ...options,
    });

const GetOfflineRequestsPaginated = async (params: IGetOfflineRequestsParamsPaginated) => {
    const { data } = await AXIOS.get<GlobalPaginatedApiResponse<IOfflineRequestsPaginatedResponse[]>>(
        Apis().BuySellRequest.GetOfflineRequestsPaginated,
        { params },
    );
    return data;
};

export const useGetOfflineRequestsPaginated = (
    params: IGetOfflineRequestsParamsPaginated,
    options?: UseQueryOptions<GlobalPaginatedApiResponse<IOfflineRequestsPaginatedResponse[]>>,
) =>
    useQuery<GlobalPaginatedApiResponse<IOfflineRequestsPaginatedResponse[]>>({
        queryKey: ['GetOpenRequestsPaginated', params],
        queryFn: ({ queryKey }) => GetOfflineRequestsPaginated(queryKey[1] as IGetOfflineRequestsParamsPaginated),
        ...options,
    });

const GetOfflineRequestsPaginatedExcel = async (params: IGetOfflineRequestsParamsPaginated) => {
    const { data } = await AXIOS.get(Apis().BuySellRequest.GetOfflineRequestsPaginatedExcel, { params });
    if (data) {
        excelDownloader(data);
    }
    return data;
};

export const useGetOfflineRequestsPaginatedExcel = (
    params: IGetOfflineRequestsParamsPaginated,
    options?: UseQueryOptions<GlobalPaginatedApiResponse<IOfflineRequestsPaginatedResponse[]>>,
) =>
    useQuery<GlobalPaginatedApiResponse<IOfflineRequestsPaginatedResponse[]>>({
        queryKey: ['GetOpenRequestsPaginatedExcel', params],
        queryFn: ({ queryKey }) => GetOfflineRequestsPaginatedExcel(queryKey[1] as IGetOfflineRequestsParamsPaginated),
        enabled: false,
        ...options,
    });

const GetOfflineRequestsExcel = async (params: IGetOfflineRequestsParams) => {
    const { data } = await AXIOS.get(Apis().BuySellRequest.GetOfflineRequestsExcel, { params });
    if (data) {
        excelDownloader(data);
    }
    return data;
};

export const useGetOfflineRequestsExcel = (params: IGetOfflineRequestsParams, options?: UseQueryOptions<IGTOfflineTradesResponse>) =>
    useQuery({
        queryKey: ['GetOpenRequestsExcel', params],
        queryFn: ({ queryKey }) => GetOfflineRequestsExcel(queryKey[1] as IGetOfflineRequestsParams),
        enabled: false,
        ...options,
    });

{
    /* old version will change later */
}

export const getOldOfflineRequests = async (params: IGTOfflineTradesRequests) => {
    const { data } = await AXIOS.get<IGTOfflineTradesResponse>(Apis().Orders.OfflineRequests, { params });
    return data || {};
};

export const useGetOldOfflineRequests = (params: IGTOfflineTradesRequests, options?: UseQueryOptions<IGTOfflineTradesResponse>) =>
    useQuery<IGTOfflineTradesResponse>(['getOfflineTrades'], () => getOfflineRequests(params as IGTOfflineTradesRequests), { ...options });

export const getOfflineRequestHistory = async (id: number) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IGTOfflineRequestHistoryResult[]>>(Apis().Orders.OfflineRequestHistory, {
        params: { id },
    });
    return data?.result || {};
};

export const deleteRequest = async (Id: number) => {
    let { data } = await AXIOS.post<GlobalApiResponseType<IDeleteRequest>>(Apis().Orders.DeleteRequest as string, null, { params: { Id } });
    return data.result || [];
};

export const useDeleteRequest = (options?: Omit<UseMutationOptions<IDeleteRequest, unknown, number, unknown>, 'mutationFn'> | undefined) => {
    return useMutation(deleteRequest, options);
};

///////////Trades//////////

export const getTradesLists = async (params: IGTTradesListRequest) => {
    try {
        const { data } = await AXIOS.get<GlobalPaginatedApiResponse<IGTTradesListResultType[]>>(Apis().Orders.Trades, {
            params,
        });
        return data;
    } catch (error) {
        return {} as any;
    }
};

export const useTradesLists = <T = IGTTradesResponseType,>(
    param: IGTTradesListRequest,
    options?: Omit<UseQueryOptions<IGTTradesResponseType, unknown, IGTTradesResponseType, any[]>, 'initialData' | 'queryFn' | 'queryKey'> | undefined,
) => {
    return useQuery(['getTradesLists'], ({ queryKey }) => getTradesLists(param as IGTTradesListRequest), { ...options });
};

export const getTradesListExcel = async (params: IGTTradesListRequest) => {
    const { data } = await AXIOS.get(Apis().Orders.TradesExcel, { params });
    return data;
};

export const useTradesListExcel = (
    params: IGTTradesListRequest,
    options?: Omit<UseQueryOptions<any, unknown, any, any[]>, 'initialData' | 'queryFn' | 'queryKey'> | undefined,
) => useQuery(['getTradesListExcel'], () => getTradesListExcel(params), { ...options });





export const orderListDetailFn = async (orderId?: string) => {

    const { data } = await AXIOS.get<GlobalPaginatedApiResponse<IOrderListDetail[]>>(Apis().Orders.OrderDetails, { params: { orderId: orderId } });

    return data.result
};

export const useOrdersListDetails = (
    orderId?: string,
    options?: UseQueryOptions<IOrderListDetail[]>
) => {
    return useQuery<IOrderListDetail[]>(['ordersListDetail', orderId], () => orderListDetailFn(orderId), { ...options });
};
