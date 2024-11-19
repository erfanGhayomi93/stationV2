import AXIOS from '@config/axios';
import { createQueryKeyByParams } from '@methods/helper';
import { routeApi } from '@router/routeApi';
import { useQuery } from '@tanstack/react-query';

export const usePositionsCustomer = (params: IPositionsCustomerReq) => {
     const url = routeApi().Option.GetOptionOrder;

     return useQuery({
          queryKey: ['getPositionsCustomer', ...createQueryKeyByParams(params)],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<IPositionsCustomerRes[]>>(url, { params });

               return response.data.result;
          },
     });
};
