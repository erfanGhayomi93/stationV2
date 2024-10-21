import AXIOS from '@config/axios';
import { routeApi } from '@router/routeApi';
import { useQuery } from '@tanstack/react-query';





export const useQueryCommission = () => {
     const url = routeApi().Commission.GetBuyAndSellCommission;

     return useQuery({
          queryKey: ['GetBuyAndSellCommission'],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<ICommissionRes[]>>(url);
               return response.data.result;
          },
          gcTime: 0,
          staleTime: 0,
     });
};
