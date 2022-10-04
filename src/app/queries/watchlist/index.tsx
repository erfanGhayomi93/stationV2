import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS from 'src/api/axiosInstance';

// queries
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
const deleteWatchList = async (id: number) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<boolean>>(apiRoutes.WatchList.Delete, {}, { params: { id } });
    return data?.result;
};

const updateWatchList = async ({ id, watchlistName, isPinned }: IWatchlistRequestType) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<boolean>>(apiRoutes.WatchList.Update, {}, { params: { id, watchlistName, isPinned } });
    return data?.result;
};
const getWatchListSymbols = async (watchlistId: number) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IWatchlistSymbolType[]>>(apiRoutes.WatchList.GetWatchlistSymbol, {
        params: { watchlistId },
    });
    return data?.result || [];
};

const deleteWatchListSymbol = async (params: IWatchlistSymbolRequestType) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<boolean>>(apiRoutes.WatchList.DeleteSymbol, {}, { params });
    return data?.result;
};

const addWatchListSymbol = async (params: IWatchlistSymbolRequestType) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<number>>(apiRoutes.WatchList.AddSymbol, {}, { params });
    return data?.result;
};
const getDefaultWatchlist = async () => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IDefaultWatchlistType[]>>(apiRoutes.WatchList.DefaultWatchlist);
    return data?.result;
};
const getDefaultWatchlistSymbols = async (watchlistId: IDefaultWatchlistType) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<ISymbolType & Pick<IWatchlistSymbolType, 'symbolISIN'>>>(
        apiRoutes.WatchList.GetDefaultWatchlistSymbols,
        {},
        { params: watchlistId },
    );
    return data?.result;
};

//hooks

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

export const deleteWatchListMutation = (options?: Omit<UseMutationOptions<boolean, unknown, number, unknown>, 'mutationFn'> | undefined) =>
    useMutation(deleteWatchList, options);

export const updateWatchListMutation = (
    options?: Omit<UseMutationOptions<boolean, unknown, IWatchlistRequestType, unknown>, 'mutationFn'> | undefined,
) => useMutation(updateWatchList, options);

export const addWatchListSymbolMutation = (
    options?: Omit<UseMutationOptions<number, unknown, IWatchlistSymbolRequestType, unknown>, 'mutationFn'> | undefined,
) => useMutation(addWatchListSymbol, options);

export const deleteWatchListSymbolMutation = (
    options?: Omit<UseMutationOptions<boolean, unknown, IWatchlistSymbolRequestType, unknown>, 'mutationFn'> | undefined,
) => useMutation(deleteWatchListSymbol, options);

// prettier-ignore
export const useDefaultWatchlistQuery = () => {
    return useQuery(['getDefaultWatchlist'], ({ queryKey }) => getDefaultWatchlist());
};

// prettier-ignore
export const useDefaultWatchlistSymbolsQuery = (watchlistId: IDefaultWatchlistType) => {
    return useQuery(['getWatchListSymbols', watchlistId], ({ queryKey }) => getDefaultWatchlistSymbols(watchlistId), {
        enabled: !!watchlistId,
    });
};
