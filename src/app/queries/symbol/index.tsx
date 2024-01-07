import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { queryClient } from 'src/app/queryClient';

const getSymbolGeneralInfo = async (symbolISIN: string, signal?: AbortSignal) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<SymbolGeneralInfoType>>(Apis().Symbol.SymbolGeneralInformation as string, {
        params: { symbolISIN },
        signal
    });
    return data?.result;
};

export const useSymbolGeneralInfo = <T,>(
    symbolISIN: string,
    options?: { select?: (data: SymbolGeneralInfoType) => T; onSuccess?: (data: T) => void, enabled?: boolean },
) => {
    return useQuery(['SymbolGeneralInfo', symbolISIN], ({ queryKey, signal }) => getSymbolGeneralInfo(queryKey[1], signal), {
        enabled: !!symbolISIN,
        // staleTime: Infinity,
        // cacheTime: Infinity,
        onSettled: () => {
            queryClient.invalidateQueries(['userRecentSymbolHistory', 'GeneralSearch']);
        },
        ...options,
    });
};
//////////////////////


const getOption = async (symbolISIN: string) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<OptionGeneralInformation>>(Apis().Option.SymbolInformation, { params: { symbolISIN } });
    return data.result || [];
};

export const useOptionGeneralInformation = (symbolISIN: string) =>
    useQuery(["optionInformation", symbolISIN], () => getOption(symbolISIN),
        {
            enabled: !!symbolISIN,
        },
    );







////////////////////////

const getSameSectorSymbols = async (symbolISIN: string) => {
    const { data } = await AXIOS.get<GetSameSectorResponseType>(Apis().Symbol.SameSectorSymbols, { params: { symbolISIN } });
    return data.result || [];
};

export const useGetSameSectorSymbols = (symbolISIN: string, options?: UseQueryOptions<GetSameSectorResultType[]>) =>
    useQuery<GetSameSectorResultType[]>(
        [Apis().Symbol.SameSectorSymbols, symbolISIN],
        ({ queryKey }) => getSameSectorSymbols(queryKey[1] as string),
        {
            cacheTime: Infinity,
            staleTime: Infinity,
            enabled: !!symbolISIN,
            ...options,
        },
    );

const searchSymbol = async (term: string) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<SymbolSearchResult[]>>(Apis().Symbol.Search as string, { params: { term } });
    return Array.isArray(data?.result) ? data.result.slice(0, 10) : [];
};
//prettier-ignore
export const useSymbolSearch = <T = SymbolSearchResult[]>(
    term: string,
    options?:
        | Omit<UseQueryOptions<SymbolSearchResult[], unknown, T, string[]>, 'initialData' | 'queryFn' | 'queryKey'>
        | undefined,
) => {
    return useQuery(['SymbolSearch', term], ({ queryKey }) => searchSymbol(queryKey[1]), {
        enabled: !!term,
        staleTime: 0,
        cacheTime: 0,
        ...options,
    });
};

const getChartSymbol = async (symbolISIN: string, duration: SymbolChartDate, signal?: AbortSignal) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<GetChartSymbolType[]>>(Apis().Symbol.ChartData, {
        signal,
        params: {
            symbolISIN,
            duration,
        },
    });

    return data?.result || [];
};

export const useChartSymbol = (
    symbolISIN: string,
    duration: SymbolChartDate,
    options?: Omit<UseQueryOptions<GetChartSymbolType[], Error, GetChartSymbolType[], string[]>, 'initialData' | 'queryFn' | 'queryKey'> | undefined,
) => {
    return useQuery(['chartSymbol', symbolISIN + '-' + duration], ({ signal }) => getChartSymbol(symbolISIN, duration, signal), {
        ...options,
    });
};

const getMarketUnit = async (signal?: AbortSignal) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<IMarketUnitType[]>>(Apis().Symbol.GetMarketUnit, { signal });
    return data;
};

export const useMarketUnit = (options?: UseQueryOptions<GlobalApiResponseType<IMarketUnitType[]>>) =>
    useQuery<GlobalApiResponseType<IMarketUnitType[]>>(['marketUnitList'], ({ signal }) => getMarketUnit(signal), {
        ...options,
    });
