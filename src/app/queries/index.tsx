import { useQuery } from '@tanstack/react-query';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS from 'src/api/axiosInstance';
import { SymbolGeneralInfoType } from './types';

const getSymbolGeneralInfo = async (symbolISIN: string) => {
    const { data } = await AXIOS.get<GlobalApiResponseType<SymbolGeneralInfoType>>(apiRoutes.Symbol.SymbolGeneralInformation, {
        params: { symbolISIN },
    });
    return data?.result;
};

export const useSymbolGeneralInfo = <T = SymbolGeneralInfoType,>(symbolISIN: string, select?: (data: SymbolGeneralInfoType) => T) => {
    return useQuery<SymbolGeneralInfoType, any, T, any[]>(['SymbolGeneralInfo', symbolISIN], ({ queryKey }) => getSymbolGeneralInfo(queryKey[1]), {
        enabled: !!symbolISIN,
        select,
    });
};
