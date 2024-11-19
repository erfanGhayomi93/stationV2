import AXIOS from '@config/axios';
import { createQueryKeyByParams } from '@methods/helper';
import { routeApi } from '@router/routeApi';
import { useQuery } from '@tanstack/react-query';

export const useQueryCartList = () => {
     const url = routeApi().Baskets.cartList;

     return useQuery({
          queryKey: ['cartList'],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<ICartListRes[]>>(url);
               return response.data.result;
          },
          select(data) {
             return data.map(item => {
               if(item.sendDate === "0001-01-01T00:00:00"){
                    return {
                         ...item , 
                         sendDate : null
                    }
               }
               return item;
             })
          },
     });
};

export const useQueryDetailsCart = (params: IDetailsCartReq) => {
     const url = routeApi().Baskets.CartDetailList;

     return useQuery({
          queryKey: ['detailsCard', ...createQueryKeyByParams(params)],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalPaginatedApiResponse<IDetailsCartRes[]>>(url, { params });
               return response.data;
          },
          enabled: !!params.CartId,
     });
};
