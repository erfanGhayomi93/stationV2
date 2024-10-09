import AXIOS from '@config/axios';
import { routeApi } from '@router/routeApi';
import { useQuery } from '@tanstack/react-query';

export const useQueryTodayOrders = (params: ITodayOrderReq) => {
     const url = routeApi().Orders.TodayOrdersList;

     return useQuery({
          queryKey: [
               'openOrders' + params.GtOrderStateRequestType + String(params.CustomerISIN) + params.symbolISIN + params.side,
          ],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<IOpenOrder[]>>(url, { params });
               return response.data.result;
          },
          gcTime: 0,
     });
};

export const useQueryDoneOrders = (params: IDoneOrdersReq) => {
     const url = routeApi().Orders.todayDoneOrders;

     return useQuery({
          queryKey: ['doneOrders', params.customerISIN, params.symbolISIN, params.orderSide, params.aggregateType],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<IDoneOrdersRes[]>>(url, { params });
               return response.data.result;
          },
          gcTime: 0,
     });
};
