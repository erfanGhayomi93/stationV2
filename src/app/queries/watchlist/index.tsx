import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS from 'src/api/axiosInstance';

const getWatchLists = async () => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IWatchlistType[]>>(apiRoutes.WatchList.Get, undefined);
    return data?.result;
};

const createWatchList = async (watchlistName: string) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<ICreateWatchlistResultType>>(
        apiRoutes.WatchList.Create,
        {},
        { params: { watchlistName } },
    );
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
    return useQuery(['getWatchLists'], ({ queryKey }) => getWatchLists());
};

// prettier-ignore
export const useWatchListSymbolsQuery =(watchlistId:number|undefined) => {
    return useQuery(['getWatchListSymbols', watchlistId], ({ queryKey }) => getWatchListSymbols(watchlistId as number), { enabled: !!watchlistId });
};

export const createWatchListMutation = (
    options?: Omit<UseMutationOptions<ICreateWatchlistResultType, unknown, string, unknown>, 'mutationFn'> | undefined,
) => useMutation(createWatchList, options);
