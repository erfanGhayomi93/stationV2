import { useQuery } from '@tanstack/react-query';
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

export const useGetOrders = (param: string, option: any) => {
    return useQuery<IOrderRequestType, Error, IOrderSelected>(['orderList', param], () => getOrderFn(param), option);
};
