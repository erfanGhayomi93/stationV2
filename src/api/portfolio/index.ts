import AXIOS from '@config/axios';
import { createQueryKeyByParams } from '@methods/helper';
import { routeApi } from '@router/routeApi';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useQueryPortfolio = (
     params: IPortfolioReq,
     options?: Omit<UseQueryOptions<GlobalPaginatedApiResponse<IPortfolioRes[]>>, 'queryKey' | 'queryFn'>
) => {
     const url = routeApi().Portfolios.CustomerPortfolio;

     return useQuery({
          queryKey: ['portfolioList', ...createQueryKeyByParams<IPortfolioReq>(params)],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalPaginatedApiResponse<IPortfolioRes[]>>(url, { params });
               return response.data;
          },
          //   enabled: false,
          ...options,
     });
};
