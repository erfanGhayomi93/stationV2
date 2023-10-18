import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { factoryQueryKey } from 'src/utils/helpers';

export const getCustomerPortfolio = async (params: IGTPortfolioRequestType, signal?: AbortSignal) => {
    const { data } = await AXIOS.get<GlobalPaginatedApiResponse<IGTPortfolioResultType[]>>(Apis().Portfolio.CustomerPortfolio, { params, signal });
    return data;
};

export const useCustomerPortfolio = (params: IGTPortfolioRequestType, options?: UseQueryOptions<GlobalPaginatedApiResponse<IGTPortfolioResultType[]>>) =>
    useQuery<GlobalPaginatedApiResponse<IGTPortfolioResultType[]>>(["portfolioList", factoryQueryKey(params)], ({ signal }) => getCustomerPortfolio(params), {
        // enabled: false,
        ...options,
    });


const getCardexHistoryPortfolio = async (params: THistoryFilter, signal?: AbortSignal) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<ICardexPortfolioResult[]>>(Apis().Portfolio.CardexHistory, { params, signal });
    return data;
}



export const useCardexHistoryPortfolio = (params: THistoryFilter, options?: UseQueryOptions<GlobalApiResponseType<ICardexPortfolioResult[]>>) =>
    useQuery<GlobalApiResponseType<ICardexPortfolioResult[]>>(["CardexHistory", factoryQueryKey(params)], ({ signal }) => getCardexHistoryPortfolio(params, signal), {
        ...options
    })
    
