import { useQuery } from '@tanstack/react-query';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS from 'src/api/axiosInstance';

const getSymbolGeneralInfo = async (symbolISIN: string) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<SymbolGeneralInfoType>>(apiRoutes.Symbol.SymbolGeneralInformation, {
        params: { symbolISIN },
    });
    return data?.result;
};

export const useSymbolGeneralInfo = <T,>(symbolISIN: string, options?: { select: (data: SymbolGeneralInfoType) => T }) => {
    return useQuery(['SymbolGeneralInfo', symbolISIN], ({ queryKey }) => getSymbolGeneralInfo(queryKey[1]), {
        enabled: !!symbolISIN,
        staleTime: Infinity,
        cacheTime: Infinity,
        ...options,
    });
};

const searchSymbol = async (term: string) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<SymbolSearchResult[]>>(apiRoutes.Symbol.Search, { params: { term } });
    return data?.result || [];
};

export const useSymbolSearch = (term: string) => {
    return useQuery(['SymbolSearch', term], ({ queryKey }) => searchSymbol(queryKey[1]), {
        enabled: !!term,
        staleTime: 0,
        cacheTime: 0,
        select: (data) => (data ? data.slice(0, 10) : undefined),
    });
};
