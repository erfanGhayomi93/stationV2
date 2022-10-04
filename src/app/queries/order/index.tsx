import { useMutation, useQuery } from '@tanstack/react-query';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS from 'src/api/axiosInstance';

export const setOrder = async (params: IOrderRequestType) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<IOrderResponseType>>(apiRoutes.OrderUrl.Create, { ...params });
    return (
        data.result || {
            successClientKeys: [],
            errorNumbers: 0,
        }
    );
};

//////////////getOrder////////////////////
const getOrderFn = async (param: string) => {
    let { data } = await AXIOS.get(apiRoutes.OrderUrl.Get + '?side=None&' + param);
    return data.result || [];
};

export const useGetOrders = (param: string) => {
    return useQuery<IOrderGetType[], Error, IOrderSelected>(['orderList', param], () => getOrderFn(param), {
        select: (data: any) =>
            data.map((item: IOrderGetType) => {
                console.log('Data', data);
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
    let { data } = await AXIOS.post(apiRoutes.OrderUrl.Delete + '?orderId=' + id);
    return data.result || [];
};

export const useSingleDeleteOrders = () => {
    return useMutation(singleDeleteOrderFn);
};
