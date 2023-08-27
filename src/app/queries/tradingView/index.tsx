import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import apiRoutes from "src/api/apiRoutes";
import AXIOS from "src/api/axiosInstance";



const getSavedStudyTemplates = async (params: IRequestSavedStudyTemplates) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<TvStudyTemplateListType[]>>(apiRoutes.tvChart.studyTemplate, {
        params
    });
    return data?.result;
};

export const useSavedStudyTemplatesQuery = (
    params: IRequestSavedStudyTemplates,
    options?: Omit<UseQueryOptions<TvStudyTemplateListType[], unknown, TvStudyTemplateListType[], unknown[]>, 'queryKey' | 'queryFn' | 'initialData'>,
) => {
    return useQuery(['tvStudyTemplates'], () => getSavedStudyTemplates(params), options);
};

/*-------------------------------------------------------*/


const getTvSavedChart = async (params: IRequestSavedStudyTemplates) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<TvSavedChartType[]>>(apiRoutes.tvChart.loadAll, {
        params
    });
    return data?.result;
};

export const useTvSavedChart = (
    params: IRequestSavedStudyTemplates,
    options?: Omit<UseQueryOptions<TvSavedChartType[], Error, TvSavedChartType[], unknown[]>, 'queryKey' | 'queryFn' | 'initialData'>,
) => {
    return useQuery(['tvSavedCharts'], () => getTvSavedChart(params), options);
};


/*-------------------------------------------------------*/


const getSymbolSearch = async (term: string) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<SearchSymbolType[]>>(apiRoutes.Symbol.Search, {
        params: {
            term
        },
    });
    return data?.result;
};

export const useSymbolSearchQuery = (
    term: string,
    options?: Omit<UseQueryOptions<SearchSymbolType[], Error, SearchSymbolType[], unknown[]>, 'queryKey' | 'queryFn' | 'initialData'>,
) => {
    return useQuery(['symbolSearch'], () => getSymbolSearch(term), options);
};
/*-------------------------------------------------------*/


const getSavedCharts = async (params: IRequestSavedStudyTemplates) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<TvSavedChartType[]>>(apiRoutes.Symbol.Search, {
        params
    });
    return data?.result;
};

export const useSavedChartsQuery = (
    params: IRequestSavedStudyTemplates,
    options?: Omit<UseQueryOptions<TvSavedChartType[], Error, TvSavedChartType[], unknown[]>, 'queryKey' | 'queryFn' | 'initialData'>,
) => {
    return useQuery(['tvSavedCharts'], () => getSavedCharts(params), options);
};


