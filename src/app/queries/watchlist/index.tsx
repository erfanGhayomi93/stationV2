import { useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';

// get watchlists
const getWatchLists = async () => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IWatchlistType[]>>(Apis().WatchList.Get as string, undefined);
    return data?.result;
};

// prettier-ignore
export const useWatchlistsQuery = <T = IWatchlistType[],>(
    options?: Omit<UseQueryOptions<IWatchlistType[], unknown, T, unknown[]>, 'queryKey' | 'queryFn' | 'initialData'>,
) => {
    return useQuery(['getWatchLists'], () => getWatchLists());
};








const createWatchList = async (watchlistName: string) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<ICreateWatchlistResultType>>(
        Apis().WatchList.Create as string,
        {},
        { params: { watchlistName } },
    );
    return data?.result;
};
const deleteWatchList = async (id: number) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<boolean>>(Apis().WatchList.Delete as string, {}, { params: { id } });
    return data?.result;
};

const updateWatchList = async ({ id, watchlistName, isPinned }: IWatchlistRequestType) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<boolean>>(
        Apis().WatchList.Update as string,
        {},
        { params: { id, watchlistName, isPinned } },
    );
    return data?.result;
};
const sortWatchList = async (srrtID: number[]) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<boolean>>(Apis().WatchList.Sort as string, srrtID);
    return data?.result;
};
const getWatchListSymbols = async (watchlistId: number) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IWatchlistSymbolType[]>>(Apis().WatchList.GetWatchlistSymbol as string, {
        params: { watchlistId },
    });
    return data?.result || [];
};

const GetSymbolInWatchlist = async () => {
    const { data } = await AXIOS.get<GlobalApiResponseType<ISymbolInWatchlist[]>>(Apis().WatchList.GetSymbolInWatchlist as string);
    return data?.result || [];
};

const deleteWatchListSymbol = async (params: IWatchlistSymbolRequestType) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<boolean>>(Apis().WatchList.DeleteSymbol as string, {}, { params });
    return data?.result;
};

const addWatchListSymbol = async (params: IWatchlistSymbolRequestType) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<number>>(Apis().WatchList.AddSymbol as string, {}, { params });
    return data?.result;
};
const getDefaultWatchlist = async () => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IDefaultWatchlistType[]>>(Apis().WatchList.DefaultWatchlist as string);
    return data?.result || [];
};
const getDefaultWatchlistSymbols = async (watchlistId: IDefaultWatchlistType) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IWatchlistSymbolTableType[]>>(Apis().WatchList.GetDefaultWatchlistSymbols as string, {
        params: { watchlistId },
    });
    return data?.result;
};
export const getMarketSymbol = async (params: IMarketSymbol) => {
    const { PageNumber, marketUnit, SectorCode } = params || {};
    const { data } = await AXIOS.get<GlobalApiResponseType<IResponseMarket>>(Apis().WatchList.GetMarketSymbol, {
        params: { PageNumber: PageNumber - 1, marketUnit: marketUnit || null, SectorCode: SectorCode || null },
    });
    return data;
};

const getSectorList = async () => {
    const { data } = await AXIOS.get<GlobalApiResponseType<ISectorList[]>>(Apis().WatchList.GetSector);
    return data?.result;
};

//hooks


// prettier-ignore
export const useWatchListSymbolsQuery = <T = IWatchlistSymbolType[],>(watchlistId: number | undefined,
    options?: (Omit<UseQueryOptions<IWatchlistSymbolType[], unknown, T, (string | number | undefined)[]>, "initialData" | "queryFn" | "queryKey">) | undefined
) => {
    return useQuery(['getWatchListSymbols', watchlistId], ({ queryKey }) => getWatchListSymbols(watchlistId as number), { ...options, enabled: !!watchlistId });
};

// prettier-ignore
export const useSymbolInWatchlistQuery = <T = ISymbolInWatchlist[],>(
    options?: (Omit<UseQueryOptions<ISymbolInWatchlist[], unknown, T, (string | number | undefined)[]>, "initialData" | "queryFn" | "queryKey">) | undefined
) => {
    return useQuery(['GetSymbolInWatchlist'], ({ queryKey }) => GetSymbolInWatchlist(), options);
};

export const createWatchListMutation = (
    options?: Omit<UseMutationOptions<ICreateWatchlistResultType, unknown, string, unknown>, 'mutationFn'> | undefined,
) => useMutation(createWatchList, options);

export const deleteWatchListMutation = (options?: Omit<UseMutationOptions<boolean, unknown, number, unknown>, 'mutationFn'> | undefined) =>
    useMutation(deleteWatchList, options);

export const updateWatchListMutation = (
    options?: Omit<UseMutationOptions<boolean, unknown, IWatchlistRequestType, unknown>, 'mutationFn'> | undefined,
) => useMutation(updateWatchList, options);

export const sortWatchListMutation = (options?: Omit<UseMutationOptions<boolean, unknown, number[], unknown>, 'mutationFn'> | undefined) =>
    useMutation(sortWatchList, options);

export const addWatchListSymbolMutation = (
    options?: Omit<UseMutationOptions<number, unknown, IWatchlistSymbolRequestType, unknown>, 'mutationFn'> | undefined,
) => useMutation(addWatchListSymbol, options);

export const deleteWatchListSymbolMutation = (
    options?: Omit<UseMutationOptions<boolean, unknown, IWatchlistSymbolRequestType, unknown>, 'mutationFn'> | undefined,
) => useMutation(deleteWatchListSymbol, options);

// prettier-ignore
export const useDefaultWatchlistQuery = (
) => {
    return useQuery(['getDefaultWatchlist'], ({ queryKey }) => getDefaultWatchlist(), { initialData: [] });
};

// prettier-ignore
export const useDefaultWatchlistSymbolsQuery = (watchlistId?: IDefaultWatchlistType, options?: (Omit<UseQueryOptions<IWatchlistSymbolTableType[], unknown, IWatchlistSymbolTableType[], (string | undefined)[]>, "initialData" | "queryFn" | "queryKey">) | undefined) => {
    return useQuery(['getDefaultWatchlistSymbols', watchlistId], ({ queryKey }) => getDefaultWatchlistSymbols(watchlistId as IDefaultWatchlistType), {
        ...options,
        enabled: !!watchlistId,
    });
};

export const useGetMarketSymbolQuery = (
    params: IMarketSymbol,
    options?: any,
) => {
    const { PageNumber, SectorCode, marketUnit } = params
    return useQuery(['GetMarketSymbol', PageNumber + SectorCode + marketUnit], () => getMarketSymbol(params), { ...options });
};

export const UseGetSector = () => {
    return useQuery(['sectors'], getSectorList);
};
