import AXIOS from '@config/axios';
import { routeApi } from '@router/routeApi';
import { useMutation, useQuery } from '@tanstack/react-query';

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

export const useGroupDeleteOrders = (params: { ordersId: number[] }) => {
     const url = routeApi().Orders.GroupOrderDelete;

     return useMutation({
          mutationFn: async () => {
               const { data } = await AXIOS.post<GlobalApiResponseType<ISingleDeleteOrderResult>>(url, params.ordersId);
               return data.result || [];
          },
     });
};

export const useMutationSendOrder = () => {
     const url = routeApi().Orders.Create;

     return useMutation({
          mutationFn: async (params: ICreateOrderReq) => {
               const { data } = await AXIOS.post<GlobalApiResponseType<ICreateOrderRes>>(url, params);
               return data.result;
          },
     });
};

export const useModifyGroupOrder = () => {
     const url = routeApi().Orders.GroupOrdersModify;

     return useMutation({
          mutationFn: async (params: IModifyGroupOrderReq[]) => {
               const { data } = await AXIOS.post<GlobalApiResponseType<IModifyGroupOrderRes>>(url, { items: params });
               return data.result;
          },
          onSuccess: () => {},
     });
};

export const userDeleteGroupOrder = () => {
     const url = routeApi().Orders.GroupOrderDelete;

     return useMutation({
          mutationFn: async (params: IDeleteGroupOrderReq[]) => {
               const { data } = await AXIOS.post<GlobalApiResponseType<IDeleteGroupOrderRes>>(url, params);
               return data.result;
          },
     });
};
