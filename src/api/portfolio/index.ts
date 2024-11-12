import AXIOS from '@config/axios';
import { createQueryKeyByParams } from '@methods/helper';
import { routeApi } from '@router/routeApi';
import { useQuery } from '@tanstack/react-query';

export const useQueryPortfolio = (params: IPortfolioReq) => {
     const url = routeApi().Portfolios.CustomerPortfolio;

     return useQuery({
          queryKey: ['portfolioList', ...createQueryKeyByParams<IPortfolioReq>(params)],
          queryFn: async () => {
               const response = await AXIOS.get<GlobalPaginatedApiResponse<IPortfolioRes[]>>(url, {
                    params: {
                         SymbolISIN: params.SymbolISIN,
                         CustomerISIN: params.CustomerISIN,
                    },
               });
               return response.data;
          },
          enabled: false,
     });
};
