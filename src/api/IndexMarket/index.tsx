import { useQuery } from '@tanstack/react-query';
import AXIOS from '@config/axios';
import { routeApi } from '@router/routeApi';

export const useQueryIndexMarket = () => {
     const url = routeApi().Index.main;

     return useQuery({
          queryKey: ['IndexMarket'],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<IIndexRes[]>>(url);
               return response.data.result;
          },
     });
};
