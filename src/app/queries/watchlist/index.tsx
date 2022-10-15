import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS from 'src/api/axiosInstance';
import { getApiPath } from 'src/common/hooks/useApiRoutes/useApiRoutes';

// queries
const getWatchLists = async () => {
    const apiRoutes = getApiPath();

    const { data } = await AXIOS.get<GlobalApiResponseType<IWatchlistType[]>>(apiRoutes?.WatchList.Get as string, undefined);
    return data?.result;
};

const createWatchList = async (watchlistName: string) => {
    const apiRoutes = getApiPath();

    const { data } = await AXIOS.post<GlobalApiResponseType<ICreateWatchlistResultType>>(
        apiRoutes?.WatchList.Create as string,
        {},
        { params: { watchlistName } },
    );
    return data?.result;
};
const deleteWatchList = async (id: number) => {
    const apiRoutes = getApiPath();

    const { data } = await AXIOS.post<GlobalApiResponseType<boolean>>(apiRoutes?.WatchList.Delete as string, {}, { params: { id } });
    return data?.result;
};

const updateWatchList = async ({ id, watchlistName, isPinned }: IWatchlistRequestType) => {
    const apiRoutes = getApiPath();

    const { data } = await AXIOS.post<GlobalApiResponseType<boolean>>(
        apiRoutes?.WatchList.Update as string,
        {},
        { params: { id, watchlistName, isPinned } },
    );
    return data?.result;
};
const getWatchListSymbols = async (watchlistId: number) => {
    const apiRoutes = getApiPath();

    const { data } = await AXIOS.get<GlobalApiResponseType<IWatchlistSymbolType[]>>(apiRoutes?.WatchList.GetWatchlistSymbol as string, {
        params: { watchlistId },
    });
    return data?.result || [];
};

const deleteWatchListSymbol = async (params: IWatchlistSymbolRequestType) => {
    const apiRoutes = getApiPath();

    const { data } = await AXIOS.post<GlobalApiResponseType<boolean>>(apiRoutes?.WatchList.DeleteSymbol as string, {}, { params });
    return data?.result;
};

const addWatchListSymbol = async (params: IWatchlistSymbolRequestType) => {
    const apiRoutes = getApiPath();

    const { data } = await AXIOS.post<GlobalApiResponseType<number>>(apiRoutes?.WatchList.AddSymbol as string, {}, { params });
    return data?.result;
};
const getDefaultWatchlist = async () => {
    const apiRoutes = getApiPath();

    const { data } = await AXIOS.get<GlobalApiResponseType<IDefaultWatchlistType[]>>(apiRoutes?.WatchList.DefaultWatchlist as string);
    return data?.result || [];
};
const getDefaultWatchlistSymbols = async (watchlistId: IDefaultWatchlistType) => {
    const apiRoutes = getApiPath();

    const { data } = await AXIOS.get<GlobalApiResponseType<IWatchlistSymbolTableType[]>>(apiRoutes?.WatchList.GetDefaultWatchlistSymbols as string, {
        params: { watchlistId },
    });
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
export const useWatchListSymbolsQuery =<T=IWatchlistSymbolType[],>(watchlistId:number|undefined,
    options?: (Omit<UseQueryOptions<IWatchlistSymbolType[], unknown, T, (string | number | undefined)[]>, "initialData" | "queryFn" | "queryKey"> ) | undefined
    ) => {
    return useQuery(['getWatchListSymbols', watchlistId], ({ queryKey }) => getWatchListSymbols(watchlistId as number), {...options,enabled:!!watchlistId});
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
export const useDefaultWatchlistQuery = (
) => {
    return useQuery(['getDefaultWatchlist'], ({ queryKey }) => getDefaultWatchlist(), {initialData:[]});
};

// prettier-ignore
export const useDefaultWatchlistSymbolsQuery = (watchlistId?: IDefaultWatchlistType, options?: (Omit<UseQueryOptions<IWatchlistSymbolTableType[], unknown, IWatchlistSymbolTableType[], (string | undefined)[]>, "initialData" | "queryFn" | "queryKey"> ) | undefined) => {
    return useQuery(['getDefaultWatchlistSymbols', watchlistId], ({ queryKey }) => getDefaultWatchlistSymbols(watchlistId as IDefaultWatchlistType), {
        ...options,
        enabled: !!watchlistId,
    });
};
