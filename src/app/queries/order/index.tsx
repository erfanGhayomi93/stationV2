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
    return useQuery<IOrderGetType[], Error, IOrderSelected>(['orderList', GtOrderStateRequestType], () => getOrderFn(GtOrderStateRequestType), {
        select: (data: any) =>
            data.map((item: IOrderGetType) => {
                return {
                    orderId: item.orderId,
                    customerTitle: item.customerTitle,
                    symbolTitle: item.symbolTitle,
                    orderSide: item.orderSide,
                    quantity: item.quantity,
                    price: item.price,
                    value: item.value,
                    sumExecuted: item.sumExecuted,
                    position: item.position,
                    valuePosition: item.valuePosition,
                    validity: item.validity,
                    validityDate: item.validityDate,
                };
            }),
    });
};

//////////////delete Order////////////////////
const singleDeleteOrderFn = async (id: number) => {
    let { data } = await AXIOS.post((Apis().Orders.Delete as string) + '?orderId=' + id);
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
