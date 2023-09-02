import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import AXIOS from "src/api/axiosInstance";
import { Apis } from "src/common/hooks/useApiRoutes/useApiRoutes";


const getSavedStudyTemplates = async (params: IRequestSavedStudyTemplates) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<TvStudyTemplateListType[]>>(Apis().tvChart.studyTemplate, {
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
    const { data } = await AXIOS.get<{data : TvSavedChartType[] , status : string}>(Apis().tvChart.loadAll, {
        params
    });

    console.log("Data",data)
    return data?.data || [];
};

export const useTvSavedChart = (
    params: IRequestSavedStudyTemplates,
    options?: Omit<UseQueryOptions<TvSavedChartType[], Error, TvSavedChartType[], unknown[]>, 'queryKey' | 'queryFn' | 'initialData'>,
) => {
    return useQuery(['tvSavedCharts'], () => getTvSavedChart(params), options);
};


/*-------------------------------------------------------*/


const getSymbolSearch = async (term: string) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<SearchSymbolType[]>>(Apis().Symbol.Search, {
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


