import AXIOS from '@config/axios';
import { routeApi } from '@router/routeApi';
import { useQuery } from '@tanstack/react-query';

export const usePositionsCustomer = (params: IPositionsCustomerReq) => {
     const url = routeApi().Option.GetOptionOrder;

     return useQuery({
          queryKey: ['getPositionsCustomer', params],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<IPositionsCustomerRes[]>>(url, { params });

               return response.data.result;
          },
     });
};
