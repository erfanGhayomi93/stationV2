import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';

const getCommission = async () => {
    const { data } = await AXIOS.get<GlobalApiResponseType<Commission[]>>(Apis().Commission.Get as string, {});
    return data?.result;
};
// prettier-ignore
export const useCommissionQuery = () => {
    return useQuery(['getCommission'], () => getCommission(), {
        cacheTime: Infinity,
        staleTime: Infinity
    });
};
