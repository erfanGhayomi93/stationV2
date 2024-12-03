import AXIOS from '@config/axios';
import { createQueryKeyByParams } from '@methods/helper';
import { routeApi } from '@router/routeApi';
import { useMutation, useQuery } from '@tanstack/react-query';

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
                    if (item.sendDate === '0001-01-01T00:00:00') {
                         return {
                              ...item,
                              sendDate: null,
                         };
                    }
                    return item;
               });
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

export const useCreateCart = () => {
     const url = routeApi().Baskets.createCart;

     return useMutation({
          mutationFn: async (params: ICreateCartReq) => {
               const response = await AXIOS.post(url, null, { params });

               return response.data;
          },
     });
};

export const useDeleteCart = () => {
     const url = routeApi().Baskets.deleteCart;

     return useMutation({
          mutationFn: async (params: IDeleteCartReq) => {
               const response = await AXIOS.post(url, null, { params });

               return response.data;
          },
     });
};

export const useEditCart = () => {
     const url = routeApi().Baskets.editCart;
     return useMutation({
          mutationFn: async (params: IEditCartReq) => {
               const response = await AXIOS.post(url, null, { params });

               return response.data;
          },
     });
};

export const useDeleteDetails = () => {
     const url = routeApi().Baskets.deleteDetails;

     return useMutation({
          mutationFn: async (params: IDeleteDetailsCartRes) => {
               const response = await AXIOS.post(url, null, { params });

               return response.data;
          },
     });
};

export const useSendCart = ({ onSuccess }: { onSuccess: () => void }) => {
     const url = routeApi().Baskets.cartSendOrder;

     return useMutation({
          mutationFn: async (cartId: number) => {
               const fd = new FormData();
               fd.append('cartId', String(cartId));

               const response = await AXIOS.post(url, fd);

               return response.data;
          },
          onSuccess: onSuccess,
     });
};
