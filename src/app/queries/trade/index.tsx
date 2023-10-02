import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import AXIOS from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';

const getCommission = async () => {
    const { data } = await AXIOS.get<GlobalApiResponseType<Commission[]>>(Apis().Commission.Get as string, {});
    return data?.result;
};
// prettier-ignore
export const useCommissionQuery = <T=Commission>(
    options?: Omit<UseQueryOptions<Commission[], unknown, T, unknown[]>, 'queryKey' | 'queryFn' | 'initialData'>,
) => {
    return useQuery(['getCommission'], ({ queryKey }) => getCommission(), {cacheTime: Infinity, staleTime: Infinity});
};
