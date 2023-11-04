import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import AXIOS from "src/api/axiosInstance";
import { Apis } from "src/common/hooks/useApiRoutes/useApiRoutes";


const getSavedStudyTemplates = async (params: IRequestSavedStudyTemplates, signal?: AbortSignal) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<TvStudyTemplateListType[]>>(Apis().tvChart.studyTemplate, {
        params,
        signal
    });
    return data?.result;
};

export const useSavedStudyTemplatesQuery = (
    params: IRequestSavedStudyTemplates,
    options?: Omit<UseQueryOptions<TvStudyTemplateListType[], unknown, TvStudyTemplateListType[], unknown[]>, 'queryKey' | 'queryFn' | 'initialData'>,
) => {
    return useQuery(['tvStudyTemplates'], ({ signal }) => getSavedStudyTemplates(params, signal), options);
};

/*-------------------------------------------------------*/


const getTvSavedChart = async (params: IRequestSavedStudyTemplates, signal?: AbortSignal) => {
    const { data } = await AXIOS.get<{ data: TvSavedChartType[], status: string }>(Apis().tvChart.loadAll, {
        params,
        signal
    });

    return data?.data || [];
};

export const useTvSavedChart = (
    params: IRequestSavedStudyTemplates,
    options?: Omit<UseQueryOptions<TvSavedChartType[], Error, TvSavedChartType[], unknown[]>, 'queryKey' | 'queryFn' | 'initialData'>,
) => {
    return useQuery(['tvSavedCharts'], ({ signal }) => getTvSavedChart(params, signal), options);
};


/*-------------------------------------------------------*/


const getSymbolSearch = async (term: string, signal?: AbortSignal) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<SearchSymbolType[]>>(Apis().Symbol.Search, {
        params: {
            term,
            signal
        },
    });
    return data?.result;
};

export const useSymbolSearchQuery = (
    term: string,
    options?: Omit<UseQueryOptions<SearchSymbolType[], Error, SearchSymbolType[], unknown[]>, 'queryKey' | 'queryFn' | 'initialData'>,
) => {
    return useQuery(['symbolSearch'], ({ signal }) => getSymbolSearch(term, signal), options);
};

/*-------------------------------------------------------*/


const getRecentSymbolHistory = async (signal?: AbortSignal) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<SymbolSearchResult[]>>(Apis().tvChart.historyRecent, {
        signal
    });

    return data?.result || [];
};

export const useRecentSymbolHistory = (
    options?: Omit<UseQueryOptions<SymbolSearchResult[], Error, SymbolSearchResult[], unknown[]>, 'queryKey' | 'queryFn' | 'initialData'>,
) => {
    return useQuery(['userRecentSymbolHistory'], ({ signal }) => getRecentSymbolHistory(signal), options);
};

/*-------------------------------------------------------*/


// const getSavedCharts = async (params: IRequestSavedStudyTemplates) => {
//     const { data } = await AXIOS.get<GlobalApiResponseType<TvSavedChartType[]>>(Apis().Symbol.Search, {
//         params
//     });
//     return data?.result;
// };
//
// export const useSavedChartsQuery = (
//     params: IRequestSavedStudyTemplates,
//     options?: Omit<UseQueryOptions<TvSavedChartType[], Error, TvSavedChartType[], unknown[]>, 'queryKey' | 'queryFn' | 'initialData'>,
// ) => {
//     return useQuery(['tvSavedChartsSearch'], () => getSavedCharts(params), options);
// };


