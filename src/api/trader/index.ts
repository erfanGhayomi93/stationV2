import { useQuery } from '@tanstack/react-query';
import AXIOS from '@config/axios';
import { routeApi } from '@router/routeApi';

export const useQueryGeneralUser = () => {
     const url = routeApi()?.Trader.GetUserInformation;

     return useQuery({
          queryKey: ['userGeneralInformation'],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalApiResponseType<IUserType>>(url);
               return response.data.result;
          },
     });
};
