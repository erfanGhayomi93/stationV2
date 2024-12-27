import AXIOS from '@config/axios';
import { routeApi } from '@router/routeApi';
import { useMutation, useQuery } from '@tanstack/react-query';
import { cleanObjectOfFalsyValues } from '@methods/helper.ts';

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
          enabled: !!params.symbolISIN,
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
          enabled: !!params.symbolISIN,
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

export const useDeleteGroupOrder = () => {
     const url = routeApi().Orders.GroupOrderDelete;

     return useMutation({
          mutationFn: async (params: IDeleteGroupOrderReq[]) => {
               const { data } = await AXIOS.post<GlobalApiResponseType<IDeleteGroupOrderRes>>(url, params);
               return data.result;
          },
     });
};

export const useTradesReports = (filters: ITradesReportsFilters) => {
     const url = routeApi().Orders.GetTrades;

     return useQuery({
          queryKey: ['TradesReports', filters.pageNumber, filters.pageSize],
          queryFn: async () => {
               const params: ITradesReportsReq = {
                    FromDate: new Date(filters.fromDate),
                    ToDate: new Date(filters.toDate),
                    CustomerISIN: filters.customers.map(customer => customer.customerISIN),
                    Side: filters.side.id !== 'All' ? filters.side.id : undefined,
                    SymbolISIN: filters.symbols.map(symbol => symbol?.symbolISIN ?? ''),
                    CustomerType: filters.customerType.id !== 'All' ? filters.customerType.id : undefined,
                    GetTradesAggregateType: filters.aggregateType.id,
                    'QueryOption.PageNumber': filters.pageNumber,
                    'QueryOption.PageSize': filters.pageSize,
               };

               const response = await AXIOS.get<GlobalPaginatedApiResponse<ITradesReportsRes[]>>(url, {
                    params: cleanObjectOfFalsyValues(params),
               });

               return response.data;
          },
     });
};

export const useDetailsTradesReports = (rowData?: ITradesReportsRes) => {
     const url = routeApi().Orders.GetTradeDetails;

     return useQuery({
          queryKey: ['detailsTradesReports'],
          queryFn: async () => {
               if (!rowData) return;
               const params: IDetailsTradesReportsReq = {
                    CustomerISIN: rowData.customerISIN,
                    SymbolISIN: rowData.symbolISIN,
                    OrderId: rowData.orderId,
                    OrderSide: rowData.orderSide,
                    TradeDate: rowData.tradeDate,
                    GetTradesAggregateType: 'None',
               };
               const response = await AXIOS.get<GlobalApiResponseType<IDetailsTradesReportsRes[]>>(url, {
                    params,
               });

               return response.data.result;
          },
     });
};
