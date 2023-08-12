import { QueryOptions, useMutation, UseMutationOptions, useQuery, UseQueryOptions } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';

// get watchlists//
const getWatchLists = async () => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IWatchlistType[]>>(Apis().WatchList.Get as string, undefined);
    return data?.result;
};

export const useWatchlistsQuery = <T = IWatchlistType[],>(
    options?: Omit<UseQueryOptions<IWatchlistType[], unknown, T, unknown[]>, 'queryKey' | 'queryFn' | 'initialData'>,
) => {
    return useQuery(['getWatchLists'], () => getWatchLists());
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


{/* get watchlists List user */ }
const getWatchListSymbols = async (params: IRequestWatchListSymbol) => {
    const { watchlistId, PageNumber, watchlistType, MarketUnit, SectorCode, type } = params

    let paramsOnWatchlistType: Partial<IRequestWatchListSymbol> = {
        PageNumber,
        watchlistId,
        watchlistType
    }
    if (watchlistType === "Market") {
        MarketUnit && (paramsOnWatchlistType.MarketUnit = MarketUnit)
        SectorCode && (paramsOnWatchlistType.SectorCode = SectorCode)
    } else if (watchlistType === 'Ramand') {
        paramsOnWatchlistType.type = type
    }

    const { data } = await AXIOS.get<GlobalApiResponseType<IGetWatchlistSymbol[]>>(Apis().WatchList.GetWatchListSymbols as string, {
        params: paramsOnWatchlistType,
    });
    return data?.result || [];
};

export const useWatchListSymbolsQuery = (
    params: IRequestWatchListSymbol,
    options?: (Omit<UseQueryOptions<IGetWatchlistSymbol[], unknown, IGetWatchlistSymbol[], string[]>, "initialData" | "queryFn" | "queryKey">) | undefined) => {
    const { watchlistId, PageNumber, MarketUnit, SectorCode, watchlistType, type } = params
    const queryKey = watchlistType === "Market" ? MarketUnit as string + SectorCode : watchlistType === "Ramand" ? type : ""
    return useQuery(['getWatchListSymbols', watchlistId + '-' + PageNumber + queryKey], () => getWatchListSymbols(params), { ...options });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



{/* // get watchlist symbol market */ }
{/* export const getMarketSymbol = async (params: IMarketSymbol) => {
    const { PageNumber, marketUnit, SectorCode, watchlistType } = params || {};
    const { data } = await AXIOS.get<GlobalApiResponseType<IResponseMarket>>(Apis().WatchList.GetMarketSymbol, {
        params: { PageNumber: PageNumber - 1, marketUnit: marketUnit || null, SectorCode: SectorCode || null, watchlistType },
    });
    return data.result;
};


export const useGetMarketSymbolQuery = <T = IResponseMarket[],>(
    params: IMarketSymbol,
    options?: any
) => {
    const { PageNumber, SectorCode, marketUnit, watchlistType } = params
    return useQuery(['GetMarketSymbol', PageNumber + SectorCode + marketUnit], () => getMarketSymbol(params), { ...options, enabled: watchlistType === "Market" });
}; */}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





{/* //get watchlist symbol default ramand // */ }
{/* const getDefaultWatchlistSymbols = async (selectedDefaultWatchlist: IDefaultWatchlistType, watchlistType: string) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IWatchlistSymbolTableType[]>>(Apis().WatchList.GetDefaultWatchlistSymbols as string, {
        params: { watchlistId: selectedDefaultWatchlist, watchlistType },
    });
    return data?.result;
};

export const useDefaultWatchlistSymbolsQuery = (
    selectedDefaultWatchlist: IDefaultWatchlistType,
    watchlistType: WatchlistType,
    options?: (Omit<UseQueryOptions<IWatchlistSymbolTableType[], unknown, IWatchlistSymbolTableType[], (string)[]>, "initialData" | "queryFn" | "queryKey">) | undefined
) => {
    return useQuery(['getDefaultWatchlistSymbols', selectedDefaultWatchlist], () => getDefaultWatchlistSymbols(selectedDefaultWatchlist as IDefaultWatchlistType, watchlistType), {
        ...options,
        enabled: !!selectedDefaultWatchlist && watchlistType === 'Ramand',
    });
}; */}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

{/* // add symbol in watchlist */ }
const addWatchListSymbol = async (params: IWatchlistSymbolRequestType) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<number>>(Apis().WatchList.AddSymbol as string, {}, { params });
    return data?.result;
};


export const addWatchListSymbolMutation = (
    options?: Omit<UseMutationOptions<number, unknown, IWatchlistSymbolRequestType, unknown>, 'mutationFn'> | undefined,
) => useMutation(addWatchListSymbol, options);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
{/* // remove symbol in watchlist */ }
const deleteWatchListSymbol = async (params: IWatchlistSymbolRequestType) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<boolean>>(Apis().WatchList.DeleteSymbol as string, {}, { params });
    return data?.result;
};


export const deleteWatchListSymbolMutation = (
    options?: Omit<UseMutationOptions<boolean, unknown, IWatchlistSymbolRequestType, unknown>, 'mutationFn'> | undefined,
) => useMutation(deleteWatchListSymbol, options);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
{/* // show default watchlist baseOn ... in watchlist */ }

const getDefaultWatchlist = async () => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IDefaultWatchlistType[]>>(Apis().WatchList.DefaultWatchlist as string);
    return data?.result || [];
};


export const useDefaultWatchlistQuery = (
) => {
    return useQuery(['getDefaultWatchlist'], () => getDefaultWatchlist(), { initialData: [] });
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
{/* // get sector */ }

const getSectorList = async () => {
    const { data } = await AXIOS.get<GlobalApiResponseType<ISectorList[]>>(Apis().WatchList.GetSector);
    return data?.result;
};

export const UseGetSector = () => {
    return useQuery(['sectors'], getSectorList, { staleTime: 30000 });
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////












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

const updateWatchList = async ({ id, watchListName }: IWatchlistRequestType) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<boolean>>(
        Apis().WatchList.Update as string,
        {},
        { params: { id, watchListName } },
    );
    return data?.result;
};
const sortWatchList = async (srrtID: number[]) => {
    const { data } = await AXIOS.post<GlobalApiResponseType<boolean>>(Apis().WatchList.Sort as string, srrtID);
    return data?.result;
};


const GetSymbolInWatchlist = async () => {
    const { data } = await AXIOS.get<GlobalApiResponseType<ISymbolInWatchlist[]>>(Apis().WatchList.GetSymbolInWatchlist as string);
    return data?.result || [];
};







//hooks



// prettier-ignore
export const useSymbolInWatchlistQuery = () => {
    return useQuery(['GetSymbolInWatchlist'], () => GetSymbolInWatchlist(), {
        select(data) {
            const res: { [key: string]: string[] } = {}

            data.map(item => {
                if (res[item.watchlistId]) {
                    res[item.watchlistId] = [...res[item.watchlistId], item.symbolISIN]
                    return
                }
                res[item.watchlistId] = [item.symbolISIN]
            })
            return res;
        },
        staleTime: 10 * 60000
    });
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








