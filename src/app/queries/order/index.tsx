import { useMutation, useQuery, UseQueryOptions } from '@tanstack/react-query';
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
const getOrderFn = async (GtOrderStateRequestType: any) => {
    let { data } = await AXIOS.get(Apis().Orders.Get as string, { params: { GtOrderStateRequestType } });

    return data.result || [];
};

export const useGetOrders = ({ GtOrderStateRequestType }: any) => {
    return useQuery<IOrderGetType[], Error>(['orderList', GtOrderStateRequestType], () => getOrderFn(GtOrderStateRequestType));
};

//////////////delete Order////////////////////
const singleDeleteOrderFn = async (orderId: number) => {
    let { data } = await AXIOS.post(Apis().Orders.Delete as string, {}, { params: { orderId } });
    return data.result || [];
};

export const useSingleDeleteOrders = () => {
    return useMutation(singleDeleteOrderFn);
};

// Get Order List

export const getOrderLists = async (params: IGTOrderListRequest) => {
    const { data } = await AXIOS.get<GlobalPaginatedApiResponse<IGTOrderListResultType[]>>(Apis().Orders.Lists, {
        params,
    });
    return data;
};
//prettier-ignore
export const useOrderLists = <T=GlobalPaginatedApiResponse<IGTOrderListResultType[]>>(param: IGTOrderListRequest,
    options?: (Omit<UseQueryOptions<GlobalPaginatedApiResponse<IGTOrderListResultType[]>, unknown, GlobalPaginatedApiResponse<IGTOrderListResultType[]>, any[]>, "initialData" | "queryFn" | "queryKey"> ) | undefined)=>{
    return useQuery(['getOrderLists'], ({ queryKey }) => getOrderLists(param as IGTOrderListRequest), { ...options,enabled:false });
};
