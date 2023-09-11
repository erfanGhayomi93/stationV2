import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';

export const getCustomerPortfolio = async (params: IGTPortfolioRequestType) => {
    const { data } = await AXIOS.get<IGTPortfolioResponseType>(Apis().Portfolio.CustomerPortfolio, { params });
    return data.result || [];
};

export const useCustomerPortfolio = (params: IGTPortfolioRequestType, options?: UseQueryOptions<IGTPortfolioResultType[]>) =>
    useQuery<IGTPortfolioResultType[]>([Apis().Portfolio.CustomerPortfolio], () => getCustomerPortfolio(params), {
        enabled: !!params.CustomerISIN,
        ...options,
    });
