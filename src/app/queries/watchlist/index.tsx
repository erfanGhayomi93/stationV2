import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS from 'src/api/axiosInstance';

const getWatchLists = async () => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IWatchlistType[]>>(apiRoutes.WatchList.Get, {});
    return data?.result;
};
const getWatchListSymbols = async (watchlistId: number) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IWatchlistSymbolType[]>>(apiRoutes.WatchList.GetWatchlistSymbol, {
        params: { watchlistId },
    });
    return data?.result || [];
};

// prettier-ignore
export const useWatchListsQuery = <T=IWatchlistType[],>(
    options?: Omit<UseQueryOptions<IWatchlistType[], unknown, T, unknown[]>, 'queryKey' | 'queryFn' | 'initialData'>,
) => {
    return useQuery(['getWatchLists'], ({ queryKey }) => getWatchLists(), options);
};

// prettier-ignore
export const useWatchListSymbolsQuery =(watchlistId:number|undefined) => {
    return useQuery(['getWatchLists', watchlistId], ({ queryKey }) => getWatchListSymbols(watchlistId as number),{enabled:!!watchlistId});
};
