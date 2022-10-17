import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS from 'src/api/axiosInstance';
import { getApiPath } from 'src/common/hooks/useApiRoutes/useApiRoutes';

const getSymbolGeneralInfo = async (symbolISIN: string) => {
    const apiRoutes = getApiPath();

    const { data } = await AXIOS.get<GlobalApiResponseType<SymbolGeneralInfoType>>(apiRoutes?.Symbol.SymbolGeneralInformation as string, {
        params: { symbolISIN },
    });
    return data?.result;
};

export const useSymbolGeneralInfo = <T,>(
    symbolISIN: string,
    options?: { select?: (data: SymbolGeneralInfoType) => T; onSuccess?: (data: T) => void },
) => {
    return useQuery(['SymbolGeneralInfo', symbolISIN], ({ queryKey }) => getSymbolGeneralInfo(queryKey[1]), {
        enabled: !!symbolISIN,
        staleTime: Infinity,
        cacheTime: Infinity,
        ...options,
    });
};

const searchSymbol = async (term: string) => {
    const apiRoutes = getApiPath();

    const { data } = await AXIOS.get<GlobalApiResponseType<SymbolSearchResult[]>>(apiRoutes?.Symbol.Search as string, { params: { term } });
    return Array.isArray(data?.result) ? data.result.slice(0, 10) : [];
};
//prettier-ignore
export const useSymbolSearch = <T=SymbolSearchResult[]>(
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
